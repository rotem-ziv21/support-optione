import React, { useState } from 'react';
import { Send, Paperclip, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  isInternal: boolean;
  attachments?: { name: string; url: string }[];
}

interface TicketChatProps {
  ticketId: number;
  messages: Message[];
  onSendMessage: (text: string, isInternal: boolean) => void;
}

export default function TicketChat({ ticketId, messages, onSendMessage }: TicketChatProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    onSendMessage(newMessage, isInternal);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">התכתבות</h3>
          <button
            onClick={() => setIsInternal(!isInternal)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              isInternal 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {isInternal ? (
              <>
                <Lock className="h-4 w-4" />
                הערה פנימית
              </>
            ) : (
              'תגובה ללקוח'
            )}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.isInternal ? 'items-start' : 'items-end'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.isInternal
                  ? 'bg-yellow-50 border border-yellow-200'
                  : 'bg-blue-50 border border-blue-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{message.sender}</span>
                {message.isInternal && (
                  <Lock className="h-3 w-3 text-yellow-600" />
                )}
              </div>
              <p className="text-gray-800 whitespace-pre-wrap">{message.text}</p>
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {message.attachments.map((file, index) => (
                    <a
                      key={index}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                    >
                      <Paperclip className="h-3 w-3" />
                      {file.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {new Date(message.timestamp).toLocaleString('he-IL')}
            </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={isInternal ? "הוסף הערה פנימית..." : "כתוב תגובה..."}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <button
              type="submit"
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}