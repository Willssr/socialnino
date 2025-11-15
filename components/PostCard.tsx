import React, { useState } from "react";
import { Post } from "../types";

type Props = {
  post: Post;
  handleLike: (postId: string) => void;
  handleComment: (postId: string, text: string) => void;
  currentUserName: string;
  handleToggleFollow: (personId: number) => void;
  handleBookmark: (postId: string) => void;

  // 👇 ADICIONADO
  onOpenProfile: (username: string) => void;
};

const PostCard: React.FC<Props> = ({
  post,
  handleLike,
  handleComment,
  currentUserName,
  handleToggleFollow,
  handleBookmark,
  onOpenProfile,
}) => {
  const [commentText, setCommentText] = useState("");

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-3">
      {/* HEADER DO POST */}
      <div className="flex items-center space-x-3 mb-3">
        <img
          src={post.author.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          onClick={() => onOpenProfile(post.author.username)} // ← abrir perfil
        />
        <div>
          <p
            className="font-semibold cursor-pointer"
            onClick={() => onOpenProfile(post.author.username)}
          >
            {post.author.username}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(post.timestamp).toLocaleString()}
          </p>
        </div>
      </div>

      {/* MÍDIA */}
      {post.media?.type === "image" ? (
        <img
          src={post.media.src}
          alt="post"
          className="w-full rounded-md"
        />
      ) : (
        <video
          src={post.media.src}
          controls
          className="w-full rounded-md"
        />
      )}

      {/* AÇÕES */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex space-x-4">
          <button onClick={() => handleLike(post.id)}>❤️ {post.likes}</button>
          <button onClick={() => handleBookmark(post.id)}>
            🔖 {post.isBookmarked ? "Salvo" : "Salvar"}
          </button>
        </div>
      </div>

      {/* DESCRIÇÃO */}
      <p className="mt-2">{post.caption}</p>

      {/* COMENTÁRIOS */}
      <div className="mt-3">
        {post.comments?.map((c) => (
          <p key={c.id} className="text-sm">
            <strong>{c.author}:</strong> {c.text}
          </p>
        ))}
      </div>

      {/* INPUT DE COMENTÁRIO */}
      <div className="mt-3 flex">
        <input
          type="text"
          value={commentText}
          placeholder="Adicionar comentário..."
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-grow border rounded-l px-2 py-1"
        />
        <button
          onClick={() => {
            if (commentText.trim()) {
              handleComment(post.id, commentText);
              setCommentText("");
            }
          }}
          className="bg-blue-500 text-white px-3 rounded-r"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default PostCard;
