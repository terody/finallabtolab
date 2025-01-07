import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ActivityData {
  name: string;
  users: number;
  labs: number;
}

interface ActivityChartProps {
  data: ActivityData[];
}

export default function ActivityChart({ data }: ActivityChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Platform Activity</h2>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px]">
          <BarChart
            width={800}
            height={300}
            data={data}
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
  );
}