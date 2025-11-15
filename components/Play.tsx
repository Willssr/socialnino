import React, { useState, useEffect } from 'react';
import DesafioDoDia from './DesafioDoDia';
import QuizFotos from './QuizFotos';
import Ranking from './Ranking';
import { loadRanking, RankingEntry } from '../services/rankingService';

interface DesafioData {
    desafio: { title: string; description: string; hashtag: string; };
    legenda: string;
}

interface PlayProps {
    onParticipateInChallenge: (data: { legenda: string }) => void;
    currentUser: string;
}

const Play: React.FC<PlayProps> = ({ onParticipateInChallenge, currentUser }) => {
    const [activeGame, setActiveGame] = useState("menu");
    const [ranking, setRanking] = useState<RankingEntry[]>([]);

    useEffect(() => {
        if (activeGame === 'menu') {
            const fetchRanking = async () => {
                const data = await loadRanking();
                setRanking(data);
            };
            fetchRanking();
        }
    }, [activeGame]);

    const handleParticipate = (data: DesafioData) => {
        onParticipateInChallenge({ legenda: data.legenda });
    }
  
    if (activeGame === 'quiz-fotos') {
      return (
        <div className="container mx-auto p-4 max-w-lg">
          <QuizFotos currentUser={currentUser} />
          <button
            onClick={() => setActiveGame('menu')}
            className="mt-4 w-full text-center text-secondary font-semibold hover:text-white transition-colors"
          >
            &larr; Voltar ao Menu Play
          </button>
        </div>
      );
    }
    
    if (activeGame === "desafio-dia") {
        return (
            <div className="container mx-auto p-4 max-w-lg">
                <DesafioDoDia onParticipar={handleParticipate} />
                <button 
                    onClick={() => setActiveGame("menu")} 
                    className="mt-4 w-full text-center text-secondary font-semibold hover:text-white transition-colors"
                >
                    &larr; Voltar ao Menu Play
                </button>
            </div>
        );
    }
  
    return (
        <div className="container mx-auto p-4 max-w-4xl text-textLight">
            <h1 className="text-3xl font-orbitron font-bold text-gradient-neon mb-6">
                SocialNino Play 🎮
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                    <button onClick={() => setActiveGame("desafio-dia")} className="rgb-border rounded-xl w-full p-6 text-left transition-transform duration-300 hover:-translate-y-1 hover:shadow-glow-primary/50">
                        <h3 className="font-orbitron font-bold text-xl text-primary">🌟 Desafio do Dia</h3>
                        <p className="text-sm text-textDark mt-1">Um novo desafio fotográfico todos os dias.</p>
                    </button>
                    <button onClick={() => setActiveGame('quiz-fotos')} className="rgb-border rounded-xl w-full p-6 text-left transition-transform duration-300 hover:-translate-y-1 hover:shadow-glow-primary/50">
                        <h3 className="font-orbitron font-bold text-xl text-secondary">🤔 Quiz de Fotos</h3>
                        <p className="text-sm text-textDark mt-1">Adivinhe de quem é a foto e entre no ranking!</p>
                    </button>
                    <div className="rgb-border rounded-xl w-full p-6 text-left opacity-50 cursor-not-allowed">
                        <h3 className="font-orbitron font-bold text-xl text-accent">⚔️ Batalha de Fotos</h3>
                        <p className="text-sm text-textDark mt-1">Em breve...</p>
                    </div>
                </div>
                
                <div>
                    <Ranking ranking={ranking} currentUser={currentUser} />
                </div>
            </div>
        </div>
    );
}

export default Play;