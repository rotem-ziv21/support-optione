import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// In-memory user store (for testing purposes only)
const users: { [key: string]: { password: string } } = {};

// Register Route
router.post('/register', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  if (users[username]) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // For testing purposes, store password directly without hashing
  users[username] = { password };

  res.status(201).json({ message: 'User registered successfully' });
});

// Login Route
router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
});

export const authRoutes = router;
