import React from 'react';
import { useAuth } from '../AuthContext';
import { LogoutIcon } from './Icons';

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="p-2 rounded-full hover:bg-white/20 transition-colors" aria-label="Sair do app">
      <LogoutIcon className="h-6 w-6" />
    </button>
  );
}
