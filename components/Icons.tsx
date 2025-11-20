
import React from 'react';

export const HeartIcon = ({ className, solid }: { className?: string; solid?: boolean; }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill={solid ? 'currentColor' : 'none'}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={solid ? 0 : 2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"
    />
  </svg>
);

export const CommentIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

export const PaperAirplaneIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg"
        className={className} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

export const BookmarkIcon = ({ className, solid }: { className?: string, solid?: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill={solid ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
);

export const DotsHorizontalIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01" />
    </svg>
);

export const HomeIcon = ({ className, solid, useGradient }: { className?: string, solid?: boolean, useGradient?: boolean }) => {
    const gradientId = "icon-gradient-home";
    const pathData = "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5";
    
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={useGradient ? `url(#${gradientId})` : "currentColor"}>
            {useGradient && (
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7B2FF7" />
                        <stop offset="100%" stopColor="#00E5FF" />
                    </linearGradient>
                </defs>
            )}
            <path strokeLinecap="round" strokeLinejoin="round" d={pathData} />
        </svg>
    );
};


export const MusicNoteIcon = ({ className, solid }: { className?: string, solid?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.007 1.934l-7.5 4.11-7.5-4.11A2.25 2.25 0 013 18.253v-3.75m18 0A2.25 2.25 0 0018.75 12H5.25A2.25 2.25 0 003 14.25v3.75m18 0v-3.75a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 14.25m18 0v-3.75" />
    </svg>

);

export const UserIcon = ({ className, solid }: { className?: string, solid?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
       {solid ? (
        <path fill="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
       ): (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
       )}
    </svg>

);

export const PlayIcon = ({ className, solid }: { className?: string, solid?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        {solid ? (
            <path fill="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
        )}
    </svg>
);


export const GameControllerIcon = ({ className, solid, useGradient }: { className?: string, solid?: boolean, useGradient?: boolean }) => {
    const gradientId = "icon-gradient-game";
    const isActive = solid || useGradient;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={useGradient ? `url(#${gradientId})` : "currentColor"}>
            {useGradient && isActive && (
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7B2FF7" />
                        <stop offset="100%" stopColor="#00E5FF" />
                    </linearGradient>
                </defs>
            )}
           {isActive ? (
             <path fill={useGradient ? `url(#${gradientId})` : "currentColor"} stroke="none" strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
           ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6v-.75c0-.231.035-.454.1-.664M6.75 7.5h1.5v-1.5h-1.5v1.5z" />
           )}
        </svg>
    );
};

export const BellIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.31 5.632l-1.42 1.42A9 9 0 006.11 21H7.9 l1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

export const SearchIcon = ({ className, solid, useGradient }: { className?: string, solid?: boolean, useGradient?: boolean }) => {
    const gradientId = "icon-gradient-search";
    const isActive = solid || useGradient;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            {useGradient && isActive && (
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7B2FF7" />
                        <stop offset="100%" stopColor="#00E5FF" />
                    </linearGradient>
                </defs>
            )}
           {isActive ? (
             <path fill={useGradient ? `url(#${gradientId})` : "currentColor"} stroke="none" strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
           ) : (
             <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
           )}
        </svg>
    );
};

export const UsersIcon = ({ className, solid, useGradient }: { className?: string, solid?: boolean, useGradient?: boolean }) => {
    const gradientId = "icon-gradient-users";
    const isActive = solid || useGradient;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={useGradient ? `url(#${gradientId})` : "currentColor"}>
            {useGradient && isActive && (
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7B2FF7" />
                        <stop offset="100%" stopColor="#00E5FF" />
                    </linearGradient>
                </defs>
            )}
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.289 2.72a3 3 0 01-4.682-2.72 9.094 9.094 0 013.741-.479m7.289 2.72a8.97 8.97 0 01-7.289 0M12 12.75a3 3 0 110-6 3 3 0 010 6z" />
        </svg>
    )
};


export const XIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const PlusSquareIcon = ({ className, useGradient }: { className?: string, useGradient?: boolean }) => {
    const gradientId = "icon-gradient-plus-square";

    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={useGradient ? `url(#${gradientId})` : "currentColor"} className={className}>
            {useGradient && (
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7B2FF7" />
                        <stop offset="100%" stopColor="#00E5FF" />
                    </linearGradient>
                </defs>
            )}
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
};


export const DownloadIcon = ({ className, solid, useGradient }: { className?: string, solid?: boolean, useGradient?: boolean }) => {
    const gradientId = "icon-gradient-download";

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={useGradient ? `url(#${gradientId})` : "currentColor"}>
           {useGradient && (
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7B2FF7" />
                        <stop offset="100%" stopColor="#00E5FF" />
                    </linearGradient>
                </defs>
            )}
           <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
    );
};


export const LogoutIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
);

