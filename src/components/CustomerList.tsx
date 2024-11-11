import React, { useState } from 'react';
import { User, Phone, Mail, Edit, Trash2, Plus, Search } from 'lucide-react';
import NewCustomerModal from './NewCustomerModal';

const customers = [
  {
    id: 1,
    name: 'ישראל ישראלי',
    email: 'israel@example.com',
    phone: '050-1234567',
    company: 'חברת הייטק בע"מ',
    ticketsCount: 3,
    status: 'active',
  },
  {
    id: 2,
    name: 'חיים כהן',
    email: 'haim@example.com',
    phone: '052-7654321',
    company: 'סטארט-אפ חדשני',
    ticketsCount: 1,
    status: 'active',
  },
  {
    id: 3,
    name: 'שרה לוי',
    email: 'sara@example.com',
    phone: '054-9876543',
    company: 'עסק קטן',
    ticketsCount: 2,
    status: 'inactive',
  },
];

export default function CustomerList() {
  const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false);

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">לקוחות</h2>
          <button
            onClick={() => setIsNewCustomerModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            לקוח חדש
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="search"
                placeholder="חיפוש לקוחות..."
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{customer.name}</h3>
                      <p className="text-sm text-gray-500">{customer.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 text-gray-500">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">{customer.phone}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Edit className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Trash2 className="h-5 w-5 text-gray-400 hover:text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    customer.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.status === 'active' ? 'פעיל' : 'לא פעיל'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {customer.ticketsCount} פניות פתוחות
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NewCustomerModal
        isOpen={isNewCustomerModalOpen}
        onClose={() => setIsNewCustomerModalOpen(false)}
      />
    </>
  );
}