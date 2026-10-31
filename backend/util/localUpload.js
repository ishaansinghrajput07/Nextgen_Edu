import fs from "fs/promises";
import path from "path";
import { universityUploadsDirectory } from "../middleware/multer.js";

export const getUniversityImageUrl = (req, file) => {
  const backendOrigin =
    process.env.PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
    `${req.protocol}://${req.get("host")}`;

  return `${backendOrigin}/uploads/universities/${encodeURIComponent(file.filename)}`;
};

export const deleteUniversityImage = async (imageUrl) => {
  if (!imageUrl) return;

  let pathname;
  try {
    pathname = new URL(imageUrl, "http://localhost").pathname;
  } catch {
    return;
  }

  const uploadPrefix = "/uploads/universities/";
  if (!pathname.startsWith(uploadPrefix)) return;

  const filename = path.basename(decodeURIComponent(pathname));
  if (!filename || filename === "." || filename === "..") return;

  try {
    await fs.unlink(path.join(universityUploadsDirectory, filename));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
};

export const cleanupUploadedFiles = async (files) => {
  const uploadedFiles = Object.values(files || {}).flat();

  await Promise.all(
    uploadedFiles.map(async (file) => {
      try {
        await fs.unlink(file.path);
      } catch (error) {
        if (error.code !== "ENOENT") {
          console.error("Could not clean up an uploaded university image.", error);
        }
      }
    }),
  );
};
