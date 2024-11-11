import express from 'express';
import cors from 'cors';
import { createClient } from '@libsql/client';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Initialize LibSQL client
const db = createClient({
  url: 'file:local.db',
});

// Initialize database tables
async function initDB() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      company_name TEXT,
      created_at TEXT NOT NULL
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL,
      priority TEXT NOT NULL,
      category TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      customer_id INTEGER NOT NULL,
      FOREIGN KEY (customer_id) REFERENCES users (id)
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY,
      ticket_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL,
      is_internal BOOLEAN NOT NULL,
      FOREIGN KEY (ticket_id) REFERENCES tickets (id),
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS attachments (
      id INTEGER PRIMARY KEY,
      ticket_id INTEGER NOT NULL,
      filename TEXT NOT NULL,
      url TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (ticket_id) REFERENCES tickets (id)
    )
  `);
}

// Initialize database
initDB().catch(console.error);

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, companyName } = req.body;
    const now = new Date().toISOString();

    const result = await db.execute({
      sql: `
        INSERT INTO users (name, email, password, role, company_name, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      args: [name, email, password, 'customer', companyName, now]
    });

    res.status(201).json({
      id: result.lastInsertRowid,
      name,
      email,
      role: 'customer',
      companyName
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ? AND password = ?',
      args: [email, password]
    });

    if (!result.rows.length) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyName: user.company_name
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

// Ticket routes
app.get('/api/tickets', async (req, res) => {
  try {
    const { userId, role } = req.query;
    let sql = 'SELECT * FROM tickets';
    const args: any[] = [];

    if (role === 'customer' && userId) {
      sql += ' WHERE customer_id = ?';
      args.push(userId);
    }

    sql += ' ORDER BY created_at DESC';
    
    const result = await db.execute({ sql, args });
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

app.post('/api/tickets', async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      customerId
    } = req.body;

    const now = new Date().toISOString();

    const result = await db.execute({
      sql: `
        INSERT INTO tickets (
          title, description, status, priority, category,
          created_at, updated_at, customer_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        title,
        description,
        'new',
        'medium',
        category,
        now,
        now,
        customerId
      ]
    });

    res.status(201).json({
      id: result.lastInsertRowid,
      title,
      description,
      status: 'new',
      priority: 'medium',
      category,
      createdAt: now,
      updatedAt: now,
      customerId
    });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});