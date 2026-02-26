'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import ExpenseSheet from '@/components/expenses/ExpenseSheet';
import DeleteDialog from '@/components/expenses/DeleteDialog';
import EmptyState from '@/components/shared/EmptyState';

export default function ExpenseTable({ expenses, pagination, onRefresh }) {
  const [editExpense, setEditExpense] = useState(null);
  const [deleteExpense, setDeleteExpense] = useState(null);

  if (!expenses || expenses.length === 0) {
    return (
      <EmptyState
        icon="📋"
        title="No expenses found"
        description="Try adjusting your filters or add a new expense to get started."
        actionLabel="+ Add Expense"
      />
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Paid By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense._id}>
                  <TableCell className="font-medium">
                    {expense.title}
                    {expense.notes && (
                      <p className="text-xs text-gray-500 mt-1">{expense.notes}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <CurrencyDisplay amount={expense.amount} className="text-gold font-semibold" />
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {expense.event}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{expense.paidBy}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {format(new Date(expense.date), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditExpense(expense)}
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteExpense(expense)}
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Info */}
        {pagination && (
          <div className="px-6 py-4 border-t text-sm text-gray-600">
            Showing {expenses.length} of {pagination.total} expenses
          </div>
        )}
      </div>

      {/* Edit Sheet */}
      {editExpense && (
        <ExpenseSheet
          open={!!editExpense}
          onOpenChange={(open) => !open && setEditExpense(null)}
          expense={editExpense}
          onSuccess={() => {
            setEditExpense(null);
            onRefresh();
          }}
        />
      )}

      {/* Delete Dialog */}
      {deleteExpense && (
        <DeleteDialog
          open={!!deleteExpense}
          onOpenChange={(open) => !open && setDeleteExpense(null)}
          expense={deleteExpense}
          onSuccess={() => {
            setDeleteExpense(null);
            onRefresh();
          }}
        />
      )}
    </>
  );
}
