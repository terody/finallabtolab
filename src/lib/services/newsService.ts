import axios from 'axios';
import type { NewsArticle } from '../../types/news';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2940';

export async function fetchNews() {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  
  const response = await axios.get('https://newsapi.org/v2/everything', {
    params: {
      q: 'laboratory medical diagnostics',
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: 10,
      apiKey
    }
  });

  if (response.status === 429) {
    throw new Error('API rate limit reached. Please try again later.');
  }

  if (!response.data?.articles) {
    throw new Error('Invalid response format');
  }

  return response.data.articles.map((article: any): NewsArticle => ({
    id: btoa(article.url),
    title: article.title || 'Untitled',
    description: article.description || 'No description available',
    url: article.url || '#',
    imageUrl: article.urlToImage || FALLBACK_IMAGE,
    source: article.source?.name || 'Unknown Source',
    publishedAt: article.publishedAt || new Date().toISOString(),
    author: article.author || 'Unknown Author',
    comments: []
  }));
}