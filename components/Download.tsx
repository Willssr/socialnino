import React from 'react';
import { DownloadIcon } from './Icons';

const Download: React.FC = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
          Baixe o App SocialNino
        </h1>
        <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto mt-4 mb-8">
          Leve a experiência completa do SocialNino com você! Baixe nosso aplicativo para ter acesso a recursos exclusivos e uma interface otimizada para o seu celular.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
          {/* App Store Button */}
          <a
            href="#" // TODO: Substitua pelo seu link real da App Store
            className="bg-black text-white rounded-lg px-6 py-3 flex items-center justify-center space-x-3 w-60 hover:bg-gray-800 transition-colors"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 384 512">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C39.2 141.1 0 183.2 0 241.2c0 61.6 44.8 143.2 101.5 183.9 31.4 22.3 64.2 34.5 101.2 34.5 11.2 0 22.5-1.6 33.5-4.4 2.8-.7 5.7-1.5 8.5-2.3 2.8-.8 5.7-1.7 8.5-2.6 2.8-.9 5.7-1.9 8.6-2.8 2.8-1 5.7-2 8.5-3.1 2.8-1.1 5.7-2.3 8.5-3.5 2.8-1.2 5.6-2.5 8.4-3.8 2.8-1.3 5.6-2.7 8.4-4.1 2.8-1.4 5.6-2.9 8.3-4.4 2.8-1.5 5.5-3.1 8.2-4.8 2.7-1.7 5.4-3.5 8.1-5.3 2.7-1.8 5.4-3.8 8-5.8 2.6-2 5.3-4.1 7.8-6.3 2.6-2.2 5.1-4.5 7.6-6.8 2.5-2.3 5-4.7 7.4-7.2 2.4-2.5 4.8-5.1 7.1-7.7 2.3-2.7 4.6-5.4 6.8-8.2 2.2-2.8 4.3-5.7 6.4-8.6 2.1-3 4.1-6 6.1-9.1 2-3.1 3.9-6.3 5.7-9.5 .2-.3 .3-.7 .5-1 .1-.2 .2-.4 .3-.6 .1-.2 .2-.4 .3-.6 .2-.3 .3-.7 .5-1 .1-.2 .2-.4 .3-.6 .1-.2 .2-.4 .3-.6 .2-.3 .3-.7 .5-1 .1-.2 .2-.4 .3-.6 .1-.2 .2-.4 .3-.6zm-180.3-159.4c14.4-18.7 14.4-44.4 0-62.5-14.4-18.7-37.5-18.7-51.9 0-14.4 18.7-14.4 44.4 0 62.5 14.4 18.7 37.5 18.7 51.9 0z"/>
            </svg>
            <div>
              <p className="text-xs">Download on the</p>
              <p className="text-xl font-semibold">App Store</p>
            </div>
          </a>

          {/* Google Play Button */}
          <a
            href="#" // TODO: Substitua pelo seu link real do Google Play
            className="bg-black text-white rounded-lg px-6 py-3 flex items-center justify-center space-x-3 w-60 hover:bg-gray-800 transition-colors"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 512 512">
              <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0L464 256 47 512V0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
            </svg>
            <div>
              <p className="text-xs">GET IT ON</p>
              <p className="text-xl font-semibold">Google Play</p>
            </div>
          </a>

          {/* Direct Download Button */}
          <a
            href="data:text/plain;charset=utf-8,Este é um arquivo de placeholder para SocialNino.apk"
            className="bg-green-600 text-white rounded-lg px-6 py-3 flex items-center justify-center space-x-3 w-60 hover:bg-green-700 transition-colors mt-4 sm:mt-0"
            download="SocialNino.apk"
          >
            <DownloadIcon className="w-8 h-8" solid={true} />
            <div>
              <p className="text-xs">Para Android</p>
              <p className="text-xl font-semibold">Baixar .APK</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Download;