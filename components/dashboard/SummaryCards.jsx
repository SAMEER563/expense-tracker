import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';

export default function SummaryCards({ summary }) {
  const cards = [
    {
      title: '💰 Total Expenses',
      value: <CurrencyDisplay amount={summary.totalAmount} className="text-3xl font-bold text-gold" />,
      description: 'Total wedding expenses',
    },
    {
      title: '📋 Total Transactions',
      value: <span className="text-3xl font-bold text-rose">{summary.totalTransactions}</span>,
      description: 'Number of expenses recorded',
    },
    {
      title: '🏆 Most Expensive Event',
      value: (
        <span className="text-2xl font-semibold text-gray-800">
          {summary.mostExpensiveEvent || 'N/A'}
        </span>
      ),
      description: summary.byEvent[0] ? (
        <CurrencyDisplay amount={summary.byEvent[0].total} className="text-sm text-gray-600" />
      ) : 'No data',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-1">{card.value}</div>
            <p className="text-xs text-gray-500">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
