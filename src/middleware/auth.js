const { verifyJWT } = require("../utils/tokenUtils");

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const token = header.split(" ")[1];
    const decoded = verifyJWT(token);
    req.admin = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

function requireSuperAdmin(req, res, next) {
  if (req.admin.role !== "super_admin") {
    return res.status(403).json({ error: "Super admin access required" });
  }
  next();
}

module.exports = { requireAuth, requireSuperAdmin };
