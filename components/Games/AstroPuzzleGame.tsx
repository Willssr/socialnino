import React, { useState, useEffect } from 'react';

interface AstroPuzzleGameProps {
  onClose: () => void;
}

const GRID_SIZE = 9;
const SEQUENCE_DELAY = 600; // ms between each light-up
const LIT_DURATION = 300; // ms for how long a cell stays lit

const AstroPuzzleGame: React.FC<AstroPuzzleGameProps> = ({ onClose }) => {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [gameState, setGameState] = useState<'idle' | 'showing' | 'playing' | 'game-over'>('idle');
  const [litCell, setLitCell] = useState<number | null>(null);

  const generateNextInSequence = (currentSequence: number[]) => {
    const newStep = Math.floor(Math.random() * GRID_SIZE);
    return [...currentSequence, newStep];
  };

  const startGame = () => {
    setLevel(1);
    const initialSequence = generateNextInSequence([]);
    setSequence(initialSequence);
    setPlayerSequence([]);
    setGameState('showing');
  };

  const nextLevel = () => {
    setLevel(prev => prev + 1);
    const newSequence = generateNextInSequence(sequence);
    setSequence(newSequence);
    setPlayerSequence([]);
    setGameState('showing');
  };
  
  // Effect to start the game on mount
  useEffect(() => {
    startGame();
  }, []);

  // Effect to show the sequence to the player
  useEffect(() => {
    if (gameState === 'showing') {
      let i = 0;
      const interval = setInterval(() => {
        setLitCell(sequence[i]);
        setTimeout(() => setLitCell(null), LIT_DURATION);
        i++;
        if (i >= sequence.length) {
          clearInterval(interval);
          setGameState('playing');
        }
      }, SEQUENCE_DELAY);

      return () => clearInterval(interval);
    }
  }, [gameState, sequence]);

  // Effect to check player's input
  useEffect(() => {
    if (gameState === 'playing' && playerSequence.length > 0) {
      const currentStep = playerSequence.length - 1;

      // Check for mistake
      if (playerSequence[currentStep] !== sequence[currentStep]) {
        setGameState('game-over');
        return;
      }
      
      // Check for level completion
      if (playerSequence.length === sequence.length) {
        setTimeout(() => {
            nextLevel();
        }, 800);
      }
    }
  }, [playerSequence, sequence, gameState]);

  const handleCellClick = (index: number) => {
    if (gameState !== 'playing') return;
    setPlayerSequence(prev => [...prev, index]);
  };
  
  const getGameOverMessage = () => {
      if (level < 3) return "Sequência incorreta. Tente de novo!";
      if (level < 7) return "Quase lá! Mantenha o foco!";
      return "Você é um mestre da memória neon!";
  };

  return (
    <div className="bg-[#050012] border-2 border-[#4c1d95] shadow-[0_0_20px_#4c1d95] rounded-xl p-6 w-full max-w-sm flex flex-col items-center text-white animate-fade-in">
      <h2 className="text-2xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#00E5FF] mb-2">
        Astro Puzzle
      </h2>

      <div className="flex justify-between w-full text-sm mb-4 px-2">
        <p>Nível: <span className="font-bold text-secondary">{level}</span></p>
        <p>Sequência: <span className="font-bold text-secondary">{sequence.length}</span></p>
      </div>

      {gameState === 'game-over' ? (
        <div className="h-72 flex flex-col items-center justify-center text-center">
            <p className="text-lg font-semibold text-accent mb-4">{getGameOverMessage()}</p>
            <p className="text-sm text-textDark">Você chegou ao nível {level}.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 h-72 w-full max-w-xs">
          {Array.from({ length: GRID_SIZE }).map((_, index) => {
            const isLit = litCell === index;
            return (
              <button
                key={index}
                onClick={() => handleCellClick(index)}
                disabled={gameState !== 'playing'}
                className={`aspect-square rounded-lg transition-all duration-150
                  ${isLit 
                    ? 'bg-[#00E5FF] shadow-[0_0_15px_#00E5FF] scale-105'
                    : 'bg-black/50 border border-white/20 hover:border-secondary'
                  }
                  ${gameState === 'playing' ? 'cursor-pointer active:scale-95 active:bg-secondary/50' : 'cursor-wait'}
                `}
              />
            );
          })}
        </div>
      )}

      <div className="flex gap-4 mt-6 w-full">
        <button
          onClick={startGame}
          className="flex-1 py-2 rounded-lg font-bold bg-cardDark border border-borderNeon text-textLight hover:bg-primary/30 hover:border-primary transition-colors"
        >
          Jogar de novo
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-2 rounded-lg font-bold bg-primary text-white shadow-glow-primary hover:animate-neon-pulse"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default AstroPuzzleGame;
