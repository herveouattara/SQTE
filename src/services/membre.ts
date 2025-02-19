import { supabase } from '../lib/supabase';

export const membreService = {
  async getUpcomingEvents(userId: string) {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        registrations:event_registrations(status)
      `)
      .gte('date', new Date().toISOString())
      .order('date', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getPastEvents(userId: string) {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        registrations:event_registrations(status)
      `)
      .lt('date', new Date().toISOString())
      .order('date', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getDonations(userId: string) {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getMessages(userId: string) {
    const { data, error } = await supabase
      .from('user_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async markMessageAsRead(messageId: string) {
    const { error } = await supabase
      .from('user_messages')
      .update({ read: true })
      .eq('id', messageId);

    if (error) throw error;
  },

  async updateProfile(userId: string, updates: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }) {
    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId);

    if (error) throw error;
  },

  async getLoyaltyPoints(userId: string) {
    const { data, error } = await supabase
      .from('loyalty_points')
      .select('points')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data?.points || 0;
  },

  async getDonationReceipt(donationId: string) {
    const { data, error } = await supabase
      .from('donation_receipts')
      .select('file_url')
      .eq('donation_id', donationId)
      .single();

    if (error) throw error;
    return data?.file_url;
  }
};