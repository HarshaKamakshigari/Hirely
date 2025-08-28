import express from 'express';
import User from '../models/user.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET all users (admin only)
router.get('/all',  async (req, res) => {
  try {
    const users = await User.find({}, '-password -verificationToken'); // exclude sensitive fields
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// DELETE a user by id
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Optional: add new user
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const { username, name, email, userType, password } = req.body;
    const newUser = await User.create({ username, name, email, userType, password });
    const safeUser = (({ _id, username, name, email, userType }) => ({ _id, username, name, email, userType }))(newUser);
    res.json(safeUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

export default router;