import React, { useMemo, useState } from "react";

const DESAFIOS = [
  {
    title: "Algo azul",
    description: "Poste uma foto com algo azul que você viu hoje.",
    hashtag: "#DesafioDoDiaAzul",
  },
  {
    title: "Vista do dia",
    description: "Mostre a vista de onde você está agora.",
    hashtag: "#DesafioDoDiaVista",
  },
  {
    title: "Momento feliz",
    description: "Compartilhe um momento que te deixou feliz recentemente.",
    hashtag: "#DesafioDoDiaFeliz",
  },
  {
    title: "Seu lugar favorito",
    description: "Poste uma foto ou vídeo do seu lugar favorito na sua cidade.",
    hashtag: "#DesafioDoDiaLugarFav",
  },
  {
    title: "Mood musical",
    description: "Mostre algo que combine com a música que você mais ouviu hoje.",
    hashtag: "#DesafioDoDiaMusic",
  },
];

function getDesafioDoDia() {
  const today = new Date();
  const key = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  // gera um índice "fixo" pro dia
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
  // In a real app, this would be stored per-user, per-day
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
    <section className="daily-challenge-card">
      <div className="daily-challenge-header">
        <span className="daily-chip">Desafio do dia 🌟</span>
        <span className="daily-date">
          {new Date().toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      </div>

      <h3 className="daily-title">{desafio.title}</h3>
      <p className="daily-description">{desafio.description}</p>

      <div className="daily-hashtag">{desafio.hashtag}</div>

      <div className="daily-footer">
        <button
          className={`daily-btn ${jaParticipou ? "daily-btn-ok" : ""}`}
          onClick={handleParticipar}
        >
          {jaParticipou ? "Você já está participando 🎉" : "Participar do desafio"}
        </button>

        <span className="daily-participants">
          {participantes === 0 && "Seja o primeiro a participar!"}
          {participantes === 1 && "1 pessoa já participou hoje"}
          {participantes > 1 && `${participantes} pessoas já participaram hoje`}
        </span>
      </div>
    </section>
  );
}