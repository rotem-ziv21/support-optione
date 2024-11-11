import React, { createContext, useContext, useState } from 'react';
import { initialTickets } from '../data/initialTickets';
import { Ticket } from '../types/ticket';

interface TicketContextType {
  tickets: Ticket[];
  updateTickets: (newTickets: Ticket[]) => void;
  getTicketStats: () => {
    open: number;
    responseTime: string;
    resolutionRate: string;
  };
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: React.ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

  const updateTickets = (newTickets: Ticket[]) => {
    setTickets(newTickets);
  };

  const getTicketStats = () => {
    const openTickets = tickets.filter(t => t.status !== 'resolved').length;
    const totalTickets = tickets.length;
    const resolutionRate = totalTickets > 0 
      ? `${Math.round((tickets.filter(t => t.status === 'resolved').length / totalTickets) * 100)}%`
      : '0%';

    return {
      open: openTickets,
      responseTime: '2.5 שעות',
      resolutionRate
    };
  };

  const value = {
    tickets,
    updateTickets,
    getTicketStats
  };

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
}