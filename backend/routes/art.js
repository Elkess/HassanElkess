import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Art from '../models/Art.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only image files are allowed.'));
    }
  }
});

// Get all artwork (public)
router.get('/', async (req, res) => {
  try {
    const { artistId, category, page = 1, limit = 12 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (artistId) query.artist = artistId;
    if (category) query.category = category;

    const artworks = await Art.find(query)
      .populate('artist', 'username artistName profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Art.countDocuments(query);

    res.json({
      artworks,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get artist's artworks
router.get('/artist/:artistId', async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (page - 1) * limit;

    const artworks = await Art.find({ artist: req.params.artistId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Art.countDocuments({ artist: req.params.artistId });

    res.json({
      artworks,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single artwork
router.get('/:id', async (req, res) => {
  try {
    const artwork = await Art.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('artist', 'username artistName profileImage bio socialLinks');

    if (!artwork) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    res.json(artwork);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create artwork (authenticated)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const { title, description, category, tags, price, isForSale } = req.body;

    const artwork = new Art({
      title,
      description,
      artist: req.userId,
      image: `/uploads/${req.file.filename}`,
      category: category || 'other',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      price: price || null,
      isForSale: isForSale === 'true'
    });

    await artwork.save();
    await artwork.populate('artist', 'username artistName profileImage');

    res.status(201).json(artwork);
  } catch (error) {
    // Delete file if artwork creation fails
    if (req.file) {
      fs.unlink(path.join(__dirname, '../uploads', req.file.filename), (err) => {
        if (err) console.error(err);
      });
    }
    res.status(500).json({ error: error.message });
  }
});

// Update artwork (authenticated, only artist can update)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    let artwork = await Art.findById(req.params.id);

    if (!artwork) {
      if (req.file) {
        fs.unlink(path.join(__dirname, '../uploads', req.file.filename), (err) => {
          if (err) console.error(err);
        });
      }
      return res.status(404).json({ error: 'Artwork not found' });
    }

    if (artwork.artist.toString() !== req.userId) {
      if (req.file) {
        fs.unlink(path.join(__dirname, '../uploads', req.file.filename), (err) => {
          if (err) console.error(err);
        });
      }
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { title, description, category, tags, price, isForSale } = req.body;

    // Delete old image if new one is uploaded
    if (req.file) {
      const oldImagePath = path.join(__dirname, '../uploads', path.basename(artwork.image));
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error(err);
      });
      artwork.image = `/uploads/${req.file.filename}`;
    }

    artwork.title = title || artwork.title;
    artwork.description = description || artwork.description;
    artwork.category = category || artwork.category;
    if (tags) artwork.tags = tags.split(',').map(tag => tag.trim());
    if (price !== undefined) artwork.price = price || null;
    if (isForSale !== undefined) artwork.isForSale = isForSale === 'true';

    await artwork.save();
    await artwork.populate('artist', 'username artistName profileImage');

    res.json(artwork);
  } catch (error) {
    if (req.file) {
      fs.unlink(path.join(__dirname, '../uploads', req.file.filename), (err) => {
        if (err) console.error(err);
      });
    }
    res.status(500).json({ error: error.message });
  }
});

// Delete artwork (authenticated, only artist can delete)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const artwork = await Art.findById(req.params.id);

    if (!artwork) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    if (artwork.artist.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Delete image file
    const imagePath = path.join(__dirname, '../uploads', path.basename(artwork.image));
    fs.unlink(imagePath, (err) => {
      if (err) console.error(err);
    });

    await Art.findByIdAndDelete(req.params.id);

    res.json({ message: 'Artwork deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
