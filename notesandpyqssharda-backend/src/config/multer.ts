import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const notesStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "notes_uploads",
      resource_type: "auto",
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});
const pyqStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "pyq_uploads",
      resource_type: "auto",
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});
const syllabusStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "syllabus_uploads",
      resource_type: "auto",
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

export const uploadNotesMulter = multer({
  storage: notesStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },
  fileFilter(req, file, cb) {
    const allowed = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    ];

    if (!allowed.includes(file.mimetype)) {
      cb(new Error("File type not allowed"));
      return;
    }

    cb(null, true);
  },
});

export const uploadPyqsMulter = multer({
  storage: pyqStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },
  fileFilter(req, file, cb) {
    const allowed = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    ];

    if (!allowed.includes(file.mimetype)) {
      cb(new Error("File type not allowed"));
      return;
    }

    cb(null, true);
  },
});

export const uploadSyllabusMulter = multer({
  storage: syllabusStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },
  fileFilter(req, file, cb) {
    const allowed = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    ];

    if (!allowed.includes(file.mimetype)) {
      cb(new Error("File type not allowed"));
      return;
    }

    cb(null, true);
  },
});
