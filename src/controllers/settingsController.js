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
      requestDemoUrl: data.requestDemoUrl || "",
      experienceToolUrl: data.experienceToolUrl || "",
      socialFacebook: data.socialFacebook || "",
      socialTwitter: data.socialTwitter || "",
      socialLinkedin: data.socialLinkedin || "",
      socialInstagram: data.socialInstagram || "",
      socialYoutube: data.socialYoutube || "",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/settings
async function updateSettings(req, res) {
  try {
    const {
      whatsappNumber, privacyPolicyUrl, openingsUrl, requestDemoUrl, experienceToolUrl,
      socialFacebook, socialTwitter, socialLinkedin, socialInstagram, socialYoutube,
    } = req.body;

    // Validate all string fields
    const stringFields = {
      whatsappNumber, privacyPolicyUrl, openingsUrl, requestDemoUrl, experienceToolUrl,
      socialFacebook, socialTwitter, socialLinkedin, socialInstagram, socialYoutube,
    };
    for (const [key, value] of Object.entries(stringFields)) {
      if (value !== undefined && typeof value !== "string") {
        return res.status(400).json({ error: `${key} must be a string` });
      }
    }

    await setDoc(
      doc(db, SETTINGS, SITE),
      {
        whatsappNumber: whatsappNumber || "",
        privacyPolicyUrl: privacyPolicyUrl || "",
        openingsUrl: openingsUrl || "",
        requestDemoUrl: requestDemoUrl || "",
        experienceToolUrl: experienceToolUrl || "",
        socialFacebook: socialFacebook || "",
        socialTwitter: socialTwitter || "",
        socialLinkedin: socialLinkedin || "",
        socialInstagram: socialInstagram || "",
        socialYoutube: socialYoutube || "",
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
