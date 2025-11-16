import React, { createContext, useContext, useState, useCallback, PropsWithChildren } from 'react';
import { ToastNotificationData } from '../types';
import ToastContainer from '../components/ToastContainer';

interface ToastContextType {
  addToast: (toast: Omit<ToastNotificationData, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastNotificationData[]>([]);

  const addToast = useCallback((toast: Omit<ToastNotificationData, 'id'>) => {
    const id = Date.now().toString() + Math.random();
    const newToast = { ...toast, id };
    setToasts(prev => [newToast, ...prev]);
  }, []);
  
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
