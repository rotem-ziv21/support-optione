import { Request, Response } from 'express';
import { TicketService } from '../services/TicketService';
import { EmailService } from '../services/EmailService';

export class TicketController {
  private ticketService = new TicketService();
  private emailService = new EmailService();

  async update(req: Request, res: Response) {
    try {
      const ticket = await this.ticketService.update(req.params.id, req.body);
      
      // שליחת התראה במייל כאשר יש עדכון בפנייה
      await this.emailService.sendTicketNotification(ticket.customer.email, {
        id: ticket.id,
        title: ticket.title,
        status: ticket.status,
        priority: ticket.priority
      });

      res.json(ticket);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update ticket' });
    }
  }

  async addComment(req: Request, res: Response) {
    try {
      const { text, isInternal } = req.body;
      const comment = await this.ticketService.addComment(req.params.id, {
        text,
        isInternal,
        userId: req.user.id
      });

      // שליחת התראה במייל כאשר מתווספת תגובה חדשה
      const ticket = await this.ticketService.getById(req.params.id);
      if (ticket && !isInternal) {
        await this.emailService.sendTicketNotification(ticket.customer.email, {
          id: ticket.id,
          title: ticket.title,
          status: ticket.status,
          priority: ticket.priority
        });
      }

      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add comment' });
    }
  }
}