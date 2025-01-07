import { useState, useEffect } from 'react';
import { ExternalLink, Calendar, Clock, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import NewsComments from './NewsComments';
import { fetchNews } from '../lib/services/newsService';
import type { NewsArticle } from '../types/news';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2940';

export default function IndustryNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadNews = async () => {
      try {
        const articles = await fetchNews();
        if (mounted) {
          setNews(articles);
          setError('');
        }
      } catch (err: any) {
        if (mounted) {
          console.error('Failed to fetch news:', err);
          setError(err.message || 'Failed to fetch news. Please try again later.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadNews();

    return () => {
      mounted = false;
    };
  }, []);

  const handleAddComment = (articleId: string, comment: string) => {
    setNews(news.map(article => {
      if (article.id === articleId) {
        return {
          ...article,
          comments: [
            ...article.comments,
            {
              id: Date.now().toString(),
              content: comment,
              author: 'Current User',
              createdAt: new Date(),
              likes: 0
            }
          ]
        };
      }
      return article;
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Latest Industry News</h2>
        <p className="text-gray-600 mt-2">Stay updated with the latest developments in laboratory science</p>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid gap-8">
        {news.map((article) => (
          <article key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  src={article.imageUrl || FALLBACK_IMAGE}
                  alt={article.title}
                  className="h-48 w-full md:w-48 object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = FALLBACK_IMAGE;
                    img.onerror = null;
                  }}
                />
              </div>
              <div className="p-6 flex-grow">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{format(new Date(article.publishedAt), 'MMM d, yyyy')}</span>
                  <Clock className="h-4 w-4 ml-4 mr-1" />
                  <span>{format(new Date(article.publishedAt), 'h:mm a')}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {article.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {article.source}
                    {article.author && ` • ${article.author}`}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setSelectedArticle(selectedArticle?.id === article.id ? null : article)}
                      className="inline-flex items-center text-gray-600 hover:text-blue-600"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span>{article.comments.length} Comments</span>
                    </button>
                    
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700"
                    >
                      Read more
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>

                {selectedArticle?.id === article.id && (
                  <div className="mt-6 pt-6 border-t">
                    <NewsComments
                      comments={article.comments}
                      onAddComment={(comment) => handleAddComment(article.id, comment)}
                    />
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}