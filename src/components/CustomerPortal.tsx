import React, { useState } from 'react';
import { 
  Plus, 
  MessageSquare, 
  Paperclip,
  X,
  Upload
} from 'lucide-react';
import { useTickets } from '../context/TicketContext';
import { useAuth } from '../context/AuthContext';

export default function CustomerPortal() {
  const { tickets, updateTickets } = useTickets();
  const { user } = useAuth();
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: 'technical'
  });

  // Filter tickets to show only the current customer's tickets
  const customerTickets = tickets.filter(ticket => 
    ticket.customer.email === user?.email
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newTicket = {
      id: Math.max(...tickets.map(t => t.id), 0) + 1,
      title: formData.subject,
      description: formData.description,
      status: 'new' as const,
      priority: 'medium' as const,
      category: formData.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customer: {
        name: user.name,
        email: user.email
      },
      attachments: [],
      comments: []
    };

    updateTickets([...tickets, newTicket]);
    setIsNewTicketOpen(false);
    setFormData({ subject: '', description: '', category: 'technical' });
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">הפניות שלי</h1>
          <button
            onClick={() => setIsNewTicketOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            פנייה חדשה
          </button>
        </div>

        <div className="space-y-4">
          {customerTickets.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">אין פניות פתוחות</h3>
              <p className="text-gray-500">לחץ על "פנייה חדשה" כדי ליצור פנייה חדשה</p>
            </div>
          ) : (
            customerTickets.map(ticket => (
              <div
                key={ticket.id}
                className="bg-white rounded-lg border border-gray-200 p-4"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">{ticket.title}</h3>
                    <p className="text-sm text-gray-500">
                      #{ticket.id} • נפתח ב-{new Date(ticket.createdAt).toLocaleDateString('he-IL')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    ticket.status === 'new' ? 'bg-blue-100 text-blue-800' :
                    ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                    ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {ticket.status === 'new' ? 'חדש' :
                     ticket.status === 'in_progress' ? 'בטיפול' :
                     ticket.status === 'resolved' ? 'טופל' : 'סגור'}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{ticket.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {ticket.comments.length} תגובות
                  </span>
                  <span className="flex items-center gap-1">
                    <Paperclip className="h-4 w-4" />
                    {ticket.attachments.length} קבצים
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {isNewTicketOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold">פנייה חדשה</h2>
                <button
                  onClick={() => setIsNewTicketOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label htmlFor="subject" className="block font-medium mb-2">נושא</label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="נושא הפנייה"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block font-medium mb-2">תיאור</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-lg resize-none"
                    placeholder="תאר את הבעיה בפירוט"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block font-medium mb-2">קטגוריה</label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="technical">תמיכה טכנית</option>
                    <option value="billing">חשבונות</option>
                    <option value="general">כללי</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-2">קבצים מצורפים</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input type="file" className="hidden" multiple />
                    <button type="button" className="flex items-center justify-center gap-2 mx-auto text-gray-600">
                      <Upload className="h-5 w-5" />
                      <span>העלה קבצים</span>
                    </button>
                    <p className="text-sm text-gray-500 mt-2">או גרור קבצים לכאן</p>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNewTicketOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    ביטול
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    שלח פנייה
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}