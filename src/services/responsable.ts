import { supabase } from '../lib/supabase';

export const responsableService = {
  async getCollaborators(poleId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('pole', poleId)
      .eq('role', 'collaborateur');

    if (error) throw error;
    return data;
  },

  async approveCollaborator(userId: string) {
    const { error } = await supabase
      .from('users')
      .update({ is_active: true })
      .eq('id', userId);

    if (error) throw error;
  },

  async rejectCollaborator(userId: string) {
    const { error } = await supabase
      .from('users')
      .update({ is_active: false })
      .eq('id', userId);

    if (error) throw error;
  },

  async getPoleEvents(poleId: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('pole', poleId)
      .order('date', { ascending: true });

    if (error) throw error;
    return data;
  },

  async createPoleEvent(eventData: {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    maxParticipants: number;
    pole: string;
    imageUrl?: string;
  }) {
    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updatePoleEvent(eventId: string, eventData: Partial<{
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    maxParticipants: number;
    imageUrl?: string;
  }>) {
    const { data, error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', eventId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deletePoleEvent(eventId: string) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId);

    if (error) throw error;
  },

  async getPoleStatistics(poleId: string) {
    // Statistiques des événements
    const { data: eventStats, error: eventError } = await supabase
      .from('events')
      .select('id, title, registrations:event_registrations(count)')
      .eq('pole', poleId)
      .order('date', { ascending: false })
      .limit(5);

    if (eventError) throw eventError;

    // Statistiques des collaborateurs
    const { data: collaboratorStats, error: collaboratorError } = await supabase
      .from('users')
      .select('count')
      .eq('pole', poleId)
      .eq('role', 'collaborateur');

    if (collaboratorError) throw collaboratorError;

    return {
      events: eventStats,
      collaborators: collaboratorStats
    };
  }
};