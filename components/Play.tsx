import React, { useState, useEffect } from 'react';
import DesafioDoDia from './DesafioDoDia';
import QuizFotos from './QuizFotos';
import Ranking from './Ranking';
import { loadRanking, RankingEntry } from '../services/rankingService';

// Define the shape of the data passed from DesafioDoDia
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
        // Load ranking when the menu is shown
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
            className="mt-4 w-full text-center text-blue-500 font-semibold"
          >
            &larr; Voltar ao menu Play
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
                    className="mt-4 w-full text-center text-blue-500 font-semibold"
                >
                    &larr; Voltar ao menu Play
                </button>
            </div>
        );
    }
  
    return (
        <div className="container mx-auto p-4 max-w-4xl text-black dark:text-white">
            <h1 className="text-2xl font-bold mb-4">
                SocialNino Play 🎮
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left column for games */}
                <div className="space-y-4">
                    <button onClick={() => setActiveGame("desafio-dia")} className="w-full p-6 bg-gray-100 dark:bg-gray-900 rounded-lg text-left transition-transform hover:scale-105">
                        <h3 className="font-bold text-lg">🌟 Desafio do Dia</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Um novo desafio fotográfico todos os dias.</p>
                    </button>
                    <button onClick={() => setActiveGame('quiz-fotos')} className="w-full p-6 bg-gray-100 dark:bg-gray-900 rounded-lg text-left transition-transform hover:scale-105">
                        <h3 className="font-bold text-lg">🤔 Quiz de Fotos</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Adivinhe de quem é a foto e entre no ranking!</p>
                    </button>
                    <button disabled className="w-full p-6 bg-gray-100 dark:bg-gray-900 rounded-lg text-left opacity-50 cursor-not-allowed">
                        <h3 className="font-bold text-lg">⚔️ Batalha de Fotos</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Em breve...</p>
                    </button>
                </div>
                
                {/* Right column for Ranking */}
                <div>
                    <Ranking ranking={ranking} currentUser={currentUser} />
                </div>
            </div>
        </div>
    );
}

export default Play;