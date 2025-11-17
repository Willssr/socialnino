import React from 'react';
import { TimelineEvent } from '../types';

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    // 5. FUNDO DA SEÇÃO
    <div
      className="mt-8 p-6 rounded-xl"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        boxShadow: '0 0 20px rgba(0, 229, 255, 0.4)',
      }}
    >
      {/* 1. TÍTULO */}
      <h2
        className="font-orbitron mb-6"
        style={{
          color: '#A855F7',
          fontSize: '22px',
          fontWeight: '800',
          textShadow: '0 0 10px #A855F7, 0 0 25px #A855F7',
        }}
      >
        Linha do Tempo
      </h2>
      <div className="flow-root">
        <ul className="-mb-8">
          {events.map((event, eventIdx) => (
            <li key={eventIdx}>
              <div className="relative pb-8">
                {eventIdx !== events.length - 1 ? (
                  // 4. LINHA VERTICAL
                  <span
                    className="absolute left-5 top-5 h-full"
                    style={{
                      width: '3px',
                      marginLeft: '-1.5px', // Center the line
                      backgroundColor: '#00E5FF',
                      boxShadow: '0 0 12px #00E5FF, 0 0 20px #00E5FF',
                    }}
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-start space-x-4">
                  <div>
                    {/* 3. ÍCONES */}
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: 'rgba(0, 229, 255, 0.25)',
                        border: '3px solid #00E5FF',
                        boxShadow: '0 0 12px #00E5FF',
                      }}
                    >
                      <span className="text-xl">{event.icon}</span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5">
                    {/* 2. TEXTOS DOS EVENTOS */}
                    <p
                      style={{
                        color: '#00E5FF',
                        fontSize: '17px',
                        fontWeight: '700',
                        textShadow: '0 0 8px #00E5FF, 0 0 16px #00E5FF',
                      }}
                    >
                      {event.text}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Timeline;
