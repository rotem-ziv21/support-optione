import { Router } from 'express';
import { Request, Response } from 'express';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// אחסון משתמשים בזיכרון (לצורכי בדיקה בלבד)
const users: { [key: string]: { password: string } } = {};

// נתיב רישום
router.post('/register', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'שם משתמש וסיסמה נדרשים' });
  }

  if (users[username]) {
    return res.status(400).json({ error: 'המשתמש כבר קיים' });
  }

  // לצורכי בדיקה, שמירת הסיסמה ללא הצפנה
  users[username] = { password };

  res.status(201).json({ message: 'המשתמש נרשם בהצלחה' });
});

// נתיב התחברות
router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'שם משתמש וסיסמה נדרשים' });
  }

  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(400).json({ error: 'שם משתמש או סיסמה שגויים' });
  }

  // לצורכי בדיקה, שימוש ב-token פשוט
  const token = `test-token-for-${username}`;
  res.status(200).json({ token });
});

export const authRoutes = router;
