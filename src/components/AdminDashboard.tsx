import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { Users, Eye, MessageSquare, TrendingUp, Briefcase, Building2, Settings } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ContactMessage, UserProfile } from '../types/user';

const sampleData = {
  visitors: [
    { name: 'Jan', count: 400 },
    { name: 'Feb', count: 300 },
    { name: 'Mar', count: 600 },
  ],
  posts: [
    { name: 'Jan', discussions: 40, jobs: 20 },
    { name: 'Feb', discussions: 30, jobs: 25 },
    { name: 'Mar', discussions: 60, jobs: 35 },
  ]
};

export default function AdminDashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [admins, setAdmins] = useState<UserProfile[]>([]);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [stats, setStats] = useState({
    totalUsers: 245,
    totalLabs: 45,
    totalPosts: 89,
    conversionRate: 12
  });

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'admin');

      if (!error && data) {
        setAdmins(data);
      }
    };

    fetchAdmins();
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'admin', permissions: {
          canManageUsers: true,
          canManageLabs: true,
          canManageContent: true,
          canViewAnalytics: true,
          canManageJobs: true,
          canManageMarketplace: true
        }})
        .eq('email', newAdminEmail);

      if (error) throw error;
      setNewAdminEmail('');
      setShowAddAdmin(false);
      // Refresh admin list
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'admin');
      if (data) setAdmins(data);
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setShowAddAdmin(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Settings className="h-5 w-5" />
          <span>Manage Admins</span>
        </button>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        {/* ... (rest of the stats cards) ... */}
      </div>

      {/* Admin Management Modal */}
      {showAddAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Manage Administrators</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Current Administrators</h3>
              <div className="space-y-2">
                {admins.map((admin) => (
                  <div key={admin.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">{admin.name}</p>
                      <p className="text-sm text-gray-600">{admin.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleAddAdmin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Add New Administrator
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddAdmin(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Administrator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rest of the dashboard components */}
      {/* ... Analytics Charts ... */}
      {/* ... Messages Section ... */}
    </div>
  );
}