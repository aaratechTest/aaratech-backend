const { db } = require("../config/firebase");
const { doc, getDoc, setDoc } = require("firebase/firestore");
const defaultMenu = require("../data/defaultMenu");

const MENUS = "menus";
const MAIN_MENU = "main";

// GET /api/menu
async function getMenu(req, res) {
  try {
    const menuDoc = await getDoc(doc(db, MENUS, MAIN_MENU));

    if (!menuDoc.exists()) {
      return res.json({ groups: [] });
    }

    const data = menuDoc.data();
    res.json({
      groups: data.groups || [],
      updatedAt: data.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/menu
async function updateMenu(req, res) {
  try {
    const { groups } = req.body;

    if (!Array.isArray(groups)) {
      return res.status(400).json({ error: "groups must be an array" });
    }

    await setDoc(doc(db, MENUS, MAIN_MENU), {
      groups,
      updatedAt: Date.now(),
    });

    res.json({ message: "Menu updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/menu/seed
async function seedMenu(req, res) {
  try {
    await setDoc(doc(db, MENUS, MAIN_MENU), {
      ...defaultMenu,
      updatedAt: Date.now(),
    });

    res.json({ message: "Menu seeded successfully", groupCount: defaultMenu.groups.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getMenu, updateMenu, seedMenu };
