import { DirectMessage } from '../types';

const STORAGE_KEY = 'socialnino_dms_store_v1';

// Mock inicial caso não haja nada no storage
const INITIAL_MOCK_DMS: DirectMessage[] = [
  { 
    id: 'dm-init-1', 
    sender: 'nina_dev', 
    receiver: 'Você', 
    content: 'Olá! Bem-vindo ao SocialNino 🚀', 
    type: 'text', 
    timestamp: new Date(Date.now() - 10000000).toISOString(), 
    read: false 
  },
  { 
    id: 'dm-init-2', 
    sender: 'Você', 
    receiver: 'nina_dev', 
    content: 'Obrigado! O design ficou incrível.', 
    type: 'text', 
    timestamp: new Date(Date.now() - 9000000).toISOString(), 
    read: true 
  }
];

export const DMService = {
  /**
   * Carrega todas as mensagens do "banco de dados" (LocalStorage)
   */
  getAllMessages: (): DirectMessage[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Salva o mock inicial se estiver vazio
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_DMS));
        return INITIAL_MOCK_DMS;
      }
      return JSON.parse(stored);
    } catch (error) {
      console.error("Erro ao carregar DMs:", error);
      return [];
    }
  },

  /**
   * Envia uma nova mensagem e a salva no storage.
   * Retorna a mensagem criada para atualização otimista da UI.
   */
  sendMessage: (sender: string, receiver: string, content: string, type: 'text' | 'sticker'): DirectMessage => {
    const messages = DMService.getAllMessages();
    
    const newMessage: DirectMessage = {
      id: `dm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sender,
      receiver,
      content,
      type,
      timestamp: new Date().toISOString(),
      read: false
    };

    const updatedMessages = [...messages, newMessage];
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
    }

    return newMessage;
  },

  /**
   * Marca mensagens de uma conversa como lidas
   */
  markAsRead: (currentUser: string, otherUser: string): DirectMessage[] => {
    const messages = DMService.getAllMessages();
    let hasChanges = false;

    const updatedMessages = messages.map(msg => {
      // Se a mensagem foi enviada PELO outro usuário PARA mim, e não foi lida
      if (msg.sender === otherUser && msg.receiver === currentUser && !msg.read) {
        hasChanges = true;
        return { ...msg, read: true };
      }
      return msg;
    });

    if (hasChanges && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
    }

    return updatedMessages;
  },

  /**
   * Retorna apenas as mensagens entre dois usuários específicos
   */
  getConversation: (userA: string, userB: string): DirectMessage[] => {
    const allMessages = DMService.getAllMessages();
    return allMessages.filter(msg => 
      (msg.sender === userA && msg.receiver === userB) ||
      (msg.sender === userB && msg.receiver === userA)
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }
};
