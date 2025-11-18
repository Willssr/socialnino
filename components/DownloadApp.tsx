
import React, { useState } from 'react';
import { AppleIcon, XIcon, DownloadIcon } from './Icons';

// Component for PWA instructions modal
const PwaInstallModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-backgroundDark/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-cardDark border border-borderNeon rounded-lg shadow-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-borderNeon/50">
          <h2 className="text-lg font-orbitron font-bold text-gradient-neon">Instalar no iPhone (PWA)</h2>
          <button onClick={onClose} className="text-textDark hover:text-textLight">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-4 text-sm text-textLight">
          <p>Para instalar o SocialNino no seu iPhone, siga estes passos simples:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Abra este site no <strong className="text-secondary">Safari</strong>.</li>
            <li>Toque no ícone de <strong className="text-secondary">Compartilhar</strong> (um quadrado com uma seta para cima) na barra de navegação.</li>
            <li>Role para baixo e selecione a opção <strong className="text-secondary">"Adicionar à Tela de Início"</strong>.</li>
            <li>Confirme o nome do app e toque em <strong className="text-secondary">"Adicionar"</strong>.</li>
          </ol>
          <p className="text-xs text-textDark">O ícone do SocialNino aparecerá na sua tela de início, como qualquer outro aplicativo!</p>
        </div>
      </div>
    </div>
  );
};

const DownloadApp: React.FC = () => {
  const [isPwaModalOpen, setIsPwaModalOpen] = useState(false);

  // Link direto fornecido pelo usuário
  const apkLink = "https://drive.google.com/uc?export=download&id=1JSwB8fR4_gDalzk7f7M5aVUE-lrXqMa8";

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl text-textLight flex flex-col items-center justify-center min-h-[70vh]">
        
        <div className="text-center mb-10 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4CAF50] to-[#00E5FF] mb-4 drop-shadow-[0_0_10px_rgba(76,175,80,0.5)]">
            Download
            </h1>
            <p className="text-slate-400 text-lg max-w-md mx-auto">
            Toque no botão abaixo para baixar o aplicativo oficial.
            </p>
        </div>

        <div className="w-full max-w-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <a
            href={apkLink}
            download
            className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-white transition-all duration-300 shadow-[0_0_20px_rgba(76,175,80,0.4)] hover:shadow-[0_0_30px_rgba(76,175,80,0.6)] hover:-translate-y-1 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                
                <DownloadIcon className="w-7 h-7" />
                <span className="text-xl font-bold font-orbitron tracking-wide">BAIXAR APK</span>
            </a>
            
            <div className="mt-4 text-center">
                <p className="text-xs text-slate-500">
                    Download direto • Seguro • Rápido
                </p>
            </div>
        </div>

        {/* Divider */}
        <div className="w-full max-w-xs my-10 flex items-center gap-4 opacity-30">
            <div className="h-px flex-1 bg-white" />
            <span className="text-xs font-mono">OU</span>
            <div className="h-px flex-1 bg-white" />
        </div>

        {/* Secondary Options */}
        <div className="grid grid-cols-1 gap-4 w-full max-w-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
             <button
                onClick={() => setIsPwaModalOpen(true)}
                className="flex items-center justify-center gap-3 p-4 rounded-xl bg-cardDark border border-borderNeon/30 hover:border-borderNeon hover:bg-primary/10 transition-all duration-300 group"
            >
                <AppleIcon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                <span className="text-slate-400 font-semibold group-hover:text-white transition-colors">
                Instalar no iPhone (PWA)
                </span>
            </button>
        </div>
      </div>

      {isPwaModalOpen && <PwaInstallModal onClose={() => setIsPwaModalOpen(false)} />}
    </>
  );
};

export default DownloadApp;
