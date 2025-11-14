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

    return (
        <div className="ranking-card">
            <h2 className="ranking-title">{title}</h2>
            <p className="ranking-sub">{subtitle || getWeekLabel()}</p>
            {ranking.length > 0 ? (
                <ol className="ranking-list">
                    {ranking.map((user, index) => (
                        <li key={user.username} className={`ranking-item ${user.username === currentUser ? 'ranking-item-current' : ''}`}>
                            <span className="ranking-pos">
                                {index === 0 && '🥇'}
                                {index === 1 && '🥈'}
                                {index === 2 && '🥉'}
                                {index > 2 && `#${index + 1}`}
                            </span>
                            <span className="ranking-name">@{user.username}</span>
                            <span className="ranking-score">{user.score} pts</span>
                        </li>
                    ))}
                </ol>
            ) : (
                <p className="ranking-empty">Ainda não há pontuações. Jogue uma partida para aparecer aqui!</p>
            )}
        </div>
    );
}

export default Ranking;