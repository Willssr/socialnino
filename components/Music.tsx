import React, { useState, useRef } from "react";
import { Track } from "../types";
import { uploadTrackToFirebase } from "../services/firebaseMusic";

const communitySongsMock: Track[] = [
  {
    id: 3,
    title: "Cybernetic Pulse",
    artist: "Synthwave Dreams",
    cover: "https://picsum.photos/seed/cyber/200",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 4,
    title: "Neon Skylines",
    artist: "Vector Dash",
    cover: "https://picsum.photos/seed/neon/200",
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
      className={`w-full flex items-center p-3 rounded-lg text-left transition-colors duration-300 ${isActive ? "bg-primary/30" : "hover:bg-cardDark/50"}`}
      onClick={onPlay}
    >
      <img src={track.cover} alt={track.title} className="w-12 h-12 rounded-md object-cover" />
      <div className="flex-grow mx-3">
        <span className={`block font-bold text-sm ${isActive ? 'text-secondary' : 'text-textLight'}`}>{track.title}</span>
        <span className="block text-xs text-textDark">{track.artist}</span>
      </div>
      <span className={`text-xs font-bold ${isActive ? 'text-secondary' : 'text-primary'}`}>
        {isActive ? "TOCANDO" : "PLAY"}
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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao enviar música. Tente novamente.");
      }
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
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Erro ao enviar gravação. Tente novamente.");
          }
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
     <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl text-textLight">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-borderNeon">
            <h1 className="text-3xl font-orbitron font-bold text-gradient-neon">
                Músicas
            </h1>
             <div className="relative">
                <button
                    className="music-add-btn"
                    onClick={handleClickAddMusic}
                    disabled={isUploading || isRecording}
                >
                    {isUploading ? "Enviando..." : (isRecording ? "Gravando..." : "+ Adicionar")}
                </button>

                {showMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-cardDark border border-borderNeon rounded-lg shadow-lg z-10">
                      <button className="w-full text-left px-4 py-2 text-sm hover:bg-primary/20" onClick={handleSelectFromDevice}>
                          📂 Do dispositivo
                      </button>
                      {!isRecording ? (
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-primary/20" onClick={handleStartRecording}>
                          🎤 Gravar
                          </button>
                      ) : (
                          <button className="w-full text-left px-4 py-2 text-sm text-accent hover:bg-accent/20" onClick={handleStopRecording}>
                          ⏹ Parar
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
        
        {error && <p className="text-center text-accent bg-accent/10 p-2 rounded-md mb-4">{error}</p>}
        {isRecording && (
            <p className="text-center text-secondary bg-secondary/10 p-2 rounded-md mb-4 animate-pulse">🎙 Gravando...</p>
        )}

        <div className="music-now-card p-4 mb-8">
            <h3 className="text-sm font-bold uppercase text-secondary tracking-widest mb-3">Tocando agora</h3>
            {currentTrack ? (
            <div className="flex items-center space-x-4">
                <img src={currentTrack.cover} alt={currentTrack.title} className="w-24 h-24 rounded-lg shadow-lg"/>
                <div className="flex-grow">
                  <span className="font-bold text-lg">{currentTrack.title}</span>
                  <span className="block text-sm text-textDark">{currentTrack.artist}</span>
                  <button className="mt-2 px-4 py-1 text-sm bg-secondary/80 text-backgroundDark font-bold rounded-full hover:bg-secondary" onClick={handleTogglePlayPause}>
                      {isPlaying ? "PAUSAR" : "PLAY"}
                  </button>
                </div>
            </div>
            ) : (
            <p className="text-center text-textDark py-8">
                Nenhuma música tocando.
            </p>
            )}
            <audio ref={audioRef} src={currentTrack?.src} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => setIsPlaying(false)} className="hidden"/>
        </div>

        {/* Minhas músicas */}
        <div className="mb-8">
            <h3 className="text-xl font-orbitron font-bold mb-2">Minhas Músicas</h3>
            <p className="text-sm text-textDark mb-4">Trilhas que você adicionou.</p>
            {mySongs.length === 0 ? (
                <div className="text-center text-textDark p-4 border-2 border-dashed border-borderNeon/50 rounded-lg">
                    Você ainda não adicionou nenhuma música.
                </div>
                ) : (
                <div className="space-y-1">
                    {mySongs.map((track) => (
                        <MusicRow key={track.id} track={track} isActive={currentTrack?.id === track.id} onPlay={() => handlePlay(track)}/>
                    ))}
                </div>
            )}
        </div>

        {/* Músicas da comunidade */}
        <div>
            <h3 className="text-xl font-orbitron font-bold mb-2">Comunidade</h3>
            <p className="text-sm text-textDark mb-4">Descubra faixas de outros criadores.</p>
            <div className="space-y-1">
            {communitySongsMock.map((track) => (
                <MusicRow key={track.id} track={track} isActive={currentTrack?.id === track.id} onPlay={() => handlePlay(track)}/>
            ))}
            </div>
        </div>
    </div>
  );
}

export default Music;