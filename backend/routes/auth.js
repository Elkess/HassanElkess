import express from 'express';
import { body, validationResult } from 'express-validator';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import User from '../models/User.js';
import { generateToken, authMiddleware } from '../middleware/auth.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `profile-${Date.now()}-${file.originalname}`);
  }
});

const uploadProfileImage = multer({
  storage: profileStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(new Error('Invalid file type. Only image files are allowed.'));
  }
});

// Register
router.post('/register', [
  body('username').trim().isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password, artistName } = req.body;

    // Check if user exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
      artistName: artistName || username
    });

    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        artistName: user.artistName
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        artistName: user.artistName
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get public artist profile
router.get('/artist/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -email');
    if (!user) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', authMiddleware, uploadProfileImage.single('profileImage'), async (req, res) => {
  try {
    const { artistName, bio } = req.body;

    const parseJsonField = (value, fallback) => {
      if (!value) return fallback;
      if (typeof value !== 'string') return value;
      try {
        return JSON.parse(value);
      } catch {
        return fallback;
      }
    };

    const socialLinks = parseJsonField(req.body.socialLinks, {});
    const showcasesPast = parseJsonField(req.body.showcasesPast, []);
    const showcasesUpcoming = parseJsonField(req.body.showcasesUpcoming, []);
    const profileImage = req.file ? `/uploads/${req.file.filename}` : req.body.profileImage;

    const existingUser = await User.findById(req.userId);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.file && existingUser.profileImage && existingUser.profileImage.startsWith('/uploads/')) {
      const oldImagePath = path.join(__dirname, '../uploads', path.basename(existingUser.profileImage));
      fs.unlink(oldImagePath, () => {});
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        artistName: artistName ?? existingUser.artistName,
        bio: bio ?? existingUser.bio,
        socialLinks,
        profileImage: profileImage || existingUser.profileImage,
        showcasesPast: Array.isArray(showcasesPast) ? showcasesPast : [],
        showcasesUpcoming: Array.isArray(showcasesUpcoming) ? showcasesUpcoming : []
      },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
