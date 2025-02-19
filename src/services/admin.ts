import { supabase } from '../lib/supabase';

// Pages par défaut du site
const defaultPages = [
  {
    id: '1',
    title: 'Accueil',
    slug: '/',
    content: '<h1>Bienvenue sur SQTE</h1>',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Pôle Audiovisuel',
    slug: '/pole-audiovisuel',
    content: '<h1>Pôle Audiovisuel</h1>',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Pôle Média',
    slug: '/pole-media',
    content: '<h1>Pôle Média</h1>',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Pôle Musique',
    slug: '/pole-musique',
    content: '<h1>Pôle Musique</h1>',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Actualités',
    slug: '/actualites',
    content: '<h1>Actualités</h1>',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Événements',
    slug: '/evenements',
    content: '<h1>Événements</h1>',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    title: 'Contact',
    slug: '/contact',
    content: '<h1>Contact</h1>',
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Événements par défaut
const defaultEvents = [
  {
    id: '1',
    title: 'Festival de Courts Métrages',
    description: 'Projection des meilleurs courts métrages de l\'année',
    date: '2024-03-15',
    time: '19:00',
    location: 'Salle Principale',
    maxParticipants: 100,
    registrations_count: 45,
    image_url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26'
  },
  {
    id: '2',
    title: 'Concert Live',
    description: 'Performance live des artistes du pôle musique',
    date: '2024-03-22',
    time: '20:30',
    location: 'Auditorium',
    maxParticipants: 150,
    registrations_count: 78,
    image_url: 'https://images.unsplash.com/photo-1501612780327-45045538702b'
  }
];

export const adminService = {
  // Gestion des pages
  async getPages() {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || defaultPages;
    } catch (error) {
      console.error('Error fetching pages:', error);
      return defaultPages;
    }
  },

  async createPage(pageData: any) {
    try {
      const { data, error } = await supabase
        .from('pages')
        .insert([pageData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating page:', error);
      throw error;
    }
  },

  async updatePage(pageId: string, pageData: any) {
    try {
      const { data, error } = await supabase
        .from('pages')
        .update(pageData)
        .eq('id', pageId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating page:', error);
      throw error;
    }
  },

  async deletePage(pageId: string) {
    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', pageId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting page:', error);
      throw error;
    }
  },

  // Gestion des événements
  async getEvents() {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      return data || defaultEvents;
    } catch (error) {
      console.error('Error fetching events:', error);
      return defaultEvents;
    }
  },

  async createEvent(eventData: any) {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  async updateEvent(eventId: string, eventData: any) {
    try {
      const { data, error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', eventId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  async deleteEvent(eventId: string) {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
};