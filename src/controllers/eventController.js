const { db, adminBucket } = require("../config/firebase");
const {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  where,
  limit,
} = require("firebase/firestore");

const MAX_EVENTS = 15;

// Upload cover image to Firebase Storage, return { url, path }
async function uploadCoverImage(file) {
  const fileName = `event-covers/${Date.now()}_${file.originalname}`;
  const storageFile = adminBucket.file(fileName);

  await storageFile.save(file.buffer, {
    metadata: { contentType: file.mimetype },
  });
  await storageFile.makePublic();

  const downloadURL = `https://storage.googleapis.com/${adminBucket.name}/${fileName}`;
  return { url: downloadURL, path: fileName };
}

// Delete cover image from Firebase Storage
async function deleteCoverImage(filePath) {
  if (!filePath || !adminBucket) return;
  try {
    await adminBucket.file(filePath).delete();
  } catch (err) {
    console.warn("Storage delete warning:", err.message);
  }
}

// GET /api/events — public, published only, sorted by eventDate desc
async function getEvents(req, res) {
  try {
    const q = query(collection(db, "events"), orderBy("eventDate", "desc"));
    const snapshot = await getDocs(q);
    const events = snapshot.docs
      .filter((d) => d.data().status === "published")
      .map((d) => ({
        id: d.id,
        title: d.data().title,
        slug: d.data().slug,
        excerpt: d.data().excerpt,
        coverImageUrl: d.data().coverImageUrl,
        eventDate: d.data().eventDate,
        location: d.data().location,
        eventType: d.data().eventType,
        registrationUrl: d.data().registrationUrl,
        author: d.data().author,
        createdAt: d.data().createdAt,
      }));
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/events/all — authenticated, all statuses for admin
async function getAllEvents(req, res) {
  try {
    const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const events = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/events/slug/:slug — public, single published event
async function getEventBySlug(req, res) {
  try {
    const { slug } = req.params;
    const q = query(
      collection(db, "events"),
      where("slug", "==", slug),
      limit(1)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res.status(404).json({ error: "Event not found" });
    }

    const eventDoc = snapshot.docs[0];
    if (eventDoc.data().status !== "published") {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ id: eventDoc.id, ...eventDoc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/events/:id — authenticated, for edit form
async function getEventById(req, res) {
  try {
    const { id } = req.params;
    const docRef = doc(db, "events", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ id: docSnap.id, ...docSnap.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/events — authenticated, create event with auto-cleanup
async function createEvent(req, res) {
  try {
    if (req.fileValidationError) {
      return res.status(400).json({ error: req.fileValidationError });
    }

    const {
      title, slug, excerpt, content, author, status,
      eventDate, location, eventType, registrationUrl,
    } = req.body;

    if (!title || !slug || !content) {
      return res
        .status(400)
        .json({ error: "Title, slug, and content are required" });
    }

    if (!adminBucket) {
      return res.status(500).json({
        error: "Firebase Admin SDK not configured.",
      });
    }

    // Auto-cleanup: if >= MAX_EVENTS, delete oldest
    const allQuery = query(
      collection(db, "events"),
      orderBy("createdAt", "asc")
    );
    const allSnap = await getDocs(allQuery);

    if (allSnap.size >= MAX_EVENTS) {
      const oldest = allSnap.docs[0];
      const oldestData = oldest.data();

      await deleteCoverImage(oldestData.coverImagePath);
      await deleteDoc(doc(db, "events", oldest.id));
    }

    // Upload cover image if provided
    let coverImageUrl = "";
    let coverImagePath = "";

    if (req.file) {
      const result = await uploadCoverImage(req.file);
      coverImageUrl = result.url;
      coverImagePath = result.path;
    }

    const now = new Date().toISOString();
    const eventData = {
      title,
      slug,
      excerpt: excerpt || "",
      content,
      coverImageUrl,
      coverImagePath,
      eventDate: eventDate || "",
      location: location || "",
      eventType: eventType || "webinar",
      registrationUrl: registrationUrl || "",
      author: author || "Admin",
      status: status || "draft",
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await addDoc(collection(db, "events"), eventData);

    res.status(201).json({
      message: "Event created successfully",
      id: docRef.id,
      event: { id: docRef.id, ...eventData },
    });
  } catch (err) {
    console.error("Create event error:", err.message);
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/events/:id — authenticated, update event
async function updateEvent(req, res) {
  try {
    const { id } = req.params;
    const docRef = doc(db, "events", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: "Event not found" });
    }

    const {
      title, slug, excerpt, content, author, status,
      eventDate, location, eventType, registrationUrl,
    } = req.body;

    const updateData = {
      ...(title !== undefined && { title }),
      ...(slug !== undefined && { slug }),
      ...(excerpt !== undefined && { excerpt }),
      ...(content !== undefined && { content }),
      ...(author !== undefined && { author }),
      ...(status !== undefined && { status }),
      ...(eventDate !== undefined && { eventDate }),
      ...(location !== undefined && { location }),
      ...(eventType !== undefined && { eventType }),
      ...(registrationUrl !== undefined && { registrationUrl }),
      updatedAt: new Date().toISOString(),
    };

    // Replace cover image if new one provided
    if (req.file) {
      if (!adminBucket) {
        return res.status(500).json({
          error: "Firebase Admin SDK not configured.",
        });
      }

      const oldData = docSnap.data();
      await deleteCoverImage(oldData.coverImagePath);

      const result = await uploadCoverImage(req.file);
      updateData.coverImageUrl = result.url;
      updateData.coverImagePath = result.path;
    }

    await updateDoc(docRef, updateData);

    res.json({ message: "Event updated successfully" });
  } catch (err) {
    console.error("Update event error:", err.message);
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/events/:id — authenticated, delete event + image
async function deleteEvent(req, res) {
  try {
    const { id } = req.params;
    const docRef = doc(db, "events", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: "Event not found" });
    }

    const eventData = docSnap.data();

    await deleteCoverImage(eventData.coverImagePath);
    await deleteDoc(docRef);

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getEvents,
  getAllEvents,
  getEventBySlug,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
