import multer from "multer";

// Multer for handling images
export const upload = multer({
  storage: multer.memoryStorage(), // Store images in memory
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB limit per image
    files: 10, // Maximum 10 images
  },
});
