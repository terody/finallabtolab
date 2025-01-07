import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { orangeCountyLabs } from '../../data/orangeCountyLabs';

interface LabClicksChartProps {
  labClicks: any[];
}

export default function LabClicksChart({ labClicks }: LabClicksChartProps) {
  const data = orangeCountyLabs.map(lab => ({
    name: lab.name,
    clicks: labClicks.filter(click => click.lab_id === lab.id).length
  }));

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="clicks" fill="#3B82F6" name="Lab Profile Clicks" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}