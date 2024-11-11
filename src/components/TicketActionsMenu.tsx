import React from 'react';
import { Edit2, Trash2, Share2, Archive, AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface TicketActionsMenuProps {
  ticket: any;
  onClose: () => void;
  onStatusChange: (ticketId: number, status: 'open' | 'pending' | 'resolved') => void;
  onPriorityChange: (ticketId: number, priority: 'high' | 'medium' | 'low') => void;
  onAssigneeChange: (ticketId: number, assignee: string) => void;
  onArchive: (ticketId: number) => void;
  onDelete: (ticketId: number) => void;
}

export default function TicketActionsMenu({
  ticket,
  onClose,
  onStatusChange,
  onPriorityChange,
  onAssigneeChange,
  onArchive,
  onDelete,
}: TicketActionsMenuProps) {
  return (
    <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
      <div className="py-1" role="menu">
        <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
          <div className="font-medium mb-1">עדיפות</div>
          <div className="space-y-1">
            <button
              onClick={() => {
                onPriorityChange(ticket.id, 'high');
                onClose();
              }}
              className="flex items-center gap-2 w-full px-2 py-1 text-right rounded hover:bg-gray-100"
            >
              <AlertCircle className="h-4 w-4 text-red-500" />
              גבוהה
            </button>
            <button
              onClick={() => {
                onPriorityChange(ticket.id, 'medium');
                onClose();
              }}
              className="flex items-center gap-2 w-full px-2 py-1 text-right rounded hover:bg-gray-100"
            >
              <Clock className="h-4 w-4 text-yellow-500" />
              בינונית
            </button>
            <button
              onClick={() => {
                onPriorityChange(ticket.id, 'low');
                onClose();
              }}
              className="flex items-center gap-2 w-full px-2 py-1 text-right rounded hover:bg-gray-100"
            >
              <CheckCircle className="h-4 w-4 text-green-500" />
              נמוכה
            </button>
          </div>
        </div>
        
        <div className="px-4 py-2 text-sm text-gray-700">
          <button className="flex items-center gap-2 w-full px-2 py-1 text-right rounded hover:bg-gray-100">
            <Edit2 className="h-4 w-4" />
            עריכת פנייה
          </button>
          <button className="flex items-center gap-2 w-full px-2 py-1 text-right rounded hover:bg-gray-100">
            <Share2 className="h-4 w-4" />
            שיתוף
          </button>
          <button 
            onClick={() => {
              onArchive(ticket.id);
              onClose();
            }}
            className="flex items-center gap-2 w-full px-2 py-1 text-right rounded hover:bg-gray-100"
          >
            <Archive className="h-4 w-4" />
            העברה לארכיון
          </button>
          <button 
            onClick={() => {
              onDelete(ticket.id);
              onClose();
            }}
            className="flex items-center gap-2 w-full px-2 py-1 text-right rounded hover:bg-gray-100 text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            מחיקה
          </button>
        </div>
      </div>
    </div>
  );
}