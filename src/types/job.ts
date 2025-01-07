export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary';
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedAt: Date;
  contact: {
    name: string;
    email: string;
  };
}