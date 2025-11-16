





export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export type PostType = 'image' | 'video';

export interface PostAuthor {
    id: number;
    username: string;
    avatar: string;
    isFollowing: boolean;
}

export interface Post {
  id: string;
  author: PostAuthor;
  timestamp: string;
  caption: string;
  media: {
    type: PostType;
    src: string;
  };
  likes: number;
  isLiked: boolean; // To track liked state for the demo
  isBookmarked: boolean;
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

export type NotificationType = 'like' | 'comment' | 'follow';

export interface Notification {
  id: string;
  type: NotificationType;
  user: {
    username: string;
    avatar: string;
  };
  postPreview?: string; // for likes and comments
  timestamp: string;
  read: boolean;
}


export type ActivePage = 'feed' | 'music' | 'search' | 'profile' | 'suggestions' | 'download' | 'friends' | 'chat';

export type PointsEvent =
  | "LIKE"
  | "COMMENT"
  | "POST"
  | "FOLLOW"
  | "CHALLENGE"
  | "QUIZ";

export interface Track {
  id: number | string;
  title: string;
  artist: string;
  cover: string;
  src: string;
}

export interface ChatMessage {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string; // can be text or a sticker URL
  type: 'text' | 'sticker';
  timestamp: string;
}