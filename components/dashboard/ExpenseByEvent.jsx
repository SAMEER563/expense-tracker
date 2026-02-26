'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';

export default function ExpenseByEvent({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card className="bg-white shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="font-heading">Expenses by Event</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">No data available</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((item) => ({
    name: item.event,
    amount: item.total,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{payload[0].payload.name}</p>
          <p className="text-gold font-medium">
            <CurrencyDisplay amount={payload[0].value} />
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="font-heading">Expenses by Event</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" fill="#C9A84C" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
