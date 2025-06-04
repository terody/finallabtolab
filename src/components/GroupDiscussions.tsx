import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { Group } from '../types/group';
import type { Post } from '../types/forum';
import PostCard from './PostCard';

interface GroupDiscussionsProps {
  group: Group;
  onBack: () => void;
  currentUserId: string;
}

export default function GroupDiscussions({ group, onBack, currentUserId }: GroupDiscussionsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostContent.trim()) {
      const newPost: Post = {
        id: Date.now().toString(),
        userId: currentUserId,
        userName: 'Current User',
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
              userName: 'Current User',
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
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{group.name}</h2>
          <p className="text-gray-600">Group Discussions</p>
        </div>
      </div>

      <form onSubmit={handleCreatePost} className="bg-white rounded-lg shadow-sm p-6">
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Start a discussion..."
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