import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays, eachDayOfInterval } from 'date-fns';

interface VisitsChartProps {
  pageViews: any[];
}

export default function VisitsChart({ pageViews }: VisitsChartProps) {
  // Get last 7 days
  const dates = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date()
  });

  // Group page views by date and path
  const data = dates.map(date => {
    const dayViews = pageViews.filter(view => 
      format(new Date(view.timestamp), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    return {
      date: format(date, 'MMM dd'),
      total: dayViews.length,
      '/': dayViews.filter(view => view.path === '/').length,
      '/directory': dayViews.filter(view => view.path === '/directory').length,
      '/marketplace': dayViews.filter(view => view.path === '/marketplace').length,
      '/jobs': dayViews.filter(view => view.path === '/jobs').length,
    };
  });

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#3B82F6" name="Total Views" />
          <Line type="monotone" dataKey="/" stroke="#10B981" name="Home" />
          <Line type="monotone" dataKey="/directory" stroke="#6366F1" name="Directory" />
          <Line type="monotone" dataKey="/marketplace" stroke="#F59E0B" name="Marketplace" />
          <Line type="monotone" dataKey="/jobs" stroke="#EC4899" name="Jobs" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}