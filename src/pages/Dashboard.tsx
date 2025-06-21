import { Building2, MessageSquare, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../hooks/useAuth";

const sampleData = {
  stats: {
    totalUsers: 245,
    totalLabs: 45,
    totalPosts: 89,
    conversionRate: 12,
  },
  activityData: [
    { name: "Jan", users: 400, labs: 240 },
    { name: "Feb", users: 300, labs: 139 },
    { name: "Mar", users: 200, labs: 980 },
    { name: "Apr", users: 278, labs: 390 },
    { name: "May", users: 189, labs: 480 },
  ],
};

export default function Dashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(sampleData.stats);
  const [activityData, setActivityData] = useState(sampleData.activityData);

  useEffect(() => {
    if (profile?.role !== "admin") {
      navigate("/");
    }
  }, [profile, navigate]);

  return (
    <DashboardLayout>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Registered Labs</p>
              <p className="text-2xl font-bold">{stats.totalLabs}</p>
            </div>
            <Building2 className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Posts</p>
              <p className="text-2xl font-bold">{stats.totalPosts}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold">{stats.conversionRate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Platform Activity</h2>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px]">
            <BarChart
              width={800}
              height={300}
              data={activityData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#3B82F6" name="New Users" />
              <Bar dataKey="labs" fill="#10B981" name="New Labs" />
            </BarChart>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
