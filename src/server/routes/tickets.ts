import express from 'express';
import { z } from 'zod';
import { db } from '../db';

const router = express.Router();

// Ticket schema validation
const TicketSchema = z.object({
  customer_id: z.number(),
  title: z.string().min(5),
  description: z.string().min(10),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
  status: z.enum(['open', 'in_progress', 'resolved', 'closed']).default('open'),
});

// Get all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await db.query(`
      SELECT t.*, c.name as customer_name, c.email as customer_email 
      FROM tickets t 
      JOIN customers c ON t.customer_id = c.id 
      ORDER BY t.created_at DESC
    `);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// Get ticket by ID with updates
router.get('/:id', async (req, res) => {
  try {
    const ticket = await db.query(`
      SELECT t.*, c.name as customer_name, c.email as customer_email 
      FROM tickets t 
      JOIN customers c ON t.customer_id = c.id 
      WHERE t.id = ?
    `, [req.params.id]);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const updates = await db.query(
      'SELECT * FROM ticket_updates WHERE ticket_id = ? ORDER BY created_at DESC',
      [req.params.id]
    );

    res.json({ ...ticket, updates });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
});

// Create new ticket
router.post('/', async (req, res) => {
  try {
    const validatedData = TicketSchema.parse(req.body);
    const result = await db.query(
      'INSERT INTO tickets (customer_id, title, description, priority, status) VALUES (?, ?, ?, ?, ?)',
      [validatedData.customer_id, validatedData.title, validatedData.description, validatedData.priority, validatedData.status]
    );
    res.status(201).json({ id: result.lastID, ...validatedData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// Update ticket
router.put('/:id', async (req, res) => {
  try {
    const validatedData = TicketSchema.parse(req.body);
    await db.query(
      'UPDATE tickets SET customer_id = ?, title = ?, description = ?, priority = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [validatedData.customer_id, validatedData.title, validatedData.description, validatedData.priority, validatedData.status, req.params.id]
    );
    res.json({ id: req.params.id, ...validatedData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to update ticket' });
  }
});

// Add ticket update
router.post('/:id/updates', async (req, res) => {
  try {
    const { user_id, update_type, content } = req.body;
    const result = await db.query(
      'INSERT INTO ticket_updates (ticket_id, user_id, update_type, content) VALUES (?, ?, ?, ?)',
      [req.params.id, user_id, update_type, content]
    );
    res.status(201).json({ id: result.lastID, ticket_id: req.params.id, user_id, update_type, content });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add ticket update' });
  }
});

export default router;