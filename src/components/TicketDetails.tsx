import React, { useState } from 'react';
import { Clock, AlertCircle, Tag, Paperclip, MessageSquare, User, MoreVertical } from 'lucide-react';
import TicketChat from './TicketChat';
import TicketActionsMenu from './TicketActionsMenu';
import { useTickets } from '../context/TicketContext';
import { formatTime } from '../utils/time';

interface TicketDetailsProps {
  ticket: any;
  onClose: () => void;
}

export default function TicketDetails({ ticket, onClose }: TicketDetailsProps) {
  const { tickets, updateTickets } = useTickets();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: ticket.description,
      sender: ticket.customer.name,
      timestamp: ticket.createdAt,
      isInternal: false
    }
  ]);
  const [workTimer, setWorkTimer] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(ticket);

  const handleSendMessage = (text: string, isInternal: boolean) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender: isInternal ? 'מנהל מערכת' : 'מנהל מערכת',
      timestamp: new Date().toISOString(),
      isInternal
    };
    setMessages([...messages, newMessage]);
  };

  const toggleTimer = () => {
    if (isTimerActive) {
      if (timerInterval) clearInterval(timerInterval);
      setTimerInterval(null);
    } else {
      const interval = setInterval(() => {
        setWorkTimer(prev => prev + 1);
      }, 1000);
      setTimerInterval(interval);
    }
    setIsTimerActive(!isTimerActive);
  };

  const updateTicketInList = (updatedTicket: any) => {
    const updatedTickets = tickets.map(t => 
      t.id === updatedTicket.id ? updatedTicket : t
    );
    updateTickets(updatedTickets);
    setCurrentTicket(updatedTicket);
  };

  const handleStatusChange = (status: 'new' | 'in_progress' | 'resolved') => {
    const updatedTicket = {
      ...currentTicket,
      status,
      updatedAt: new Date().toISOString()
    };
    updateTicketInList(updatedTicket);
    setShowActionsMenu(false);
  };

  const handlePriorityChange = (priority: 'high' | 'medium' | 'low') => {
    const updatedTicket = {
      ...currentTicket,
      priority,
      updatedAt: new Date().toISOString()
    };
    updateTicketInList(updatedTicket);
    setShowActionsMenu(false);
  };

  const handleAssigneeChange = (assignee: string) => {
    const updatedTicket = {
      ...currentTicket,
      assignedTo: assignee,
      updatedAt: new Date().toISOString()
    };
    updateTicketInList(updatedTicket);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-[800px] bg-white h-full shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">פנייה #{currentTicket.id}</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowActionsMenu(!showActionsMenu)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
                {showActionsMenu && (
                  <TicketActionsMenu
                    ticket={currentTicket}
                    onClose={() => setShowActionsMenu(false)}
                    onStatusChange={handleStatusChange}
                    onPriorityChange={handlePriorityChange}
                    onAssigneeChange={handleAssigneeChange}
                    onArchive={(id) => console.log('Archive:', id)}
                    onDelete={(id) => console.log('Delete:', id)}
                  />
                )}
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">{currentTicket.title}</h3>
              <p className="text-sm text-gray-500">
                נפתח על ידי {currentTicket.customer.name} • {new Date(currentTicket.createdAt).toLocaleString('he-IL')}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                  currentTicket.status === 'new' ? 'bg-blue-100 text-blue-800' :
                  currentTicket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  <Clock className="h-4 w-4" />
                  {currentTicket.status === 'new' ? 'חדש' :
                   currentTicket.status === 'in_progress' ? 'בטיפול' : 'טופל'}
                </span>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                  currentTicket.priority === 'high' ? 'bg-red-100 text-red-800' :
                  currentTicket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  <AlertCircle className="h-4 w-4" />
                  {currentTicket.priority === 'high' ? 'דחוף' :
                   currentTicket.priority === 'medium' ? 'בינוני' : 'רגיל'}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  <Tag className="h-4 w-4" />
                  {currentTicket.category}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={toggleTimer}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                    isTimerActive ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <Clock className="h-4 w-4" />
                  {formatTime(workTimer)}
                </button>

                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100">
                  <User className="h-4 w-4 text-gray-600" />
                  <select
                    value={currentTicket.assignedTo || ''}
                    onChange={(e) => handleAssigneeChange(e.target.value)}
                    className="bg-transparent border-none text-sm focus:ring-0"
                  >
                    <option value="">שייך לנציג</option>
                    <option value="agent1">דני לוי</option>
                    <option value="agent2">מירי כהן</option>
                    <option value="agent3">יוסי אברהם</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 p-6 overflow-y-auto">
          <TicketChat
            ticketId={currentTicket.id}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}