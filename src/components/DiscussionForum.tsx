import { useState } from 'react';
import PostCard from './PostCard';
import type { Post } from '../types/forum';

interface DiscussionForumProps {
  currentUserId: string;
}

export default function DiscussionForum({ currentUserId }: DiscussionForumProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostContent.trim()) {
      const newPost: Post = {
        id: Date.now().toString(),
        userId: currentUserId,
        userName: 'Current User', // Replace with actual user name
        content: newPostContent,
        createdAt: new Date(),
        likes: 0,
        comments: [],
        tags: []
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
    }
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleComment = (postId: string, comment: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: [...post.comments, {
              id: Date.now().toString(),
              userId: currentUserId,
              userName: 'Current User', // Replace with actual user name
              content: comment,
              createdAt: new Date(),
              likes: 0
            }]
          }
        : post
    ));
  };

  const handleEdit = (postId: string, newContent: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, content: newContent }
        : post
    ));
  };

  const handleDelete = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleCreatePost} className="bg-white rounded-lg shadow-sm p-6">
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Share your thoughts, questions, or insights..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Post
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
            onEdit={handleEdit}
            onDelete={handleDelete}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
}