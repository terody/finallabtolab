import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '00:00', clicks: 65, views: 120, engagement: 85 },
  { name: '04:00', clicks: 75, views: 140, engagement: 90 },
  { name: '08:00', clicks: 95, views: 180, engagement: 95 },
  { name: '12:00', clicks: 125, views: 230, engagement: 100 },
  { name: '16:00', clicks: 150, views: 280, engagement: 110 },
  { name: '20:00', clicks: 135, views: 260, engagement: 105 },
];

const EngagementChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="clicks" stroke="#3B82F6" name="Clicks" />
        <Line type="monotone" dataKey="views" stroke="#10B981" name="Views" />
        <Line type="monotone" dataKey="engagement" stroke="#8B5CF6" name="Engagement Score" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EngagementChart;