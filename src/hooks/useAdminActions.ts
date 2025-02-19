import { useState } from 'react';
import { adminService } from '../services/admin';

export const useAdminActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async (action: () => Promise<any>) => {
    setLoading(true);
    setError(null);
    try {
      await action();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const approveRegistration = (userId: string) => 
    handleAction(() => adminService.approveRegistration(userId));

  const rejectRegistration = (userId: string) => 
    handleAction(() => adminService.rejectRegistration(userId));

  const createEvent = (eventData: any) => 
    handleAction(() => adminService.createEvent(eventData));

  const updateEvent = (eventId: string, eventData: any) => 
    handleAction(() => adminService.updateEvent(eventId, eventData));

  const deleteEvent = (eventId: string) => 
    handleAction(() => adminService.deleteEvent(eventId));

  const createPage = (pageData: any) => 
    handleAction(() => adminService.createPage(pageData));

  const updatePage = (pageId: string, pageData: any) => 
    handleAction(() => adminService.updatePage(pageId, pageData));

  const deletePage = (pageId: string) => 
    handleAction(() => adminService.deletePage(pageId));

  return {
    loading,
    error,
    approveRegistration,
    rejectRegistration,
    createEvent,
    updateEvent,
    deleteEvent,
    createPage,
    updatePage,
    deletePage
  };
};