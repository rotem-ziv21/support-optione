import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import TicketList from './TicketList';
import CustomerList from './CustomerList';
import Reports from './Reports';
import Settings from './Settings';

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState('tickets');

  const renderView = () => {
    switch (currentView) {
      case 'tickets':
        return <TicketList />;
      case 'customers':
        return <CustomerList />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <TicketList />;
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
          {renderView()}
        </main>
      </div>
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
    </div>
  );
}