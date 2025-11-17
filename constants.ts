import { Post, Song, Story, UserProfile, Person } from './types';

export const INITIAL_PEOPLE: Person[] = [
  {
    id: 1,
    username: "nina_dev",
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    bio: "Fotógrafa e dev ✨",
    followers: 1380,
    isFollowing: false,
  },
  {
    id: 2,
    username: "rafael.art",
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    bio: "Arte digital e música",
    followers: 520,
    isFollowing: false,
  },
  {
    id: 3,
    username: "carla.codes",
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    bio: "Desenvolvedora Frontend",
    followers: 940,
    isFollowing: true,
  },
  {
    id: 4,
    username: "lucas_s",
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
    bio: "Fotógrafo de paisagens",
    followers: 1830,
    isFollowing: false,
  },
   {
    id: 5,
    username: "ana.designer",
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d',
    bio: "UI/UX Designer apaixonada por cores",
    followers: 750,
    isFollowing: false,
  },
];


export const INITIAL_STORIES: Story[] = [
    { 
        id: 'story-2', 
        author: 'nina_dev', 
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d', 
        mediaSrc: 'https://picsum.photos/id/10/1080/1920',
        mediaType: 'image',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
    },
    { 
        id: 'story-3', 
        author: 'rafael.art', 
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
        mediaSrc: 'https://picsum.photos/id/20/1080/1920',
        mediaType: 'image',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
    },
    { 
        id: 'story-4', 
        author: 'carla.codes', 
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
        mediaSrc: 'https://picsum.photos/id/30/1080/1920',
        mediaType: 'image',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString()
    },
     { 
        id: 'story-4b', 
        author: 'carla.codes', 
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
        mediaSrc: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        mediaType: 'video',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString()
    },
    { 
        id: 'story-5', 
        author: 'lucas_s', 
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
        mediaSrc: 'https://picsum.photos/id/40/1080/1920',
        mediaType: 'image',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
    },
];


export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    author: {
        id: 1,
        username: 'nina_dev',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
        isFollowing: false
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    caption: 'Um lindo pôr do sol nas montanhas. A natureza é incrível!',
    media: {
      type: 'image',
      src: 'https://picsum.photos/id/1015/800/600',
    },
    likes: 128,
    views: 1345,
    isLiked: false,
    isBookmarked: false,
    comments: [
      { id: 'comment-1-1', author: 'Visitante', text: 'Vista deslumbrante!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString() },
      { id: 'comment-1-2', author: 'Anônimo', text: 'Queria estar aí.', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
    ],
  },
  {
    id: 'post-2',
    author: {
        id: 2,
        username: 'rafael.art',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
        isFollowing: false,
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    caption: 'Um clipe rápido das ondas do mar. Tão relaxante.',
    media: {
      type: 'video',
      src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    },
    likes: 256,
    views: 5823,
    isLiked: true,
    isBookmarked: true,
    comments: [],
  },
  {
    id: 'post-3',
    author: {
        id: 3,
        username: 'carla.codes',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
        isFollowing: true,
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    caption: 'Explorando as ruas da cidade.',
    media: {
      type: 'image',
      src: 'https://picsum.photos/id/1074/800/600',
    },
    likes: 95,
    views: 876,
    isLiked: false,
    isBookmarked: false,
    comments: [
      { id: 'comment-3-1', author: 'Visitante', text: 'Ótima foto!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString() },
    ],
  },
];

export const INITIAL_SONGS: Song[] = [
    { id: 'song-1', title: 'Big Buck Bunny', artist: 'Blender Foundation', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { id: 'song-2', title: 'Elephants Dream', artist: 'Blender Foundation', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
    { id: 'song-3', title: 'For Bigger Blazes', artist: 'Google', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
    { id: 'song-4', title: 'For Bigger Escapes', artist: 'Google', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
];

export const INITIAL_USER_PROFILE: UserProfile = {
    name: 'Você',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    coverPhoto: 'https://picsum.photos/id/1018/1200/400',
    bio: 'Bem-vindo ao meu perfil! Explorando o mundo e compartilhando momentos.',
    stats: {
        posts: 0,
        followers: 1380,
        following: 210,
    },
    about: {
        location: 'São Paulo, Brasil',
        age: '28',
        interests: 'Código, Games, Fotografia Noturna',
        website: 'meusite.dev',
        extendedBio: 'Desenvolvedor apaixonado por criar interfaces futuristas e explorar o universo cyberpunk através da fotografia e da música. Sempre em busca do próximo desafio.'
    }
};