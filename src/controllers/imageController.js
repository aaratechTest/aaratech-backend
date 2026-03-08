const { db, adminBucket } = require("../config/firebase");
const {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
} = require("firebase/firestore");

// POST /api/images/upload — upload image to Firebase Storage + save metadata in Firestore
async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    if (!adminBucket) {
      return res.status(500).json({
        error:
          "Firebase Admin SDK not configured. Place serviceAccountKey.json in the backend root folder.",
      });
    }

    const fileName = `images/${Date.now()}_${req.file.originalname}`;
    const file = adminBucket.file(fileName);

    await file.save(req.file.buffer, {
      metadata: { contentType: req.file.mimetype },
    });

    // Make file publicly readable
    await file.makePublic();

    const downloadURL = `https://storage.googleapis.com/${adminBucket.name}/${fileName}`;

    // Save metadata to Firestore
    const docRef = await addDoc(collection(db, "images"), {
      fileName,
      originalName: req.file.originalname,
      url: downloadURL,
      contentType: req.file.mimetype,
      size: req.file.size,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      message: "Image uploaded successfully",
      id: docRef.id,
      url: downloadURL,
    });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ error: err.message });
  }
}

// GET /api/images — list all uploaded images from Firestore
async function getImages(req, res) {
  try {
    const q = query(collection(db, "images"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const images = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/images/:id — delete image from Firebase Storage + Firestore
async function deleteImage(req, res) {
  try {
    const { id } = req.params;
    const docRef = doc(db, "images", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: "Image not found" });
    }

    const imageData = docSnap.data();

    // Delete from Firebase Storage via Admin SDK
    if (adminBucket) {
      try {
        await adminBucket.file(imageData.fileName).delete();
      } catch (storageErr) {
        console.warn("Storage delete warning:", storageErr.message);
      }
    }

    // Delete metadata from Firestore
    await deleteDoc(docRef);

    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { uploadImage, getImages, deleteImage };
