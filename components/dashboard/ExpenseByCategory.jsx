'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CHART_COLORS } from '@/lib/constants';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';

export default function ExpenseByCategory({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card className="bg-white shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="font-heading">Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">No data available</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((item) => ({
    name: item.category,
    value: item.total,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{payload[0].name}</p>
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
        <CardTitle className="font-heading">Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
