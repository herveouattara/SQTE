import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/admin';

export const useAdmin = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [pendingRegistrations, setPendingRegistrations] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    try {
      const [usersData, pendingData, eventsData, pagesData] = await Promise.all([
        adminService.getUsers(),
        adminService.getPendingRegistrations(),
        adminService.getEvents(),
        adminService.getPages()
      ]);

      setUsers(usersData);
      setPendingRegistrations(pendingData);
      setEvents(eventsData);
      setPages(pagesData);
    } catch (err) {
      setError('Erreur lors du chargement des données');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const approveRegistration = async (userId: string) => {
    try {
      await adminService.approveRegistration(userId);
      await loadData();
    } catch (err) {
      setError('Erreur lors de l\'approbation');
      console.error(err);
    }
  };

  const rejectRegistration = async (userId: string) => {
    try {
      await adminService.rejectRegistration(userId);
      await loadData();
    } catch (err) {
      setError('Erreur lors du rejet');
      console.error(err);
    }
  };

  const createEvent = async (eventData: any) => {
    try {
      await adminService.createEvent(eventData);
      await loadData();
    } catch (err) {
      setError('Erreur lors de la création de l\'événement');
      console.error(err);
    }
  };

  const updateEvent = async (eventId: string, eventData: any) => {
    try {
      await adminService.updateEvent(eventId, eventData);
      await loadData();
    } catch (err) {
      setError('Erreur lors de la mise à jour de l\'événement');
      console.error(err);
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      await adminService.deleteEvent(eventId);
      await loadData();
    } catch (err) {
      setError('Erreur lors de la suppression de l\'événement');
      console.error(err);
    }
  };

  const createPage = async (pageData: any) => {
    try {
      await adminService.createPage(pageData);
      await loadData();
    } catch (err) {
      setError('Erreur lors de la création de la page');
      console.error(err);
    }
  };

  const updatePage = async (pageId: string, pageData: any) => {
    try {
      await adminService.updatePage(pageId, pageData);
      await loadData();
    } catch (err) {
      setError('Erreur lors de la mise à jour de la page');
      console.error(err);
    }
  };

  const deletePage = async (pageId: string) => {
    try {
      await adminService.deletePage(pageId);
      await loadData();
    } catch (err) {
      setError('Erreur lors de la suppression de la page');
      console.error(err);
    }
  };

  return {
    users,
    pendingRegistrations,
    events,
    pages,
    loading,
    error,
    approveRegistration,
    rejectRegistration,
    createEvent,
    updateEvent,
    deleteEvent,
    createPage,
    updatePage,
    deletePage,
    loadData
  };
};