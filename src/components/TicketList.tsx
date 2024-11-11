import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import { Clock, Filter, MessageSquare, AlertCircle, User, CheckCircle, XCircle } from 'lucide-react';
import { formatTime } from '../utils/time';
import TicketDetails from './TicketDetails';

export default function TicketList() {
  const { tickets, updateTickets } = useTickets();
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [workTimers, setWorkTimers] = useState({});

  const filteredTickets = filterStatus === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === filterStatus);

  const toggleTimer = (ticketId) => {
    setWorkTimers(prev => ({
      ...prev,
      [ticketId]: {
        ...prev[ticketId],
        isActive: !prev[ticketId]?.isActive,
        time: prev[ticketId]?.time || 0
      }
    }));
  };

  const handleStatusChange = (ticketId, newStatus) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString() }
        : ticket
    );
    updateTickets(updatedTickets);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center gap-4 bg-white p-2 rounded-lg shadow-sm">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">כל הפניות</option>
            <option value="new">חדשות</option>
            <option value="in_progress">בטיפול</option>
            <option value="resolved">טופלו</option>
          </select>
          <Filter className="text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  מספר פנייה
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  לקוח
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  נושא
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  סטטוס
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  עדיפות
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  נציג מטפל
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  זמן טיפול
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr 
                  key={ticket.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="font-mono text-blue-600 font-medium">#{ticket.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-medium text-gray-900">{ticket.customer.name}</div>
                    <div className="text-sm text-gray-500">{ticket.customer.email}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs mx-auto">
                      {ticket.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        ticket.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {ticket.status === 'new' ? 'חדש' :
                         ticket.status === 'in_progress' ? 'בטיפול' : 'טופל'}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(ticket.id, 'in_progress');
                          }}
                          className="p-1 hover:bg-yellow-100 rounded-full text-yellow-600"
                          title="סמן בטיפול"
                        >
                          <Clock className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(ticket.id, 'resolved');
                          }}
                          className="p-1 hover:bg-green-100 rounded-full text-green-600"
                          title="סמן כטופל"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(ticket.id, 'new');
                          }}
                          className="p-1 hover:bg-red-100 rounded-full text-red-600"
                          title="החזר לחדש"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.priority === 'high' ? 'דחוף' :
                       ticket.priority === 'medium' ? 'בינוני' : 'רגיל'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-500" />
                      </div>
                      <span className="text-sm text-gray-900">
                        {ticket.assignedTo || 'לא משויך'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTimer(ticket.id);
                      }}
                      className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
                    >
                      <Clock className={`h-4 w-4 mr-1 ${
                        workTimers[ticket.id]?.isActive ? 'text-green-500' : 'text-gray-500'
                      }`} />
                      <span>{formatTime(workTimers[ticket.id]?.time || 0)}</span>
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTicket(ticket);
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MessageSquare className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTicket && (
        <TicketDetails
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}