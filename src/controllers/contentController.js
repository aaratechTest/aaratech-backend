const { db } = require("../config/firebase");
const {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} = require("firebase/firestore");

const defaultContent = require("../data/defaultContent");

const COLLECTION = "page_contents";

// GET /api/content/:slug (public)
async function getContent(req, res) {
  try {
    const { slug } = req.params;

    // Try Firestore first
    const q = query(collection(db, COLLECTION), where("slug", "==", slug));
    const snap = await getDocs(q);

    if (!snap.empty) {
      const data = snap.docs[0].data();
      return res.json(data);
    }

    // Fall back to defaults
    if (defaultContent[slug]) {
      return res.json(defaultContent[slug]);
    }

    res.status(404).json({ error: "Page content not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/content/:slug (authenticated)
async function updateContent(req, res) {
  try {
    const { slug } = req.params;
    const { title, metaTitle, metaDescription, sections } = req.body;

    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }

    const docRef = doc(db, COLLECTION, slug);
    const data = {
      slug,
      title: title || defaultContent[slug]?.title || slug,
      metaTitle: metaTitle || "",
      metaDescription: metaDescription || "",
      sections: sections || {},
      updatedAt: Date.now(),
      updatedBy: req.admin.email,
    };

    await setDoc(docRef, data, { merge: true });

    res.json({ message: "Content updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/content/seed (authenticated)
async function seedContent(req, res) {
  try {
    let created = 0;
    let skipped = 0;

    for (const [slug, content] of Object.entries(defaultContent)) {
      const docRef = doc(db, COLLECTION, slug);
      const q = query(collection(db, COLLECTION), where("slug", "==", slug));
      const snap = await getDocs(q);

      if (!snap.empty) {
        skipped++;
        continue;
      }

      await setDoc(docRef, {
        ...content,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: req.admin.email,
      });
      created++;
    }

    res.json({
      message: `Seeded ${created} page(s), skipped ${skipped} existing.`,
      created,
      skipped,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getContent, updateContent, seedContent };
