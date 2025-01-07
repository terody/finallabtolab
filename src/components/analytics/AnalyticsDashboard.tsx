import { useState, useEffect } from 'react';
import { Users, Building2, MessageSquare, TrendingUp, Eye, MousePointerClick, Clock } from 'lucide-react';
import StatsCard from './StatsCard';
import ActivityChart from './ActivityChart';
import EngagementChart from './EngagementChart';

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    avgTimeOnSite: '0:00',
    bounceRate: 0,
    clickRate: 0,
    conversionRate: 0
  });

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
          <ActivityChart />
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