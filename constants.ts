
import { Post, Song } from './types';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    author: 'Admin',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    caption: 'A beautiful sunset over the mountains. Nature is amazing!',
    media: {
      type: 'image',
      src: 'https://picsum.photos/id/1015/800/600',
    },
    likes: 128,
    comments: [
      { id: 'comment-1-1', author: 'Visitor', text: 'Stunning view!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString() },
      { id: 'comment-1-2', author: 'Anonymous', text: 'I wish I were there.', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
    ],
  },
  {
    id: 'post-2',
    author: 'Admin',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    caption: 'A short clip of ocean waves. So relaxing.',
    media: {
      type: 'video',
      src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    },
    likes: 256,
    comments: [],
  },
  {
    id: 'post-3',
    author: 'Admin',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    caption: 'Exploring the city streets.',
    media: {
      type: 'image',
      src: 'https://picsum.photos/id/1074/800/600',
    },
    likes: 95,
    comments: [
      { id: 'comment-3-1', author: 'Visitor', text: 'Great shot!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString() },
    ],
  },
];

export const INITIAL_SONGS: Song[] = [
    { id: 'song-1', title: 'Big Buck Bunny', artist: 'Blender Foundation', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { id: 'song-2', title: 'Elephants Dream', artist: 'Blender Foundation', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
    { id: 'song-3', title: 'For Bigger Blazes', artist: 'Google', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
    { id: 'song-4', title: 'For Bigger Escapes', artist: 'Google', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
];
