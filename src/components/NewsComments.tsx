import { useState } from 'react';
import { format } from 'date-fns';
import { Heart } from 'lucide-react';
import type { NewsComment } from '../types/news';

interface NewsCommentsProps {
  comments: NewsComment[];
  onAddComment: (comment: string) => void;
}

export default function NewsComments({ comments, onAddComment }: NewsCommentsProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts about this article..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Comment
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt={comment.author}
              className="h-8 w-8 rounded-full"
            />
            <div className="flex-1 bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-900">{comment.author}</span>
                  <span className="text-gray-500 text-sm ml-2">
                    {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-red-500">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1 text-gray-600">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}