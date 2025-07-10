import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import LabClicksChart from "../components/analytics/LabClicksChart";
import VisitsChart from "../components/analytics/VisitsChart";
import { useAuth } from "../hooks/useAuth";
import { getAnalytics } from "../lib/analytics";

export default function AdminDashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<any>({
    pageViews: [],
    labClicks: [],
  });

  useEffect(() => {
    if (profile?.role !== "admin") {
      navigate("/");
    }
  }, [profile, navigate]);

  useEffect(() => {
    async function loadAnalytics() {
      const data = await getAnalytics();
      setAnalytics(data);
    }
    loadAnalytics();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">Track website traffic and engagement</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            Page Views (Last 7 Days)
          </h2>
          <VisitsChart pageViews={analytics.pageViews} />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Lab Profile Views</h2>
          <LabClicksChart labClicks={analytics.labClicks} />
        </div>
      </div>
    </DashboardLayout>
  );
}
