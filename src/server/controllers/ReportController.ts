import { Request, Response } from 'express';

export class ReportController {
  async getOverview(req: Request, res: Response) {
    try {
      const overview = {
        totalTickets: 150,
        openTickets: 45,
        avgResponseTime: '2.5h',
        customerSatisfaction: '4.2/5',
        ticketsByPriority: {
          high: 15,
          medium: 25,
          low: 5
        }
      };
      res.json(overview);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch overview' });
    }
  }

  async getTicketsByStatus(req: Request, res: Response) {
    try {
      const stats = {
        new: 20,
        inProgress: 15,
        pending: 10,
        resolved: 100,
        closed: 5
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch ticket stats' });
    }
  }

  async getResponseTimes(req: Request, res: Response) {
    try {
      const times = {
        average: '2.5h',
        byPriority: {
          high: '30m',
          medium: '2h',
          low: '4h'
        },
        byAgent: {
          'agent1@example.com': '1.5h',
          'agent2@example.com': '2h'
        }
      };
      res.json(times);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch response times' });
    }
  }

  async getCustomerSatisfaction(req: Request, res: Response) {
    try {
      const satisfaction = {
        overall: 4.2,
        trend: '+0.3',
        byCategory: {
          technical: 4.5,
          billing: 3.9,
          general: 4.1
        }
      };
      res.json(satisfaction);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch satisfaction data' });
    }
  }

  async getAgentPerformance(req: Request, res: Response) {
    try {
      const performance = {
        byAgent: [
          {
            name: 'Agent 1',
            ticketsResolved: 45,
            avgResponseTime: '1.5h',
            satisfaction: 4.5
          },
          {
            name: 'Agent 2',
            ticketsResolved: 38,
            avgResponseTime: '2h',
            satisfaction: 4.2
          }
        ]
      };
      res.json(performance);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch agent performance' });
    }
  }
}