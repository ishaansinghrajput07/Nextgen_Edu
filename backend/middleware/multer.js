import { randomUUID } from "crypto";
import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const universityUploadsDirectory = path.resolve(
  __dirname,
  "../uploads/universities",
);

const imageExtensions = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    fs.mkdir(universityUploadsDirectory, { recursive: true }, (error) => {
      callback(error, universityUploadsDirectory);
    });
  },
  filename: (req, file, callback) => {
    callback(null, `${randomUUID()}${imageExtensions[file.mimetype]}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    if (!imageExtensions[file.mimetype]) {
      const error = new Error(
        "Only JPEG, PNG, WebP, and GIF images are supported.",
      );
      error.code = "UNSUPPORTED_FILE_TYPE";
      return callback(error);
    }

    return callback(null, true);
  },
});

export default upload;
