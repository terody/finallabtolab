import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import type { Post } from '../types/forum';
import TimeAgo from './TimeAgo';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  onEdit: (postId: string, newContent: string) => void;
  onDelete: (postId: string) => void;
  currentUserId: string;
}

export default function PostCard({ post, onLike, onComment, onEdit, onDelete, currentUserId }: PostCardProps) {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const isOwner = post.userId === currentUserId;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
      setShowCommentInput(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleSaveEdit = () => {
    if (editedContent.trim() && editedContent !== post.content) {
      onEdit(post.id, editedContent);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete(post.id);
    }
    setShowMenu(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
      {/* Post Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <img
            src={post.userAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
            alt={post.userName}
            className="w-12 h-12 rounded-full"
          />
          <div className="ml-3">
            <h3 className="font-semibold text-gray-900">{post.userName}</h3>
            <TimeAgo date={post.createdAt} className="text-sm text-gray-500" />
          </div>
        </div>
        {isOwner && (
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-400 hover:text-gray-600"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button
                    onClick={handleEdit}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Post
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Post
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="mb-4">
        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
            {post.tags && (
              <div className="mt-2 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between py-2 border-t border-b border-gray-200">
        <button
          onClick={() => onLike(post.id)}
          className="flex items-center space-x-2 text-gray-500 hover:text-red-500"
        >
          <Heart className={`h-5 w-5 ${post.likes > 0 ? 'fill-red-500 text-red-500' : ''}`} />
          <span>{post.likes}</span>
        </button>
        <button
          onClick={() => setShowCommentInput(!showCommentInput)}
          className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"
        >
          <MessageCircle className="h-5 w-5" />
          <span>{post.comments.length}</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500">
          <Share2 className="h-5 w-5" />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showCommentInput && (
        <form onSubmit={handleSubmitComment} className="mt-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
          />
          <div className="mt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowCommentInput(false)}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Comment
            </button>
          </div>
        </form>
      )}

      {/* Comments List */}
      {post.comments.length > 0 && (
        <div className="mt-4 space-y-4">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <img
                src={comment.userAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                alt={comment.userName}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1 bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{comment.userName}</h4>
                  <TimeAgo date={comment.createdAt} className="text-xs text-gray-500" />
                </div>
                <p className="text-sm text-gray-800 mt-1">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}