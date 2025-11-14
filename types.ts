
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
}

export type ActivePage = 'feed' | 'music' | 'about';