export const AppleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 384 512" fill="currentColor">
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C39.2 141.1 0 183.2 0 241.2c0 61.6 44.8 143.2 101.5 183.9 31.4 22.3 64.2 34.5 101.2 34.5 11.2 0 22.5-1.6 33.5-4.4 2.8-.7 5.7-1.5 8.5-2.3 2.8-.8 5.7-1.7 8.5-2.6 2.8-.9 5.7-1.9 8.6-2.8 2.8-1 5.7-2 8.5-3.1 2.8-1.1 5.7-2.3 8.5-3.5 2.8-1.2 5.6-2.5 8.4-3.8 2.8-1.3 5.6-2.7 8.4-4.1 2.8-1.4 5.6-2.9 8.3-4.4 2.8-1.5 5.5-3.1 8.2-4.8 2.7-1.7 5.4-3.5 8.1-5.3 2.7-1.8 5.4-3.8 8-5.8 2.6-2 5.3-4.1 7.8-6.3 2.6-2.2 5.1-4.5 7.6-6.8 2.5-2.3 5-4.7 7.4-7.2 2.4-2.5 4.8-5.1 7.1-7.7 2.3-2.7 4.6-5.4 6.8-8.2 2.2-2.8 4.3-5.7 6.4-8.6 2.1-3 4.1-6 6.1-9.1 2-3.1 3.9-6.3 5.7-9.5 .2-.3 .3-.7 .5-1 .1-.2 .2-.4 .3-.6 .1-.2 .2-.4 .3-.6 .2-.3 .3-.7 .5-1 .1-.2 .2-.4 .3-.6 .1-.2 .2-.4 .3-.6zm-180.3-159.4c14.4-18.7 14.4-44.4 0-62.5-14.4-18.7-37.5-18.7-51.9 0-14.4 18.7-14.4 44.4 0 62.5 14.4 18.7 37.5 18.7 51.9 0z"/>
    </svg>
);

export const AndroidIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 512 512" fill="currentColor">
        <path d="M144.2 223.9c-2.4-3.2-5.4-5.9-9.1-8.1-13.2-8.1-31.5-3.9-40.2 11.2-8.7 15.1-4.2 33.6 10.4 41.5 2.4 1.3 4.9 2.1 7.5 2.5l1.3 .2c3.5 .6 7.1 .2 10.6-.9 13.2-4.2 20.3-17.3 15.8-29.8-1.1-3.2-2.9-6-5.3-8.6zm223.6-1.7c-4.5-12.5-17.6-19.6-30.8-15.8-3.6 1-7.1 2.9-9.9 5.3-2.4 2.1-4.3 4.7-5.7 7.5-8.7 15.1-4.2 33.6 10.4 41.5 3.5 1.9 7.3 2.9 11.2 2.9 3.1 0 6.2-.6 9.2-1.9 15.1-6.5 22.3-23.2 15.6-38.7zM160 336c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s-16-7.2-16-16v-64zm192 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s-16-7.2-16-16v-64zM256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64zm0 336c-9.2 0-17.6-1.5-25.7-4.3-6.6-2.2-12.4-5.7-17.2-10-20.3-18.3-23.2-47.3-7.5-69.4 3.2-4.5 7.2-8.2 11.8-11.2 13.2-8.4 31.5-3.9 40.2 11.2 4.5 7.8 13.5 12.8 22.8 12.8s18.3-4.9 22.8-12.8c8.7-15.1 27.1-19.6 40.2-11.2 4.6 3 8.6 6.7 11.8 11.2 15.7 22.1 12.8 51.1-7.5 69.4-4.8 4.3-10.6 7.8-17.2 10-8.1 2.8-16.5 4.3-25.7 4.3z"/>
    </svg>
);

export const ChatBubbleIcon = ({ className, solid, useGradient }: { className?: string, solid?: boolean, useGradient?: boolean }) => {
    const gradientId = "icon-gradient-chat";
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={useGradient ? `url(#${gradientId})` : "currentColor"}>
            {useGradient && (
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7B2FF7" />
                        <stop offset="100%" stopColor="#00E5FF" />
                    </linearGradient>
                </defs>
            )}
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a1.125 1.125 0 01-1.59 0l-3.72-3.72A1.125 1.125 0 019 15.118v-4.286c0-.97.616-1.813 1.5-2.097M15 6.75a3 3 0 00-3-3H9a3 3 0 00-3 3v.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 .836-.47 1.574-1.195 1.954l-2.043 1.022a1.125 1.125 0 01-1.59 0l-2.043-1.022A1.125 1.125 0 013 15.118v-4.286c0-.97.616-1.813 1.5-2.097V6.75a3 3 0 013-3h3a3 3 0 013 3v.511z" />
        </svg>
    );
};

export const LocationMarkerIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const CakeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.25a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15.25V12a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 12v3.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15V9.75M8.25 9.75a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V9.75zM15 9.75a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V9.75z" />
    </svg>
);

export const SparklesIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

export const LinkIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);

export const EyeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

export const CubeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9.75v9.75" />
    </svg>
);

export const BoltIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
);

export const EnvelopeIcon = ({ className, solid }: { className?: string, solid?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill={solid ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={solid ? 0 : 2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);
