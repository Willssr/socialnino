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
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-lg">
          <QuizFotos currentUser={currentUser} />
          <button
            onClick={() => setActiveGame('menu')}
            className="mt-4 w-full text-center text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            &larr; Voltar ao menu Play
          </button>
        </div>
      );
    }
    
    if (activeGame === "desafio-dia") {
        return (
            <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-lg">
                <DesafioDoDia onParticipar={handleParticipate} />
                <button 
                    onClick={() => setActiveGame("menu")} 
                    className="mt-4 w-full text-center text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                    &larr; Voltar ao menu Play
                </button>
            </div>
        );
    }
  
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
            <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                SocialNino Play 🎮
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
                Desafios, quizzes e jogos com suas fotos e amigos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left column for games */}
                <div className="space-y-4">
                    <button onClick={() => setActiveGame("desafio-dia")} className="w-full p-6 bg-white dark:bg-slate-800 rounded-lg text-left hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md border dark:border-slate-700">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">🌟 Desafio do Dia</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Um novo desafio fotográfico todos os dias.</p>
                    </button>
                    <button onClick={() => setActiveGame('quiz-fotos')} className="w-full p-6 bg-white dark:bg-slate-800 rounded-lg text-left hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md border dark:border-slate-700">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">🤔 Quiz de Fotos</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Adivinhe de quem é a foto e entre no ranking!</p>
                    </button>
                    <button disabled className="w-full p-6 bg-white dark:bg-slate-800 rounded-lg text-left opacity-50 cursor-not-allowed shadow-md border dark:border-slate-700">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">⚔️ Batalha de Fotos</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Em breve...</p>
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