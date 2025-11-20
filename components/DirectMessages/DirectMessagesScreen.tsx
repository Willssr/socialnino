
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { DirectMessage, UserProfile, Person } from '../../types';
import { SearchIcon, PaperAirplaneIcon, UserIcon } from '../Icons';
import ChatInputBar from '../Chat/ChatInputBar';

interface DirectMessagesScreenProps {
    messages: DirectMessage[];
    currentUser: UserProfile;
    people: Person[];
    initialSelectedUser: Person | null;
    onSendMessage: (receiverUsername: string, content: string, type: 'text' | 'sticker') => void;
    onBack: () => void;
}

const DirectMessagesScreen: React.FC<DirectMessagesScreenProps> = ({ 
    messages, 
    currentUser, 
    people, 
    initialSelectedUser, 
    onSendMessage,
    onBack
}) => {
    const [selectedUser, setSelectedUser] = useState<Person | null>(initialSelectedUser);
    const [searchQuery, setSearchQuery] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Sync selectedUser if initialSelectedUser changes (e.g. coming from profile)
    useEffect(() => {
        if (initialSelectedUser) {
            setSelectedUser(initialSelectedUser);
        }
    }, [initialSelectedUser]);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (selectedUser && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, selectedUser]);

    // 1. Agrupar mensagens por conversa
    // Lógica crítica: Determinar quem é o "outro usuário" na conversa
    const conversations = useMemo(() => {
        const convMap = new Map<string, DirectMessage>();
        
        messages.forEach(msg => {
            let otherUser = "";
            if (msg.sender === currentUser.name) {
                otherUser = msg.receiver;
            } else if (msg.receiver === currentUser.name) {
                otherUser = msg.sender;
            } else {
                // Mensagem não envolve o usuário atual (não deve acontecer aqui se filtrado corretamente, mas por segurança)
                return;
            }

            // Se ainda não tem ou essa msg é mais recente, atualiza
            if (!convMap.has(otherUser) || new Date(msg.timestamp) > new Date(convMap.get(otherUser)!.timestamp)) {
                convMap.set(otherUser, msg);
            }
        });

        // Ordenar por data (mais recente primeiro)
        return Array.from(convMap.entries()).sort((a, b) => 
            new Date(b[1].timestamp).getTime() - new Date(a[1].timestamp).getTime()
        );
    }, [messages, currentUser.name]);

    // Filtrar usuários para lista de conversas (busca)
    const filteredConversations = useMemo(() => {
        if (!searchQuery) return conversations;
        return conversations.filter(([username]) => username.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [conversations, searchQuery]);

    // Helper para dados de usuário (avatar, etc)
    const getUserData = (username: string): { avatar: string, bio: string } => {
        const person = people.find(p => p.username === username);
        if (person) return { avatar: person.avatar, bio: person.bio };
        
        // Fallback mock se não estiver na lista de 'people'
        return { 
            avatar: `https://ui-avatars.com/api/?name=${username}&background=7B2FF7&color=fff`, 
            bio: 'Usuário SocialNino' 
        };
    };

    const handleSendMessageLocal = (content: string, type: 'text' | 'sticker') => {
        if (selectedUser) {
            onSendMessage(selectedUser.username, content, type);
        }
    };

    // --- RENDER: CHAT ATIVO ---
    if (selectedUser) {
        // Filtra mensagens APENAS entre Eu e o Usuário Selecionado
        // Isso garante que a conversa seja "privada" entre os dois
        const chatMessages = messages.filter(
            m => (m.sender === currentUser.name && m.receiver === selectedUser.username) ||
                 (m.sender === selectedUser.username && m.receiver === currentUser.name)
        ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

        return (
            <div className="flex flex-col h-full bg-transparent animate-fade-in">
                {/* Chat Header */}
                <div className="p-3 border-b border-borderNeon/50 bg-backgroundDark/95 backdrop-blur-md flex items-center space-x-3 sticky top-0 z-10 shadow-lg">
                    <button 
                        onClick={() => { setSelectedUser(null); onBack(); }} 
                        className="text-secondary hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Voltar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <img src={selectedUser.avatar} alt={selectedUser.username} className="w-10 h-10 rounded-full border border-secondary shadow-[0_0_10px_rgba(0,229,255,0.3)]" />
                    <div className="flex-grow">
                        <h3 className="font-bold text-lg text-white">{selectedUser.username}</h3>
                        <p className="text-xs text-textDark truncate">{selectedUser.bio.substring(0, 30)}...</p>
                    </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {chatMessages.length === 0 ? (
                         <div className="text-center py-10 text-textDark">
                            <p>Envie uma mensagem para iniciar a conversa com <span className="text-secondary">@{selectedUser.username}</span></p>
                        </div>
                    ) : (
                        chatMessages.map(msg => {
                            const isMe = msg.sender === currentUser.name;
                            return (
                                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                                        isMe 
                                        ? 'bg-primary/20 border border-primary/50 text-white rounded-br-none shadow-glow-primary/30' 
                                        : 'bg-cardDark border border-borderNeon text-textLight rounded-bl-none'
                                    }`}>
                                        {msg.type === 'sticker' ? (
                                             <img src={msg.content} alt="sticker" className="w-24 h-24 object-contain" />
                                        ) : (
                                            <p>{msg.content}</p>
                                        )}
                                        <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-white/60' : 'text-textDark'}`}>
                                            {new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="sticky bottom-0">
                     <ChatInputBar onSendMessage={handleSendMessageLocal} />
                </div>
            </div>
        );
    }

    // --- RENDER: LISTA DE CONVERSAS ---
    return (
        <div className="container mx-auto p-4 max-w-4xl h-full min-h-screen flex flex-col animate-fade-in pb-20">
             <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-orbitron font-bold text-gradient-neon">Mensagens</h1>
                <div className="w-8"></div> {/* Spacer */}
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-textDark" />
                <input 
                    type="text" 
                    placeholder="Buscar conversas..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-cardDark border border-borderNeon rounded-xl py-2.5 pl-10 pr-4 text-textLight focus:outline-none focus:border-primary focus:shadow-glow-primary transition-all"
                />
            </div>

            {/* Conversations List */}
            <div className="flex-1 space-y-2">
                {filteredConversations.length === 0 && !searchQuery ? (
                    <div className="text-center py-12 opacity-70">
                        <PaperAirplaneIcon className="w-16 h-16 mx-auto text-textDark mb-4" />
                        <p className="text-textDark text-lg">Suas mensagens aparecerão aqui.</p>
                        <p className="text-sm text-textDark mt-2">Visite perfis para enviar mensagens diretas.</p>
                    </div>
                ) : (
                    filteredConversations.map(([username, lastMsg]) => {
                        const userData = getUserData(username);
                        const isUnread = !lastMsg.read && lastMsg.receiver === currentUser.name;
                        
                        return (
                            <button 
                                key={username}
                                onClick={() => {
                                    // Encontrar objeto Person completo ou criar mock mínimo
                                    const person = people.find(p => p.username === username) || {
                                        id: 0, 
                                        username: username, 
                                        avatar: userData.avatar, 
                                        bio: userData.bio,
                                        followers: 0,
                                        isFollowing: false
                                    };
                                    setSelectedUser(person);
                                }}
                                className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 hover:bg-primary/10 border border-transparent hover:border-primary/30 ${isUnread ? 'bg-cardDark border-l-4 border-l-secondary' : ''}`}
                            >
                                <div className="relative">
                                    <img src={userData.avatar} alt={username} className="w-14 h-14 rounded-full object-cover border border-borderNeon" />
                                    {isUnread && <div className="absolute top-0 right-0 w-3 h-3 bg-secondary rounded-full shadow-[0_0_8px_#00E5FF]"></div>}
                                </div>
                                
                                <div className="ml-4 flex-1 text-left overflow-hidden">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className={`font-bold text-base truncate ${isUnread ? 'text-white' : 'text-textLight'}`}>
                                            {username}
                                        </h3>
                                        <span className="text-xs text-textDark flex-shrink-0">
                                            {new Date(lastMsg.timestamp).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'})}
                                        </span>
                                    </div>
                                    <p className={`text-sm truncate ${isUnread ? 'text-secondary font-medium' : 'text-textDark'}`}>
                                        {lastMsg.sender === currentUser.name && <span className="mr-1">Você:</span>}
                                        {lastMsg.type === 'sticker' ? 'Enviou uma figurinha' : lastMsg.content}
                                    </p>
                                </div>
                            </button>
                        )
                    })
                )}
            </div>
        </div>
    );
};

export default DirectMessagesScreen;
