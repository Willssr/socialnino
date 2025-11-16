import React, { useState } from 'react';
import { AppleIcon, AndroidIcon, XIcon } from './Icons';

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

  // Placeholder link for the APK file
  const apkLink = "data:text/plain;charset=utf-8,Placeholder for SocialNino.apk file";

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl text-textLight text-center">
        <h1 className="text-4xl font-orbitron font-bold text-gradient-neon mb-4">
          Baixe o SocialNino no seu celular 📱
        </h1>
        <p className="max-w-2xl mx-auto text-textDark mb-10">
          Leve a experiência completa do SocialNino com você. Instale nosso aplicativo para ter acesso a recursos exclusivos e uma interface otimizada.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Android Button */}
          <a
            href={apkLink}
            download="SocialNino.apk"
            className="rgb-border rounded-xl p-6 flex flex-col items-center justify-center text-left transition-transform duration-300 hover:-translate-y-1 hover:shadow-glow-primary/50 no-underline"
          >
            <div className="flex items-center gap-4">
              <AndroidIcon className="w-12 h-12 text-secondary" />
              <div>
                <h3 className="font-orbitron font-bold text-xl text-secondary">Baixar APK</h3>
                <p className="text-sm text-textDark mt-1">Para dispositivos Android</p>
              </div>
            </div>
          </a>

          {/* iPhone Button */}
          <button
            onClick={() => setIsPwaModalOpen(true)}
            className="rgb-border rounded-xl p-6 flex flex-col items-center justify-center text-left transition-transform duration-300 hover:-translate-y-1 hover:shadow-glow-accent/50"
          >
            <div className="flex items-center gap-4">
              <AppleIcon className="w-12 h-12 text-accent" />
              <div>
                <h3 className="font-orbitron font-bold text-xl text-accent">Instalar no iPhone</h3>
                <p className="text-sm text-textDark mt-1">Via PWA (Progressive Web App)</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {isPwaModalOpen && <PwaInstallModal onClose={() => setIsPwaModalOpen(false)} />}
    </>
  );
};

export default DownloadApp;