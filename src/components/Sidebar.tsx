import React from 'react';
import { TicketPlus, Users, BarChart, Settings, MessageSquare } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'tickets', icon: TicketPlus, label: 'פניות', count: 12 },
    { id: 'customers', icon: Users, label: 'לקוחות', count: 0 },
    { id: 'reports', icon: BarChart, label: 'דוחות', count: 0 },
    { id: 'settings', icon: Settings, label: 'הגדרות', count: 0 },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-3">
          <MessageSquare className="h-8 w-8" />
          <span>מערכת פניות</span>
        </h1>
      </div>
      
      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center w-full px-4 py-3 text-right rounded-lg transition-colors ${
                currentView === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              <item.icon className={`h-5 w-5 ml-3 ${
                currentView === item.id ? 'text-blue-600' : 'text-gray-600'
              }`} />
              <span className="flex-1">{item.label}</span>
              {item.count > 0 && (
                <span className="bg-blue-100 text-blue-600 px-2.5 py-0.5 rounded-full text-sm">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">שדרוג לפרימיום</h3>
          <p className="text-sm text-blue-600 mb-3">קבל גישה לכל התכונות המתקדמות</p>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            שדרג עכשיו
          </button>
        </div>
      </div>
    </aside>
  );
}