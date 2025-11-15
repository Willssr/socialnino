import React, { useEffect, useState } from "react";
import { updateRanking, RankingEntry } from '../services/rankingService';
import Ranking from './Ranking';
import { useNinoPoints } from '../context/NinoPointsContext';

// MOCK TEMPORÁRIO
const mockUsers = [
  { id: 1, username: "zer0_cool", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d", photo: "https://picsum.photos/seed/tech1/600/600" },
  { id: 2, username: "gl1tch", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d", photo: "https://picsum.photos/seed/tech2/600/600" },
  { id: 3, username: "n3xus", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026707d", photo: "https://picsum.photos/seed/tech3/600/600" },
  { id: 4, username: "cyb3r", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026708d", photo: "https://picsum.photos/seed/tech4/600/600" },
  { id: 5, username: "v0id", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026709d", photo: "https://picsum.photos/seed/tech5/600/600" },
];

interface MockUser {
    id: number;
    username: string;
    avatar: string;
    photo: string;
}

// embaralhar array
function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

const TOTAL_ROUNDS = 5;

interface QuizFotosProps {
    currentUser: string;
}

export default function QuizFotos({ currentUser }: QuizFotosProps) {
  const [pontuacao, setPontuacao] = useState(0);
  const [rodada, setRodada] = useState(1);
  const [respostaCerta, setRespostaCerta] = useState<string | null>(null);
  const [fotoAtual, setFotoAtual] = useState<MockUser | null>(null);
  const [opcoes, setOpcoes] = useState<string[]>([]);
  const [estadoResposta, setEstadoResposta] = useState<'acertou' | 'errou' | null>(null);
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const { addPoints } = useNinoPoints();

  const gerarPergunta = () => {
    const shuffledUsers = shuffle(mockUsers);
    const foto = shuffledUsers[0];
    const outras = shuffledUsers.slice(1, 3);
    const todasOpcoes = shuffle([foto.username, ...outras.map((u) => u.username)]);

    setFotoAtual(foto);
    setOpcoes(todasOpcoes);
    setRespostaCerta(foto.username);
    setEstadoResposta(null);
  };

  useEffect(() => {
    gerarPergunta();
  }, []);

  const handleNextRound = async () => {
      if (rodada < TOTAL_ROUNDS) {
          setRodada((r) => r + 1);
          gerarPergunta();
      } else {
          const finalRanking = await updateRanking(currentUser, pontuacao);
          setRanking(finalRanking);
          setGameState('finished');
      }
  };
  
  const responder = (opcao: string) => {
    if (estadoResposta) return;

    if (opcao === respostaCerta) {
      setPontuacao((p) => p + 10);
      setEstadoResposta("acertou");
      addPoints('QUIZ');
    } else {
      setEstadoResposta("errou");
    }

    setTimeout(handleNextRound, 1200);
  };
  
  const resetGame = () => {
      setPontuacao(0);
      setRodada(1);
      setGameState('playing');
      gerarPergunta();
  };

  if (gameState === 'finished') {
      return (
          <div className="rgb-border rounded-xl p-6 text-center">
              <h2 className="text-2xl font-orbitron font-bold text-gradient-neon">Fim de Jogo!</h2>
              <p className="text-textDark mt-2">Sua pontuação final foi:</p>
              <p className="text-6xl font-bold my-4 text-secondary drop-shadow-[0_0_8px_#00E5FF]">{pontuacao}</p>
              
              <Ranking ranking={ranking} currentUser={currentUser} />

              <button onClick={resetGame} className="w-full mt-6 py-3 rounded-lg font-bold bg-primary text-white shadow-glow-primary hover:animate-neon-pulse">
                  Jogar Novamente
              </button>
          </div>
      )
  }

  if (!fotoAtual) return null;

  return (
    <div className="rgb-border rounded-xl p-6">
      <h2 className="text-2xl font-orbitron font-bold text-gradient-neon text-center">Quiz de Fotos 📸</h2>

      <div className="flex justify-between items-center my-4 text-sm">
        <span className="font-bold text-textDark">Rodada: <span className="text-textLight">{rodada}/{TOTAL_ROUNDS}</span></span>
        <span className="font-bold text-textDark">Pontos: <span className="text-textLight">{pontuacao}</span></span>
      </div>

      <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-borderNeon">
        <img src={fotoAtual.photo} className="w-full h-full object-cover" alt="Foto do quiz" />

        {estadoResposta === "acertou" && (
          <div className="absolute inset-0 flex items-center justify-center font-bold text-5xl bg-secondary/70 text-backgroundDark animate-ping once">✔</div>
        )}
        {estadoResposta === "errou" && (
          <div className="absolute inset-0 flex items-center justify-center font-bold text-5xl bg-accent/70 text-white animate-ping once">✖</div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 mt-4">
        {opcoes.map((o) => (
          <button
            key={o}
            onClick={() => responder(o)}
            className="w-full py-3 rounded-lg font-bold bg-cardDark border border-borderNeon text-textLight hover:bg-primary/30 hover:border-primary disabled:opacity-50 transition-colors"
            disabled={!!estadoResposta}
          >
            @{o}
          </button>
        ))}
      </div>
    </div>
  );
}