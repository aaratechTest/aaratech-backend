const { db } = require("../config/firebase");
const { doc, getDoc, setDoc } = require("firebase/firestore");

const MENUS = "menus";
const MAIN_MENU = "main";

// GET /api/menu
async function getMenu(req, res) {
  try {
    const menuDoc = await getDoc(doc(db, MENUS, MAIN_MENU));

    if (!menuDoc.exists()) {
      return res.json({ items: [] });
    }

    const data = menuDoc.data();
    res.json({
      items: data.items || [],
      updatedAt: data.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/menu
async function updateMenu(req, res) {
  try {
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: "Items must be an array" });
    }

    await setDoc(doc(db, MENUS, MAIN_MENU), {
      items,
      updatedAt: Date.now(),
    });

    res.json({ message: "Menu updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getMenu, updateMenu };
