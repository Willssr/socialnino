
import { Post, Song, Story, UserProfile } from './types';

export const INITIAL_STORIES: Story[] = [
    { id: 'story-1', author: 'Você', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: 'story-2', author: 'nina_dev', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
    { id: 'story-3', author: 'rafael.art', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
    { id: 'story-4', author: 'carla.codes', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d' },
    { id: 'story-5', author: 'lucas_s', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d' },
    { id: 'story-6', author: 'beatriz_m', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d' },
    { id: 'story-7', author: 'andre.js', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026710d' },
];


export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    author: 'nina_dev',
    authorAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    caption: 'Um lindo pôr do sol nas montanhas. A natureza é incrível!',
    media: {
      type: 'image',
      src: 'https://picsum.photos/id/1015/800/600',
    },
    likes: 128,
    isLiked: false,
    comments: [
      { id: 'comment-1-1', author: 'Visitante', text: 'Vista deslumbrante!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString() },
      { id: 'comment-1-2', author: 'Anônimo', text: 'Queria estar aí.', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
    ],
  },
  {
    id: 'post-2',
    author: 'rafael.art',
    authorAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    caption: 'Um clipe rápido das ondas do mar. Tão relaxante.',
    media: {
      type: 'video',
      src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    },
    likes: 256,
    isLiked: true,
    comments: [],
  },
  {
    id: 'post-3',
    author: 'carla.codes',
    authorAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    caption: 'Explorando as ruas da cidade.',
    media: {
      type: 'image',
      src: 'https://picsum.photos/id/1074/800/600',
    },
    likes: 95,
    isLiked: false,
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
    name: 'SocialNino User',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    coverPhoto: 'https://picsum.photos/id/1018/1200/400',
    bio: 'Bem-vindo ao meu perfil! Explorando o mundo e compartilhando momentos.',
};