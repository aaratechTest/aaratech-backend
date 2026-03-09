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

let adminBucket = null;

if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
  adminBucket = admin.storage().bucket();
  console.log("Firebase Admin SDK initialized (Storage ready)");
} else {
  console.warn(
    "WARNING: Firebase Admin SDK not configured. Set FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY env variables."
  );
}

module.exports = { app, db, adminBucket };
