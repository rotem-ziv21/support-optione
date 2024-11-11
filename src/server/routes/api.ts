import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { TicketController } from '../controllers/TicketController';
import { CustomerController } from '../controllers/CustomerController';
import { ReportController } from '../controllers/ReportController';

const router = Router();
const ticketController = new TicketController();
const customerController = new CustomerController();
const reportController = new ReportController();

// Analytics & Reports
router.get('/analytics/overview', authenticate, reportController.getOverview);
router.get('/analytics/tickets-by-status', authenticate, reportController.getTicketsByStatus);
router.get('/analytics/response-times', authenticate, reportController.getResponseTimes);
router.get('/analytics/customer-satisfaction', authenticate, reportController.getCustomerSatisfaction);
router.get('/analytics/agent-performance', authenticate, reportController.getAgentPerformance);

// Advanced Ticket Operations
router.post('/tickets/:id/escalate', authenticate, ticketController.escalateTicket);
router.post('/tickets/:id/merge', authenticate, ticketController.mergeTickets);
router.post('/tickets/:id/split', authenticate, ticketController.splitTicket);
router.post('/tickets/bulk-update', authenticate, ticketController.bulkUpdate);
router.get('/tickets/search', authenticate, ticketController.searchTickets);

// Customer Management
router.get('/customers/:id/history', authenticate, customerController.getCustomerHistory);
router.get('/customers/:id/metrics', authenticate, customerController.getCustomerMetrics);
router.post('/customers/import', authenticate, customerController.importCustomers);
router.post('/customers/export', authenticate, customerController.exportCustomers);

// Automation & Workflows
router.post('/workflows', authenticate, async (req, res) => {
  try {
    // Handle workflow creation
    res.status(201).json({ message: 'Workflow created' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workflow' });
  }
});

// Integration Endpoints
router.post('/webhooks/:integration', async (req, res) => {
  try {
    // Handle incoming webhooks from various integrations
    res.status(200).json({ message: 'Webhook processed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});

// Knowledge Base
router.get('/kb/articles', async (req, res) => {
  try {
    // Return knowledge base articles
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// SLA Management
router.get('/sla/policies', authenticate, async (req, res) => {
  try {
    // Return SLA policies
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch SLA policies' });
  }
});

export const apiRoutes = router;