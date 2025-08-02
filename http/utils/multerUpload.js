import multer from 'multer';
import AppError from './appError.js';

const fileFilter = (_, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('This file type is not allowed. Please only upload image files.', 403), false);
  }
};

const storage = multer.memoryStorage();

const multerUpload = multer({ fileFilter, storage });

export default multerUpload;
