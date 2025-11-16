import React from 'react';
import { ToastNotificationData } from '../types';
import Toast from './Toast';

interface ToastContainerProps {
  toasts: ToastNotificationData[];
  removeToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-20 right-0 md:right-4 z-[200] space-y-3 w-full md:w-auto px-4 md:px-0">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onDismiss={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
