const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

function generateJWT(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function verifyJWT(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken, generateJWT, verifyJWT };
