import { supabase } from '../lib/supabase';

// Mock data pour le développement
const mockEvents = [
  {
    id: '1',
    title: 'Festival de Courts Métrages',
    description: 'Projection des meilleurs courts métrages de l\'année',
    date: '2024-03-15',
    time: '19:00',
    location: 'Salle Principale',
    maxParticipants: 100,
    registrations_count: 45,
    image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
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
    image_url: 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=800&q=80'
  }
];

export const eventService = {
  async getEvents() {
    try {
      // Pour le développement, utiliser les données mockées
      return mockEvents;

      // Code pour production avec Supabase
      /*
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          registrations:event_registrations(count)
        `)
        .order('date', { ascending: true });

      if (error) throw error;
      return data;
      */
    } catch (error) {
      console.error('Error getting events:', error);
      throw new Error('Erreur lors de la récupération des événements');
    }
  },

  async createEvent(eventData: {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    maxParticipants: number;
    image_url?: string;
  }) {
    try {
      // Pour le développement, ajouter à la liste mockée
      const newEvent = {
        id: (mockEvents.length + 1).toString(),
        ...eventData,
        registrations_count: 0
      };
      mockEvents.push(newEvent);
      return newEvent;

      // Code pour production avec Supabase
      /*
      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select()
        .single();

      if (error) throw error;
      return data;
      */
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error('Erreur lors de la création de l\'événement');
    }
  },

  async updateEvent(id: string, eventData: Partial<{
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    maxParticipants: number;
    image_url?: string;
  }>) {
    try {
      // Pour le développement, mettre à jour dans la liste mockée
      const eventIndex = mockEvents.findIndex(e => e.id === id);
      if (eventIndex === -1) throw new Error('Événement non trouvé');
      
      mockEvents[eventIndex] = {
        ...mockEvents[eventIndex],
        ...eventData
      };
      return mockEvents[eventIndex];

      // Code pour production avec Supabase
      /*
      const { data, error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
      */
    } catch (error) {
      console.error('Error updating event:', error);
      throw new Error('Erreur lors de la mise à jour de l\'événement');
    }
  },

  async deleteEvent(id: string) {
    try {
      // Pour le développement, supprimer de la liste mockée
      const eventIndex = mockEvents.findIndex(e => e.id === id);
      if (eventIndex === -1) throw new Error('Événement non trouvé');
      mockEvents.splice(eventIndex, 1);

      // Code pour production avec Supabase
      /*
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      */
    } catch (error) {
      console.error('Error deleting event:', error);
      throw new Error('Erreur lors de la suppression de l\'événement');
    }
  },

  async getEvent(id: string) {
    try {
      // Pour le développement, rechercher dans la liste mockée
      const event = mockEvents.find(e => e.id === id);
      if (!event) throw new Error('Événement non trouvé');
      return event;

      // Code pour production avec Supabase
      /*
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          registrations:event_registrations(count)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
      */
    } catch (error) {
      console.error('Error getting event:', error);
      throw new Error('Erreur lors de la récupération de l\'événement');
    }
  },

  async registerForEvent(eventId: string, userId: string) {
    try {
      // Pour le développement, simuler l'inscription
      const event = await this.getEvent(eventId);
      if (event.registrations_count >= event.maxParticipants) {
        throw new Error('L\'événement est complet');
      }

      event.registrations_count++;
      return { success: true, message: "Inscription réussie" };

      // Code pour production avec Supabase
      /*
      const { error } = await supabase
        .from('event_registrations')
        .insert([{
          event_id: eventId,
          user_id: userId,
          status: 'confirmed'
        }]);

      if (error) throw error;
      return { success: true, message: "Inscription réussie" };
      */
    } catch (error) {
      console.error('Error registering for event:', error);
      throw error;
    }
  },

  async cancelRegistration(eventId: string, userId: string) {
    try {
      // Pour le développement, simuler l'annulation
      const event = await this.getEvent(eventId);
      if (event.registrations_count > 0) {
        event.registrations_count--;
      }
      return { success: true, message: "Inscription annulée" };

      // Code pour production avec Supabase
      /*
      const { error } = await supabase
        .from('event_registrations')
        .delete()
        .eq('event_id', eventId)
        .eq('user_id', userId);

      if (error) throw error;
      return { success: true, message: "Inscription annulée" };
      */
    } catch (error) {
      console.error('Error canceling registration:', error);
      throw new Error('Erreur lors de l\'annulation de l\'inscription');
    }
  }
};