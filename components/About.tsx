

import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                Sobre o SocialNino
            </h1>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Bem-vindo ao SocialNino! Este é um projeto de demonstração criado para simular uma plataforma de mídia social moderna e responsiva, com forte inspiração visual no Instagram.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                O objetivo é apresentar uma interface de usuário limpa, intuitiva e agradável, construída com tecnologias web de ponta como React e Tailwind CSS.
                Toda a interatividade, como curtidas e comentários, é salva localmente no seu navegador usando LocalStorage para persistência de dados sem a necessidade de um backend real.
            </p>
        </div>
    </div>
  );
};

export default About;