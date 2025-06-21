import { useState, useEffect } from 'react';
import { Users, Building2, MessageSquare, TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';
import ActivityChart from './ActivityChart';
import EngagementChart from './EngagementChart';

interface Stats {
  totalViews: number;
  totalUsers: number;
  totalMessages: number;
  totalEngagement: number;
}

const sampleActivityData = [
  { name: 'Jan', users: 400, labs: 240 },
  { name: 'Feb', users: 300, labs: 139 },
  { name: 'Mar', users: 200, labs: 980 },
  { name: 'Apr', users: 278, labs: 390 },
  { name: 'May', users: 189, labs: 480 }
];

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalViews: 0,
    totalUsers: 0,
    totalMessages: 0,
    totalEngagement: 0
  });

  useEffect(() => {
    setStats({
      totalViews: 1000,
      totalUsers: 500,
      totalMessages: 200,
      totalEngagement: 300
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard icon={Users} title="Total Users" value={stats.totalUsers} iconColor="text-blue-500" />
        <StatsCard icon={Building2} title="Total Views" value={stats.totalViews} iconColor="text-green-500" />
        <StatsCard icon={MessageSquare} title="Total Messages" value={stats.totalMessages} iconColor="text-yellow-500" />
        <StatsCard icon={TrendingUp} title="Total Engagement" value={stats.totalEngagement} iconColor="text-red-500" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
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