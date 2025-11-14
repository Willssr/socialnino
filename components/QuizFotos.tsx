import React, { useEffect, useState } from "react";
import { updateRanking, RankingEntry } from '../services/rankingService';
import Ranking from './Ranking';
import { useNinoPoints } from '../context/NinoPointsContext';

// MOCK TEMPORÁRIO
const mockUsers = [
  {
    id: 1,
    username: "joao",
    avatar: "https://picsum.photos/200?random=11",
    photo: "https://picsum.photos/600/600?random=111",
  },
  {
    id: 2,
    username: "maria",
    avatar: "https://picsum.photos/200?random=22",
    photo: "https://picsum.photos/600/600?random=222",
  },
  {
    id: 3,
    username: "luana",
    avatar: "https://picsum.photos/200?random=33",
    photo: "https://picsum.photos/600/600?random=333",
  },
  {
    id: 4,
    username: "pedro",
    avatar: "https://picsum.photos/200?random=44",
    photo: "https://picsum.photos/600/600?random=444",
  },
  {
    id: 5,
    username: "nina",
    avatar: "https://picsum.photos/200?random=55",
    photo: "https://picsum.photos/600/600?random=555",
  },
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
          <div className="quiz-card">
              <h2 className="quiz-title">Fim de Jogo!</h2>
              <p className="quiz-sub">Sua pontuação final foi:</p>
              <p className="text-5xl font-bold my-4 dark:text-white">{pontuacao}</p>
              
              <Ranking ranking={ranking} currentUser={currentUser} />

              <button onClick={resetGame} className="quiz-btn mt-4">
                  Jogar Novamente
              </button>
          </div>
      )
  }

  if (!fotoAtual) return null;

  return (
    <div className="quiz-card">
      <h2 className="quiz-title">Quiz de Fotos 📸</h2>
      <p className="quiz-sub">Adivinhe de quem é a foto!</p>

      <div className="quiz-info">
        <span>Rodada: {rodada}/{TOTAL_ROUNDS}</span>
        <span>Pontos: {pontuacao}</span>
      </div>

      <div className="quiz-foto-area">
        <img src={fotoAtual.photo} className="quiz-foto" alt="Foto do quiz" />

        {estadoResposta === "acertou" && (
          <div className="quiz-feedback quiz-ok">✔ Acertou!</div>
        )}
        {estadoResposta === "errou" && (
          <div className="quiz-feedback quiz-no">✖ Errou!</div>
        )}
      </div>

      <div className="quiz-opcoes">
        {opcoes.map((o) => (
          <button
            key={o}
            onClick={() => responder(o)}
            className="quiz-btn"
            disabled={!!estadoResposta}
          >
            @{o}
          </button>
        ))}
      </div>
    </div>
  );
}