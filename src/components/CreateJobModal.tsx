import { useState } from 'react';
import { X } from 'lucide-react';
import type { JobPosting } from '../types/job';

interface CreateJobModalProps {
  onClose: () => void;
  onSubmit: (job: Omit<JobPosting, 'id' | 'postedAt'>) => void;
}

export default function CreateJobModal({ onClose, onSubmit }: CreateJobModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time' as JobPosting['type'],
    salary: '',
    description: '',
    requirements: [''],
    benefits: [''],
    contact: {
      name: '',
      email: ''
    }
  });

  // Rest of the component remains the same
}