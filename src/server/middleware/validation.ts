import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const ticketSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1),
  category: z.enum(['technical', 'billing', 'financial', 'general']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  customer: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional()
  })
});

export const validateTicket = (req: Request, res: Response, next: NextFunction) => {
  try {
    ticketSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(400).json({ error: 'Invalid request body' });
    }
  }
};