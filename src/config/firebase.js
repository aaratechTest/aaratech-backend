const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
require("dotenv").config();

// --- Client SDK (used for Firestore) ---
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Admin SDK (used for Storage — bypasses security rules) ---
const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

const serviceAccountPath = path.join(__dirname, "../../serviceAccountKey.json");

let adminBucket = null;

if (fs.existsSync(serviceAccountPath)) {
  const serviceAccount = require(serviceAccountPath);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
  adminBucket = admin.storage().bucket();
  console.log("Firebase Admin SDK initialized (Storage ready)");
} else {
  console.warn(
    "WARNING: serviceAccountKey.json not found at project root. Image uploads will NOT work.\n" +
    "Download it from Firebase Console > Project Settings > Service Accounts > Generate New Private Key"
  );
}

module.exports = { app, db, adminBucket };
