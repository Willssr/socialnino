
export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export type PostType = 'image' | 'video';

export interface Post {
  id: string;
  author: string;
  authorAvatar: string;
  timestamp: string;
  caption: string;
  media: {
    type: PostType;
    src: string;
  };
  likes: number;
  isLiked: boolean; // To track liked state for the demo
  comments: Comment[];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  src: string;
}

export interface GeolocationData {
  country: string;
  city: string;
}

export interface Story {
    id: string;
    author: string;
    avatar: string;
    mediaSrc: string;
    mediaType: 'image' | 'video';
    timestamp: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  coverPhoto: string;
  bio: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

export interface Person {
    id: number;
    username: string;
    avatar: string;
    bio: string;
    followers: number;
    isFollowing: boolean;
}


export type ActivePage = 'feed' | 'music' | 'about' | 'download' | 'profile' | 'suggestions';