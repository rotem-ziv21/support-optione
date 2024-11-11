import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { TicketProvider } from './context/TicketContext';
import AdminDashboard from './components/AdminDashboard';
import CustomerPortal from './components/CustomerPortal';
import AuthPages from './components/AuthPages';
import { useAuth } from './context/AuthContext';

function AppContent() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthPages />;
  }

  return user?.role === 'admin' ? <AdminDashboard /> : <CustomerPortal />;
}

function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <AppContent />
      </TicketProvider>
    </AuthProvider>
  );
}

export default App;