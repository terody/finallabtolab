export interface NewsComment {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  likes: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  source: string;
  publishedAt: string;
  author?: string;
  comments: NewsComment[];
}