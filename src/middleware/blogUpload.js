const multer = require("multer");

const blogUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 500 * 1024 }, // 500KB max for blog cover images
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

module.exports = blogUpload;
