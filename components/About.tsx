import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Sobre o SocialNino</h1>
            <p className="text-slate-600 leading-relaxed">
                Bem-vindo ao SocialNino! Este é um projeto de demonstração criado para simular uma plataforma de mídia social moderna e responsiva.
                Aqui, você pode visualizar posts de fotos e vídeos, curtir, comentar e até mesmo ouvir uma seleção de músicas.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
                O objetivo é apresentar uma interface de usuário limpa, intuitiva e agradável, construída com tecnologias web de ponta como React e Tailwind CSS.
                Toda a interatividade, como curtidas e comentários, é salva localmente no seu navegador usando LocalStorage para persistência de dados sem a necessidade de um backend real.
            </p>
        </div>
    </div>
  );
};

export default About;