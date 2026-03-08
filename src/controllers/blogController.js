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

const MAX_BLOGS = 15;

// Upload cover image to Firebase Storage, return { url, path }
async function uploadCoverImage(file) {
  const fileName = `blog-covers/${Date.now()}_${file.originalname}`;
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

// GET /api/blogs — public, published only
async function getBlogs(req, res) {
  try {
    // Fetch all blogs ordered by createdAt (single-field query — no composite index needed)
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const blogs = snapshot.docs
      .filter((d) => d.data().status === "published")
      .map((d) => ({
        id: d.id,
        title: d.data().title,
        slug: d.data().slug,
        excerpt: d.data().excerpt,
        coverImageUrl: d.data().coverImageUrl,
        author: d.data().author,
        createdAt: d.data().createdAt,
      }));
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/blogs/all — authenticated, all statuses for admin
async function getAllBlogs(req, res) {
  try {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const blogs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/blogs/slug/:slug — public, single published blog
async function getBlogBySlug(req, res) {
  try {
    const { slug } = req.params;
    // Single-field query to avoid composite index requirement
    const q = query(
      collection(db, "blogs"),
      where("slug", "==", slug),
      limit(1)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const blogDoc = snapshot.docs[0];
    if (blogDoc.data().status !== "published") {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json({ id: blogDoc.id, ...blogDoc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/blogs/:id — authenticated, for edit form
async function getBlogById(req, res) {
  try {
    const { id } = req.params;
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json({ id: docSnap.id, ...docSnap.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/blogs — authenticated, create blog with auto-cleanup
async function createBlog(req, res) {
  try {
    // Handle multer file size error
    if (req.fileValidationError) {
      return res.status(400).json({ error: req.fileValidationError });
    }

    const { title, slug, excerpt, content, author, status } = req.body;

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

    // Auto-cleanup: if >= MAX_BLOGS, delete oldest
    const allQuery = query(
      collection(db, "blogs"),
      orderBy("createdAt", "asc")
    );
    const allSnap = await getDocs(allQuery);

    if (allSnap.size >= MAX_BLOGS) {
      const oldest = allSnap.docs[0];
      const oldestData = oldest.data();

      // Delete oldest cover image from Storage
      await deleteCoverImage(oldestData.coverImagePath);

      // Delete oldest doc from Firestore
      await deleteDoc(doc(db, "blogs", oldest.id));
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
    const blogData = {
      title,
      slug,
      excerpt: excerpt || "",
      content,
      coverImageUrl,
      coverImagePath,
      author: author || "Admin",
      status: status || "draft",
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await addDoc(collection(db, "blogs"), blogData);

    res.status(201).json({
      message: "Blog post created successfully",
      id: docRef.id,
      blog: { id: docRef.id, ...blogData },
    });
  } catch (err) {
    console.error("Create blog error:", err.message);
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/blogs/:id — authenticated, update blog
async function updateBlog(req, res) {
  try {
    const { id } = req.params;
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const { title, slug, excerpt, content, author, status } = req.body;
    const updateData = {
      ...(title !== undefined && { title }),
      ...(slug !== undefined && { slug }),
      ...(excerpt !== undefined && { excerpt }),
      ...(content !== undefined && { content }),
      ...(author !== undefined && { author }),
      ...(status !== undefined && { status }),
      updatedAt: new Date().toISOString(),
    };

    // Replace cover image if new one provided
    if (req.file) {
      if (!adminBucket) {
        return res.status(500).json({
          error: "Firebase Admin SDK not configured.",
        });
      }

      // Delete old cover image
      const oldData = docSnap.data();
      await deleteCoverImage(oldData.coverImagePath);

      // Upload new cover image
      const result = await uploadCoverImage(req.file);
      updateData.coverImageUrl = result.url;
      updateData.coverImagePath = result.path;
    }

    await updateDoc(docRef, updateData);

    res.json({ message: "Blog post updated successfully" });
  } catch (err) {
    console.error("Update blog error:", err.message);
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/blogs/:id — authenticated, delete blog + image
async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const blogData = docSnap.data();

    // Delete cover image from Storage
    await deleteCoverImage(blogData.coverImagePath);

    // Delete doc from Firestore
    await deleteDoc(docRef);

    res.json({ message: "Blog post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getBlogs,
  getAllBlogs,
  getBlogBySlug,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
