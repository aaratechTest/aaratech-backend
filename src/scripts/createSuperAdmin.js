const readline = require("readline");
require("dotenv").config();

const { db } = require("../config/firebase");
const { collection, query, where, getDocs, addDoc } = require("firebase/firestore");
const { generateToken } = require("../utils/tokenUtils");
const { sendEmail } = require("../utils/sendEmail");
const { createPasswordEmail } = require("../utils/emailTemplates");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  console.log("\n=== Create Super Admin ===\n");

  const passcode = await ask("Enter super admin passcode: ");
  if (passcode !== process.env.SUPER_ADMIN_PASSCODE) {
    console.error("Invalid passcode. Aborting.");
    rl.close();
    process.exit(1);
  }

  const name = await ask("Enter admin name: ");
  const email = await ask("Enter admin email: ");

  if (!name || !email) {
    console.error("Name and email are required. Aborting.");
    rl.close();
    process.exit(1);
  }

  // Check if email already exists
  const q = query(collection(db, "admins"), where("email", "==", email));
  const snap = await getDocs(q);
  if (!snap.empty) {
    console.error("An admin with this email already exists. Aborting.");
    rl.close();
    process.exit(1);
  }

  // Create admin record
  await addDoc(collection(db, "admins"), {
    email,
    name,
    role: "super_admin",
    password: null,
    status: "pending",
    createdAt: Date.now(),
    createdBy: "cli",
  });

  // Generate token and send email
  const token = generateToken();
  await addDoc(collection(db, "tokens"), {
    token,
    email,
    type: "create_password",
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    used: false,
  });

  const link = `${process.env.FRONTEND_URL}/admin/set-password?token=${token}`;

  try {
    await sendEmail({
      to: email,
      subject: "Set Your AaraTech Super Admin Password",
      html: createPasswordEmail(name, link),
    });
    console.log(`\nSuper admin created! Setup email sent to ${email}`);
  } catch (err) {
    console.log(`\nSuper admin created but email failed: ${err.message}`);
    console.log(`\nManual setup link:\n${link}`);
  }

  rl.close();
  process.exit(0);
}

main().catch((err) => {
  console.error("Error:", err.message);
  rl.close();
  process.exit(1);
});
