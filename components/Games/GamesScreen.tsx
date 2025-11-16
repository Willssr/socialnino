import React, { useState, useEffect, useRef } from 'react';
import { GameControllerIcon, CubeIcon, BoltIcon } from '../Icons';
import AstroPuzzleGame from "./AstroPuzzleGame";
import { RankedUser } from '../../types';
import { db } from '../../services/firebase';
import { ref as dbRef, query, onValue, orderByChild, off } from 'firebase/database';

// === TAP NINJA MINI-GAME ===
const TapNinjaGame = ({ onFinish }: { onFinish: (score: number) => void }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isRunning, setIsRunning] = useState(true);
  const [ninjaPosition, setNinjaPosition] = useState({ top: 50, left: 50 });
  const intervalRef = useRef<number | null>(null);

  const resetGame = () => {
    setScore(0);
    setTimeLeft(10);
    setIsRunning(true);
    setNinjaPosition({ top: 50, left: 50 });
  };
  
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if(intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if(intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleNinjaClick = () => {
    if (!isRunning) return;
    setScore(prev => prev + 1);
    setNinjaPosition({
      top: Math.random() * 75 + 5, // 5 to 80
      left: Math.random() * 75 + 5,
    });
  };

  const getEndMessage = () => {
    if (score === 0) return "Você ainda está frio, tente de novo!";
    if (score <= 10) return "Bom! Continue treinando.";
    return "Ninja neon! Reflexos insanos.";
  };

  return (
    <div className="bg-[#0A0A0D] border-2 border-primary rounded-xl p-6 w-full max-w-sm flex flex-col items-center text-white animate-fade-in">
        <h2 className="text-2xl font-orbitron font-bold text-gradient-neon mb-4">Tap Ninja</h2>
        <div className="flex justify-between w-full text-lg mb-4">
            <span>Tempo: <b className="text-secondary">{timeLeft}s</b></span>
            <span>Pontos: <b className="text-secondary">{score}</b></span>
        </div>

        <div className="relative w-full h-72 bg-black/50 rounded-lg border border-borderNeon overflow-hidden mb-4">
            {isRunning ? (
                <button
                    onClick={handleNinjaClick}
                    className="absolute w-10 h-10 rounded-full bg-[#00E5FF] shadow-[0_0_15px_#00E5FF] flex items-center justify-center text-black font-bold cursor-pointer transition-all duration-100"
                    style={{ top: `${ninjaPosition.top}%`, left: `${ninjaPosition.left}%` }}
                >
                    🎯
                </button>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                    <p className="font-semibold text-lg">{getEndMessage()}</p>
                </div>
            )}
        </div>
        
        {!isRunning && (
            <div className="flex gap-4 w-full mt-4">
                <button onClick={resetGame} className="flex-1 py-2 rounded-lg font-bold bg-cardDark border border-borderNeon text-textLight hover:bg-primary/30 hover:border-primary transition-colors">
                    Jogar de novo
                </button>
                <button onClick={() => onFinish(score)} className="flex-1 py-2 rounded-lg font-bold bg-primary text-white shadow-glow-primary hover:animate-neon-pulse">
                    Fechar
                </button>
            </div>
        )}
    </div>
  );
};


// === MAIN GAMES SCREEN COMPONENT ===
const games = [
    {
        id: 'tap-ninja',
        name: 'Tap Ninja',
        description: 'Teste seus reflexos neon.',
        Icon: GameControllerIcon,
    },
    {
        id: 'astro-puzzle',
        name: 'Astro Puzzle',
        description: 'Resolva quebra-cabeças cósmicos de memória.',
        Icon: CubeIcon,
    },
    {
        id: 'neon-grid',
        name: 'Neon Grid',
        description: 'Conecte os pontos em uma grade pulsante.',
        Icon: BoltIcon,
    }
];

const GamePlaceholderModal = ({ onClose }: { onClose: () => void }) => (
    <div className="bg-cardDark border border-borderNeon rounded-lg shadow-lg w-full max-w-sm text-center p-8 animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-orbitron text-2xl font-bold text-gradient-neon mb-4">Em Breve!</h3>
        <p className="text-textDark mb-6">Este jogo ainda está em desenvolvimento. Volte em breve!</p>
        <button 
            onClick={onClose}
            className="px-6 py-2 bg-primary border border-transparent rounded-md text-sm font-semibold text-white shadow-glow-primary hover:animate-neon-pulse"
        >
            Fechar
        </button>
    </div>
);

interface GamesScreenProps {
    handleGamePoints: (points: number) => Promise<void>;
}

const GamesScreen: React.FC<GamesScreenProps> = ({ handleGamePoints }) => {
    const [activeGame, setActiveGame] = useState<string | null>(null);
    const [ranking, setRanking] = useState<RankedUser[]>([]);

    useEffect(() => {
      const rankQuery = query(dbRef(db, "users"), orderByChild("points/total"));
      
      const callback = (snapshot: any) => {
        const data = snapshot.val();
        if (!data) {
          setRanking([]);
          return;
        }
        const users: RankedUser[] = Object.values(data);
        const sorted = users.sort((a, b) => (b.points?.total || 0) - (a.points?.total || 0));
        setRanking(sorted.slice(0, 10)); // Mostrar top 10
      };

      onValue(rankQuery, callback);

      return () => off(rankQuery, 'value', callback);
    }, []);

    const handleFinishGame = (points: number) => {
      handleGamePoints(points);
      setActiveGame(null);
    };

    return (
        <>
            <div className="min-h-screen w-full bg-gradient-to-br from-[#090012] via-[#140033] to-[#000014] p-4 sm:p-6 lg:p-8">
                <h1 className="text-4xl font-orbitron font-bold text-secondary text-center mb-10" style={{ textShadow: '0 0 8px #00E5FF, 0 0 12px #00E5FF' }}>
                    GAMES
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {games.map((game) => (
                        <div key={game.name} className="bg-cardDark border border-primary/70 rounded-xl shadow-lg shadow-primary/20 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-primary/40 hover:-translate-y-1">
                            <div className="p-4 bg-primary/20 rounded-full mb-4 shadow-inner shadow-primary/30">
                                <game.Icon className="w-16 h-16 text-primary drop-shadow-[0_0_8px_#7B2FF7]" />
                            </div>
                            <h2 className="text-xl font-orbitron font-bold text-textLight mb-2">{game.name}</h2>
                            <p className="text-sm text-textDark flex-grow mb-6">{game.description}</p>
                            <button 
                                onClick={() => setActiveGame(game.id)}
                                className="w-full py-2 rounded-lg font-bold bg-primary text-white shadow-glow-primary hover:animate-neon-pulse transition-all duration-300"
                            >
                                Jogar
                            </button>
                        </div>
                    ))}
                </div>

                {/* Ranking Section */}
                <div className="max-w-5xl mx-auto">
                    <div className="mt-6 p-4 border border-[#00E5FF] rounded-xl shadow-[0_0_10px_#00E5FF55]">
                        <h2 className="text-[#00E5FF] font-orbitron font-bold text-lg mb-3 drop-shadow-[0_0_6px_#00E5FF]">
                            🏆 Ranking Neon
                        </h2>
                        {ranking.length > 0 ? (
                          ranking.map((user, index) => (
                            <div key={user.username} className="flex items-center gap-3 py-2 border-b border-[#00E5FF33] last:border-b-0">
                                <img src={user.avatar} className="w-8 h-8 rounded-full" />
                                <span className="text-white font-semibold">@{user.username} – {user.points?.total || 0} pts</span>
                                <span className="ml-auto text-xl">
                                    {index === 0 && "🥇"}
                                    {index === 1 && "🥈"}
                                    {index === 2 && "🥉"}
                                </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-textDark py-4">O ranking está sendo formado. Jogue para aparecer aqui!</p>
                        )}
                    </div>
                </div>
            </div>

            {activeGame && (
                <div 
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4"
                  onClick={() => setActiveGame(null)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        {activeGame === "tap-ninja" && <TapNinjaGame onFinish={handleFinishGame} />}
                        {activeGame === "astro-puzzle" && <AstroPuzzleGame onFinish={handleFinishGame} />}
                        {activeGame === "neon-grid" && <GamePlaceholderModal onClose={() => setActiveGame(null)} />}
                    </div>
                </div>
            )}
        </>
    );
};

export default GamesScreen;