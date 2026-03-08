const { db } = require("../config/firebase");
const {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
} = require("firebase/firestore");

const PAGES = "pages";

// GET /api/pages
async function getPages(req, res) {
  try {
    const q = query(collection(db, PAGES), orderBy("updatedAt", "desc"));
    const snap = await getDocs(q);

    const pages = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        slug: data.slug,
        title: data.title,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    });

    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/pages/slug/:slug (public)
async function getPageBySlug(req, res) {
  try {
    const { slug } = req.params;
    const q = query(
      collection(db, PAGES),
      where("slug", "==", slug),
      where("status", "==", "published")
    );
    const snap = await getDocs(q);

    if (snap.empty) {
      return res.status(404).json({ error: "Page not found" });
    }

    const d = snap.docs[0];
    const data = d.data();
    res.json({
      id: d.id,
      slug: data.slug,
      title: data.title,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      blocks: data.blocks || [],
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/pages/:id
async function getPageById(req, res) {
  try {
    const { id } = req.params;
    const pageDoc = await getDoc(doc(db, PAGES, id));

    if (!pageDoc.exists()) {
      return res.status(404).json({ error: "Page not found" });
    }

    const data = pageDoc.data();
    res.json({
      id: pageDoc.id,
      slug: data.slug,
      title: data.title,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      blocks: data.blocks || [],
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      createdBy: data.createdBy,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/pages
async function createPage(req, res) {
  try {
    const { title, slug, metaTitle, metaDescription, blocks, status } = req.body;

    if (!title || !slug) {
      return res.status(400).json({ error: "Title and slug are required" });
    }

    // Check slug uniqueness
    const q = query(collection(db, PAGES), where("slug", "==", slug));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return res.status(409).json({ error: "A page with this slug already exists" });
    }

    const now = Date.now();
    const pageDoc = await addDoc(collection(db, PAGES), {
      title,
      slug,
      metaTitle: metaTitle || "",
      metaDescription: metaDescription || "",
      blocks: blocks || [],
      status: status || "draft",
      createdAt: now,
      updatedAt: now,
      createdBy: req.admin.email,
    });

    res.status(201).json({
      message: "Page created successfully",
      page: { id: pageDoc.id, title, slug, status: status || "draft" },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/pages/:id
async function updatePage(req, res) {
  try {
    const { id } = req.params;
    const pageDoc = await getDoc(doc(db, PAGES, id));

    if (!pageDoc.exists()) {
      return res.status(404).json({ error: "Page not found" });
    }

    const { title, slug, metaTitle, metaDescription, blocks, status } = req.body;

    // If slug changed, check uniqueness
    if (slug && slug !== pageDoc.data().slug) {
      const q = query(collection(db, PAGES), where("slug", "==", slug));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return res.status(409).json({ error: "A page with this slug already exists" });
      }
    }

    const updates = { updatedAt: Date.now() };
    if (title !== undefined) updates.title = title;
    if (slug !== undefined) updates.slug = slug;
    if (metaTitle !== undefined) updates.metaTitle = metaTitle;
    if (metaDescription !== undefined) updates.metaDescription = metaDescription;
    if (blocks !== undefined) updates.blocks = blocks;
    if (status !== undefined) updates.status = status;

    await updateDoc(doc(db, PAGES, id), updates);

    res.json({ message: "Page updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/pages/:id
async function deletePage(req, res) {
  try {
    const { id } = req.params;
    const pageDoc = await getDoc(doc(db, PAGES, id));

    if (!pageDoc.exists()) {
      return res.status(404).json({ error: "Page not found" });
    }

    await deleteDoc(doc(db, PAGES, id));
    res.json({ message: "Page deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/pages/seed
async function seedPages(req, res) {
  try {
    const allPages = require("../data/seedPages");
    let created = 0;
    let skipped = 0;

    for (const page of allPages) {
      // Check if slug already exists
      const q = query(collection(db, PAGES), where("slug", "==", page.slug));
      const snap = await getDocs(q);
      if (!snap.empty) {
        skipped++;
        continue;
      }

      const now = Date.now();
      await addDoc(collection(db, PAGES), {
        title: page.title,
        slug: page.slug,
        metaTitle: page.metaTitle || "",
        metaDescription: page.metaDescription || "",
        blocks: page.blocks || [],
        status: "published",
        createdAt: now,
        updatedAt: now,
        createdBy: req.admin.email,
      });
      created++;
    }

    res.json({ message: `Seeded ${created} page(s), skipped ${skipped} existing.`, created, skipped });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getPages, getPageBySlug, getPageById, createPage, updatePage, deletePage, seedPages };
