import React, { useState, useRef } from "react";
import { Track } from "../types";
import { uploadTrackToFirebase } from "../services/firebaseMusic";

const communitySongsMock: Track[] = [
  {
    id: 3,
    title: "For Bigger Blazes",
    artist: "Google",
    cover: "https://picsum.photos/200?random=203",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 4,
    title: "For Bigger Escapes",
    artist: "Google",
    cover: "https://picsum.photos/200?random=204",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
];


interface MusicRowProps {
    track: Track;
    isActive: boolean;
    onPlay: () => void;
}

const MusicRow: React.FC<MusicRowProps> = ({ track, isActive, onPlay }) => {
  return (
    <button
      className={`music-row ${isActive ? "music-row-active" : ""}`}
      onClick={onPlay}
    >
      <img src={track.cover} alt={track.title} className="music-row-cover" />
      <div className="music-row-info">
        <span className="music-row-title">{track.title}</span>
        <span className="music-row-artist">{track.artist}</span>
      </div>
      <span className="music-row-play">
        {isActive ? "▶ Tocando" : "▶"}
      </span>
    </button>
  );
}

const Music: React.FC = () => {
  const [mySongs, setMySongs] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const handlePlay = (track: Track) => {
    setCurrentTrack(track);
    setTimeout(() => {
      audioRef.current?.play();
    }, 60);
  };

  const handleTogglePlayPause = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
        audioRef.current.play();
    } else {
        audioRef.current.pause();
    }
  };

  const handleClickAddMusic = () => {
    setShowMenu((v) => !v);
  };

  const handleSelectFromDevice = () => {
    setShowMenu(false);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError("");

      const uploaded = await uploadTrackToFirebase(file, {
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: "Você",
      });

      const newTrack: Track = {
        id: uploaded.id,
        title: uploaded.title,
        artist: uploaded.artist,
        cover:
          "https://picsum.photos/seed/" +
          uploaded.id +
          "/200/200",
        src: uploaded.url,
      };

      setMySongs((prev) => [newTrack, ...prev]);
      handlePlay(newTrack);

    } catch (err) {
      console.error(err);
      setError("Erro ao enviar música. Verifique a configuração do Firebase e tente novamente.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleStartRecording = async () => {
    setShowMenu(false);
    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = [];

      mediaRecorder.ondataavailable = (ev) => {
        if (ev.data.size > 0) recordedChunksRef.current.push(ev.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "audio/webm",
        });
        const file = new File([blob], "gravacao-socialnino.webm", {
          type: "audio/webm",
        });

        try {
          setIsUploading(true);
          const uploaded = await uploadTrackToFirebase(file, {
            title: "Gravação SocialNino",
            artist: "Você",
          });

          const newTrack: Track = {
            id: uploaded.id,
            title: uploaded.title,
            artist: uploaded.artist,
            cover:
              "https://picsum.photos/seed/" +
              uploaded.id +
              "/200/200",
            src: uploaded.url,
          };

          setMySongs((prev) => [newTrack, ...prev]);
          handlePlay(newTrack);

        } catch (err) {
          console.error(err);
          setError("Erro ao enviar gravação. Verifique a configuração do Firebase.");
        } finally {
          setIsUploading(false);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error(err);
      setError(
        "Não foi possível acessar o microfone. Verifique as permissões."
      );
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current?.stream
      .getTracks()
      .forEach((t) => t.stop());
    setIsRecording(false);
  };
  
  return (
     <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        <div className="music-header">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                Músicas 🎧
            </h1>
             <div className="music-add-wrapper">
                <button
                    className="music-add-btn"
                    onClick={handleClickAddMusic}
                    disabled={isUploading || isRecording}
                >
                    {isUploading ? "Enviando..." : (isRecording ? "Gravando..." : "+ Adicionar música")}
                </button>

                {showMenu && (
                    <div className="music-add-menu animation-fade">
                    <button
                        className="music-add-menu-item"
                        onClick={handleSelectFromDevice}
                    >
                        📂 Selecionar do dispositivo
                    </button>
                    {!isRecording ? (
                        <button
                        className="music-add-menu-item"
                        onClick={handleStartRecording}
                        >
                        🎤 Gravar com microfone
                        </button>
                    ) : (
                        <button
                        className="music-add-menu-item stop"
                        onClick={handleStopRecording}
                        >
                        ⏹ Parar gravação
                        </button>
                    )}
                    </div>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </div>
        </div>
        
        {error && <p className="music-error">{error}</p>}
        {isRecording && (
            <p className="music-recording">🎙 Gravando... clique em "Parar gravação" no menu para finalizar.</p>
        )}

        {/* Tocando agora */}
        <div className="music-now-card">
            <h3>Tocando agora</h3>
            {currentTrack ? (
            <div className="music-now-content">
                <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="music-now-cover"
                />
                <div className="music-now-info">
                <span className="music-now-title">{currentTrack.title}</span>
                <span className="music-now-artist">{currentTrack.artist}</span>

                <button
                    className="music-play-btn"
                    onClick={handleTogglePlayPause}
                >
                    {isPlaying ? "Pausar" : "Reproduzir"}
                </button>
                </div>
            </div>
            ) : (
            <p className="music-now-empty">
                Nenhuma música tocando. Escolha uma faixa abaixo ou adicione a sua.
            </p>
            )}

            <audio
            ref={audioRef}
            src={currentTrack?.src}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
            />
        </div>

        {/* Minhas músicas */}
        <div className="music-section">
            <div className="music-section-header">
            <h3>Minhas músicas</h3>
            <span className="music-section-sub">
                Trilhas que você adicionou à SocialNino.
            </span>
            </div>
            {mySongs.length === 0 ? (
                <p className="music-now-empty p-4 text-center">
                    Você ainda não adicionou nenhuma música.
                </p>
                ) : (
                <div className="music-list">
                    {mySongs.map((track) => (
                        <MusicRow
                        key={track.id}
                        track={track}
                        isActive={currentTrack?.id === track.id}
                        onPlay={() => handlePlay(track)}
                        />
                    ))}
                </div>
            )}
        </div>

        {/* Músicas da comunidade */}
        <div className="music-section">
            <div className="music-section-header">
            <h3>Músicas da comunidade</h3>
            <span className="music-section-sub">
                Descubra faixas que outros criadores estão usando.
            </span>
            </div>

            <div className="music-list">
            {communitySongsMock.map((track) => (
                <MusicRow
                key={track.id}
                track={track}
                isActive={currentTrack?.id === track.id}
                onPlay={() => handlePlay(track)}
                />
            ))}
            </div>
        </div>
    </div>
  );
}

export default Music;