const { db, adminBucket } = require("../config/firebase");
const { collection, addDoc, getDoc, deleteDoc, doc } = require("firebase/firestore");

// Check if Firestore (database) is connected
async function checkFirestore() {
  const testCol = collection(db, "_health_check");
  const docRef = await addDoc(testCol, {
    status: "ok",
    timestamp: new Date().toISOString(),
  });
  const snap = await getDoc(doc(db, "_health_check", docRef.id));
  await deleteDoc(doc(db, "_health_check", docRef.id));
  return snap.exists();
}

// Check if Firebase Storage is accessible via Admin SDK
async function checkStorage() {
  if (!adminBucket) return false;
  await adminBucket.getMetadata();
  return true;
}

// GET /api/health — verify both Firestore and Storage are working
async function healthCheck(req, res) {
  const result = { firestore: false, storage: false };

  try {
    result.firestore = await checkFirestore();
  } catch (err) {
    result.firestoreError = err.message;
  }

  try {
    result.storage = await checkStorage();
  } catch (err) {
    result.storageError = err.message;
  }

  const allGood = result.firestore && result.storage;
  res.status(allGood ? 200 : 503).json({
    status: allGood ? "ALL SYSTEMS CONNECTED" : "SOME SERVICES FAILED",
    services: result,
  });
}

module.exports = { healthCheck };
