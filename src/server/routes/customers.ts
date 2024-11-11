import express from 'express';
import { z } from 'zod';
import { db } from '../db';

const router = express.Router();

// Customer schema validation
const CustomerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
});

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await db.query('SELECT * FROM customers ORDER BY created_at DESC');
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// Get customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await db.query('SELECT * FROM customers WHERE id = ?', [req.params.id]);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
});

// Create new customer
router.post('/', async (req, res) => {
  try {
    const validatedData = CustomerSchema.parse(req.body);
    const result = await db.query(
      'INSERT INTO customers (name, email, company, phone) VALUES (?, ?, ?, ?)',
      [validatedData.name, validatedData.email, validatedData.company, validatedData.phone]
    );
    res.status(201).json({ id: result.lastID, ...validatedData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

// Update customer
router.put('/:id', async (req, res) => {
  try {
    const validatedData = CustomerSchema.parse(req.body);
    await db.query(
      'UPDATE customers SET name = ?, email = ?, company = ?, phone = ? WHERE id = ?',
      [validatedData.name, validatedData.email, validatedData.company, validatedData.phone, req.params.id]
    );
    res.json({ id: req.params.id, ...validatedData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to update customer' });
  }
});

// Delete customer
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM customers WHERE id = ?', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete customer' });
  }
});

export default router;