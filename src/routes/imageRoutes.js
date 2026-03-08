const express = require("express");
const { uploadImage, getImages, deleteImage } = require("../controllers/imageController");
const upload = require("../middleware/upload");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);
router.get("/", requireAuth, getImages);
router.delete("/:id", requireAuth, deleteImage);

module.exports = router;
