import React from 'react';
import { RankingEntry } from '../services/rankingService';

interface RankingProps {
    ranking: RankingEntry[];
    currentUser: string;
    title?: string;
    subtitle?: string;
}

const Ranking: React.FC<RankingProps> = ({ ranking, currentUser, title = "Ranking da Semana 🏆", subtitle }) => {
    
    const getWeekLabel = () => {
        const now = new Date();
        const onejan = new Date(now.getFullYear(), 0, 1);
        const dayOfYear = Math.floor((now.getTime() - onejan.getTime()) / (24 * 60 * 60 * 1000)) + 1;
        const week = Math.ceil(dayOfYear / 7);
        return `Semana ${week} de ${now.getFullYear()}`;
    }

    const getPositionClass = (index: number) => {
        if (index === 0) return 'text-yellow-400';
        if (index === 1) return 'text-slate-300';
        if (index === 2) return 'text-amber-600';
        return 'text-textDark';
    }

    return (
        <div className="rgb-border rounded-xl p-5">
            <h2 className="text-xl font-orbitron font-bold text-gradient-neon text-center">{title}</h2>
            <p className="text-xs text-textDark text-center mb-4">{subtitle || getWeekLabel()}</p>
            {ranking.length > 0 ? (
                <ol className="space-y-2">
                    {ranking.map((user, index) => (
                        <li key={user.username} className={`flex items-center justify-between p-2 rounded-md ${user.username === currentUser ? 'bg-primary/30' : ''}`}>
                            <div className="flex items-center space-x-3">
                                <span className={`w-6 text-center font-bold text-lg ${getPositionClass(index)}`}>
                                    {index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`}
                                </span>
                                <span className="font-semibold text-sm">@{user.username}</span>
                            </div>
                            <span className="font-bold text-sm text-secondary">{user.score} pts</span>
                        </li>
                    ))}
                </ol>
            ) : (
                <p className="text-center text-sm text-textDark py-8">
                    Ainda não há pontuações. Jogue uma partida para aparecer aqui!
                </p>
            )}
        </div>
    );
}

export default Ranking;