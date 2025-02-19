import { supabase } from '../lib/supabase';

export const collaborateurService = {
  async getProjects(userId: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('collaborator_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateProjectProgress(projectId: string, progress: number) {
    const { error } = await supabase
      .from('projects')
      .update({ progress })
      .eq('id', projectId);

    if (error) throw error;
  },

  async uploadMedia(file: File, userId: string, type: 'video' | 'audio' | 'image') {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `media/${type}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    const { data, error } = await supabase
      .from('media')
      .insert([{
        name: file.name,
        url: publicUrl,
        type,
        size: file.size,
        uploaded_by: userId
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getMedia(userId: string, type?: 'video' | 'audio' | 'image') {
    let query = supabase
      .from('media')
      .select('*')
      .eq('uploaded_by', userId);

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async deleteMedia(mediaId: string, userId: string) {
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', mediaId)
      .eq('uploaded_by', userId);

    if (error) throw error;
  },

  async getEvents(userId: string) {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        registrations:event_registrations(*)
      `)
      .order('date', { ascending: true });

    if (error) throw error;
    return data;
  },

  async registerForEvent(eventId: string, userId: string) {
    const { error } = await supabase
      .from('event_registrations')
      .insert([{
        event_id: eventId,
        user_id: userId,
        status: 'confirmed'
      }]);

    if (error) throw error;
  },

  async cancelEventRegistration(eventId: string, userId: string) {
    const { error } = await supabase
      .from('event_registrations')
      .delete()
      .eq('event_id', eventId)
      .eq('user_id', userId);

    if (error) throw error;
  }
};