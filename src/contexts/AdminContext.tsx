import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../lib/supabase';

interface AdminContextType {
  pendingRegistrations: number;
  approveRegistration: (userId: string) => Promise<void>;
  rejectRegistration: (userId: string) => Promise<void>;
  createEvent: (eventData: any) => Promise<void>;
  updateEvent: (eventId: string, eventData: any) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [pendingRegistrations, setPendingRegistrations] = useState(0);

  const approveRegistration = async (userId: string) => {
    const { error } = await supabase
      .from('user_verifications')
      .update({ status: 'approved', verified_at: new Date().toISOString() })
      .eq('user_id', userId);

    if (error) throw error;
    setPendingRegistrations(prev => prev - 1);
  };

  const rejectRegistration = async (userId: string) => {
    const { error } = await supabase
      .from('user_verifications')
      .update({ status: 'rejected', verified_at: new Date().toISOString() })
      .eq('user_id', userId);

    if (error) throw error;
    setPendingRegistrations(prev => prev - 1);
  };

  const createEvent = async (eventData: any) => {
    const { error } = await supabase
      .from('events')
      .insert([eventData]);

    if (error) throw error;
  };

  const updateEvent = async (eventId: string, eventData: any) => {
    const { error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', eventId);

    if (error) throw error;
  };

  const deleteEvent = async (eventId: string) => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId);

    if (error) throw error;
  };

  return (
    <AdminContext.Provider value={{
      pendingRegistrations,
      approveRegistration,
      rejectRegistration,
      createEvent,
      updateEvent,
      deleteEvent
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}