import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { format } from 'date-fns';

export default function RecentTransactions({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return (
      <Card className="bg-white shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="font-heading">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">No recent transactions</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="font-heading">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Paid By</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense._id}>
                  <TableCell className="font-medium">{expense.title}</TableCell>
                  <TableCell>
                    <CurrencyDisplay amount={expense.amount} className="text-gold font-semibold" />
                  </TableCell>
                  <TableCell>{expense.event}</TableCell>
                  <TableCell>{expense.paidBy}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {format(new Date(expense.date), 'MMM dd, yyyy')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
