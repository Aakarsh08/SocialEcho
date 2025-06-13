import express from 'express';
import upload from '../middlewares/upload.js';
import cloudinary from '../utils/cloudinary.js';

const router = express.Router();

// Simple upload test — no auth, just file upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const cloudRes = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
    });

    res.status(200).json({ url: cloudRes.secure_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
