import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import path from "path";

// multer storage
export const storage = (destination: string, types = /jpg|jpeg|webp|png|/) => {
  // Create the destination directory if is doesn't exist
  if (!fs.existsSync(destination)) fs.mkdirSync(destination);

  const filterTypes = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    // Allow types
    if (types.test(file.mimetype)) cb(null, true);
    else cb(new Error("File type not allowed!"));
  };

  // ? Configs
  const multerStorage = multer.diskStorage({
    // file destination
    destination: (req, file, cb) => {
      cb(null, destination);
    },

    // filename configs for name of files
    filename: (req, file, cb) => {
      const extName = path.extname(file.originalname);
      cb(null, `${Date.now() * Math.floor(Math.random() * 1e8)}${extName}`);
    },
  });

  const multerUploader = multer({
    storage: multerStorage,
    limits: {
      // 5 MB limit
      fileSize: 512_000_000,
    },
    fileFilter: filterTypes,
  });

  return multerUploader;
};
