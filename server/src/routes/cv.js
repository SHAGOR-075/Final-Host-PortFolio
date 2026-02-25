import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import CV from '../models/CV.js';
import { authenticate } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'cv-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed'));
    }
  }
});

// Get current CV
router.get('/', async (req, res) => {
  try {
    const cv = await CV.findOne().sort({ createdAt: -1 });
    if (!cv) {
      return res.json(null);
    }
    res.json({
      id: cv._id,
      filename: cv.filename,
      originalName: cv.originalName,
      url: `/uploads/${cv.filename}`,
      size: cv.size,
      mimeType: cv.mimeType,
      uploadedAt: cv.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload CV (admin only)
router.post('/upload', authenticate, upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Delete old CV if exists
    const oldCV = await CV.findOne().sort({ createdAt: -1 });
    if (oldCV) {
      const oldFilePath = path.join(uploadsDir, oldCV.filename);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
      await CV.findByIdAndDelete(oldCV._id);
    }

    const cv = new CV({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimeType: req.file.mimetype
    });

    await cv.save();
    res.status(201).json({
      id: cv._id,
      filename: cv.filename,
      originalName: cv.originalName,
      url: `/uploads/${cv.filename}`,
      size: cv.size,
      mimeType: cv.mimeType,
      uploadedAt: cv.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete CV (admin only)
router.delete('/', authenticate, async (req, res) => {
  try {
    const cv = await CV.findOne().sort({ createdAt: -1 });
    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }

    const filePath = path.join(uploadsDir, cv.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await CV.findByIdAndDelete(cv._id);
    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

