import React, { useMemo, useState } from "react";

const DESAFIOS = [
  {
    title: "Neon Urbano",
    description: "Poste uma foto de luzes neon que você encontrou na cidade.",
    hashtag: "#DesafioNeonUrbano",
  },
  {
    title: "Reflexo do Futuro",
    description: "Capture um reflexo interessante em uma superfície metálica ou de vidro.",
    hashtag: "#DesafioReflexoFuturo",
  },
  {
    title: "Sombra Cyber",
    description: "Brinque com luz e sombra para criar uma foto com estética cyberpunk.",
    hashtag: "#DesafioSombraCyber",
  },
  {
    title: "Seu Setup Gamer",
    description: "Mostre seu setup de jogos, trabalho ou estudo com iluminação RGB.",
    hashtag: "#DesafioSetupGamer",
  },
  {
    title: "Trilha Sonora Noturna",
    description: "Uma foto que represente a música que você está ouvindo agora.",
    hashtag: "#DesafioTrilhaNoturna",
  },
];

function getDesafioDoDia() {
  const today = new Date();
  const key = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash + key.charCodeAt(i)) % 10000;
  }
  const index = hash % DESAFIOS.length;
  return DESAFIOS[index];
}

interface Desafio {
    title: string;
    description: string;
    hashtag: string;
}

interface DesafioDoDiaProps {
    onParticipar: (data: { desafio: Desafio, legenda: string }) => void;
}


export default function DesafioDoDia({ onParticipar }: DesafioDoDiaProps) {
  const desafio = useMemo(() => getDesafioDoDia(), []);
  const [participantes, setParticipantes] = useState(Math.floor(Math.random() * 100)); 
  const [jaParticipou, setJaParticipou] = useState(false);

  const handleParticipar = () => {
    if (!jaParticipou) {
      setParticipantes((prev) => prev + 1);
      setJaParticipou(true);
    }
    const legenda = `${desafio.description} ${desafio.hashtag}`;
    onParticipar({ desafio, legenda });
  };

  return (
    <section className="rgb-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold bg-primary/30 text-secondary px-3 py-1 rounded-full">Desafio do dia 🌟</span>
        <span className="text-xs text-textDark">
          {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })}
        </span>
      </div>

      <h3 className="text-2xl font-orbitron font-bold text-gradient-neon mb-2">{desafio.title}</h3>
      <p className="text-textDark mb-4">{desafio.description}</p>

      <div className="text-secondary font-mono bg-cardDark/50 px-3 py-1 rounded mb-6 inline-block">{desafio.hashtag}</div>

      <div className="text-center">
        <button
          className={`w-full py-3 rounded-lg font-bold text-lg transition-all duration-300 ${jaParticipou ? "bg-secondary text-backgroundDark" : "bg-primary text-white shadow-glow-primary hover:animate-neon-pulse"}`}
          onClick={handleParticipar}
        >
          {jaParticipou ? "PARTICIPANDO 🎉" : "PARTICIPAR DO DESAFIO"}
        </button>

        <span className="block text-xs text-textDark mt-3">
          {participantes > 1 ? `${participantes} pessoas já participaram hoje` : "Seja um dos primeiros a participar!"}
        </span>
      </div>
    </section>
  );
}