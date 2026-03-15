const { db } = require("../config/firebase");
const { doc, getDoc, setDoc } = require("firebase/firestore");

const SETTINGS = "settings";
const SITE = "site";

// GET /api/settings
async function getSettings(req, res) {
  try {
    const settingsDoc = await getDoc(doc(db, SETTINGS, SITE));

    if (!settingsDoc.exists()) {
      return res.json({});
    }

    const data = settingsDoc.data();
    res.json({
      whatsappNumber: data.whatsappNumber || "",
      privacyPolicyUrl: data.privacyPolicyUrl || "",
      openingsUrl: data.openingsUrl || "",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/settings
async function updateSettings(req, res) {
  try {
    const { whatsappNumber, privacyPolicyUrl, openingsUrl } = req.body;

    if (whatsappNumber !== undefined && typeof whatsappNumber !== "string") {
      return res
        .status(400)
        .json({ error: "whatsappNumber must be a string" });
    }

    if (privacyPolicyUrl !== undefined && typeof privacyPolicyUrl !== "string") {
      return res
        .status(400)
        .json({ error: "privacyPolicyUrl must be a string" });
    }

    if (openingsUrl !== undefined && typeof openingsUrl !== "string") {
      return res
        .status(400)
        .json({ error: "openingsUrl must be a string" });
    }

    await setDoc(
      doc(db, SETTINGS, SITE),
      {
        whatsappNumber: whatsappNumber || "",
        privacyPolicyUrl: privacyPolicyUrl || "",
        openingsUrl: openingsUrl || "",
        updatedAt: Date.now(),
      },
      { merge: true }
    );

    res.json({ message: "Settings updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getSettings, updateSettings };
