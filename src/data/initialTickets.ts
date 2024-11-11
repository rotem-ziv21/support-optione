import { Ticket } from '../types/ticket';

export const initialTickets: Ticket[] = [
  {
    id: 1,
    title: 'בעיה בהתחברות למערכת',
    description: 'לא מצליח להתחבר למערכת כבר שעתיים. מקבל שגיאת 403.',
    status: 'new',
    priority: 'high',
    category: 'technical',
    createdAt: '2024-03-10T08:00:00Z',
    updatedAt: '2024-03-10T08:00:00Z',
    customer: {
      name: 'ישראל ישראלי',
      email: 'israel@example.com',
      phone: '050-1234567'
    },
    attachments: [],
    comments: []
  },
  {
    id: 2,
    title: 'בקשה לשדרוג חבילה',
    description: 'מעוניין לשדרג את החבילה הנוכחית לחבילה העסקית',
    status: 'in_progress',
    priority: 'medium',
    category: 'billing',
    createdAt: '2024-03-09T15:30:00Z',
    updatedAt: '2024-03-10T09:15:00Z',
    customer: {
      name: 'שרה כהן',
      email: 'sarah@example.com'
    },
    assignedTo: 'דני לוי',
    attachments: [],
    comments: [
      {
        id: 1,
        text: 'יצרתי קשר עם מחלקת המכירות',
        author: 'דני לוי',
        timestamp: '2024-03-10T09:15:00Z',
        isInternal: true
      }
    ]
  },
  {
    id: 3,
    title: 'שאלה לגבי חשבונית',
    description: 'לא קיבלתי חשבונית עבור החיוב האחרון',
    status: 'pending',
    priority: 'low',
    category: 'billing',
    createdAt: '2024-03-08T11:20:00Z',
    updatedAt: '2024-03-09T14:45:00Z',
    customer: {
      name: 'רחל לוי',
      email: 'rachel@example.com',
      phone: '050-9876543'
    },
    assignedTo: 'מירי כהן',
    attachments: [],
    comments: []
  }
];