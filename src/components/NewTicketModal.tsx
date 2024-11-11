import React from 'react';
import { X } from 'lucide-react';

interface NewTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewTicketModal({ isOpen, onClose }: NewTicketModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-[600px] bg-white h-full shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">פנייה חדשה</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="customer" className="block font-medium">
              שם הלקוח
            </label>
            <input
              type="text"
              id="customer"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="title" className="block font-medium">
              נושא הפנייה
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="block font-medium">
              קטגוריה
            </label>
            <select
              id="category"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="technical">תמיכה טכנית</option>
              <option value="billing">חשבונות</option>
              <option value="financial">כספים</option>
              <option value="general">כללי</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="priority" className="block font-medium">
              עדיפות
            </label>
            <select
              id="priority"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">נמוכה</option>
              <option value="medium">בינונית</option>
              <option value="high">גבוהה</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block font-medium">
              תיאור הפנייה
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              שליחת פנייה
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}