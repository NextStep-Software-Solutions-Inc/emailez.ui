import { useState } from 'react';
import type { Notification } from '@/types/common.types';

export function useNotifications() {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (type: Notification['type'], message: string) => {
    const id = Math.random().toString(36).substring(7);
    setNotification({ type, message, id });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return {
    notification,
    showNotification,
    hideNotification
  };
}
