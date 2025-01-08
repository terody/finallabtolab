import { useState, useEffect } from 'react';
import { Users, Building2, MessageSquare, TrendingUp, Eye, MousePointerClick, Clock } from 'lucide-react';
import StatsCard from './StatsCard';
import ActivityChart from './ActivityChart';
import EngagementChart from './EngagementChart';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../lib/auth';
import type { UserRole } from '../types/user';

const sampleActivityData = [
  { name: 'Jan', users: 400, labs: 240 },
  { name: 'Feb', users: 300, labs: 139 },
  { name: 'Mar', users: 200, labs: 980 },
  { name: 'Apr', users: 278, labs: 390 },
  { name: 'May', users: 189, labs: 480 },
const AnalyticsDashboard = () => {
  const [stats, setStats] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    avgTimeOnSite: '0:00',
    bounceRate: 0,
    clickRate: 0,
    conversionRate: 0
  });

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'professional' as UserRole,
    title: '',
    company: '',
    certifications: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: signUpError } = await signUp(
      formData.email,
      formData.password,
      {
        name: formData.name,
        role: formData.role,
        title: formData.title,
        company: formData.company,
        certifications: formData.certifications
      }
    );

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    navigate('/login', { 
      state: { message: 'Registration successful! Please log in with your credentials.' }
    });
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalViews: prev.totalViews + Math.floor(Math.random() * 5),
        uniqueVisitors: prev.uniqueVisitors + Math.floor(Math.random() * 3),
        avgTimeOnSite: `${Math.floor(Math.random() * 5)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        bounceRate: 35 + Math.floor(Math.random() * 10),
        clickRate: 15 + Math.floor(Math.random() * 5),
        conversionRate: 8 + Math.floor(Math.random() * 4)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const statsCards = [
    {
      title: 'Total Page Views',
      value: stats.totalViews,
      icon: Eye,
      iconColor: 'text-blue-600'
    },
    {
      title: 'Unique Visitors',
      value: stats.uniqueVisitors,
      icon: Users,
      iconColor: 'text-green-600'
    },
    {
      title: 'Avg. Time on Site',
      value: stats.avgTimeOnSite,
      icon: Clock,
      iconColor: 'text-purple-600'
    },
    {
      title: 'Click Rate',
      value: `${stats.clickRate}%`,
      icon: MousePointerClick,
      iconColor: 'text-yellow-600'
    },
    {
      title: 'Bounce Rate',
      value: `${stats.bounceRate}%`,
      icon: TrendingUp,
      iconColor: 'text-red-600'
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: Building2,
      iconColor: 'text-indigo-600'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((card, index) => (
          <StatsCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            iconColor={card.iconColor}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">User Activity</h3>
          <ActivityChart data={sampleActivityData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">User Engagement</h3>
          <EngagementChart />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;