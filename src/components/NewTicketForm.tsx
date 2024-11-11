import React, { useState, useRef } from 'react';
import { X, Upload, Paperclip } from 'lucide-react';
import { useTickets } from '../context/TicketContext';
import { useAuth } from '../context/AuthContext';

interface NewTicketFormProps {
  onClose: () => void;
}

export default function NewTicketForm({ onClose }: NewTicketFormProps) {
  const { tickets, updateTickets } = useTickets();
  const { user } = useAuth();
  
  // ... rest of the imports and state setup ...

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.description || !user) return;
    
    setIsSubmitting(true);

    try {
      const newTicket = {
        id: Math.max(...tickets.map(t => t.id), 0) + 1,
        title: formData.subject,
        description: formData.description,
        status: 'new' as const,
        priority: formData.priority as 'low' | 'medium' | 'high',
        category: formData.category,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        customer: {
          name: user.name,
          email: user.email,
          companyName: user.companyName
        },
        attachments: files.map((file, index) => ({
          id: Date.now() + index,
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          type: file.type,
          url: URL.createObjectURL(file)
        })),
        comments: []
      };

      const updatedTickets = [...tickets, newTicket];
      updateTickets(updatedTickets);
      onClose();
    } catch (error) {
      console.error('Failed to submit ticket:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... rest of the component remains the same ...
}