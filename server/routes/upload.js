import express from 'express';
import uploadMiddleware from '../middleware/upload.js';
import { auth, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/upload', auth, authorize(['Admin', 'HR']), uploadMiddleware, (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ filename: req.file.filename, path: req.file.path, uploadedAt: new Date().toISOString() });
});

export default router;