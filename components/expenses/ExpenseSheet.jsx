'use client';

import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ExpenseForm from '@/components/forms/ExpenseForm';

export default function ExpenseSheet({ open, onOpenChange, expense = null, onSuccess }) {
  const handleSubmit = async (data) => {
    try {
      const method = expense ? 'PUT' : 'POST';
      const url = expense ? `/api/expenses/${expense._id}` : '/api/expenses';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save expense');
      }

      toast.success(expense ? 'Expense updated successfully!' : 'Expense added successfully!');
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error saving expense:', error);
      toast.error('Failed to save expense. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-rose">
            {expense ? 'Edit Expense' : 'Add New Expense'}
          </DialogTitle>
          <DialogDescription>
            {expense
              ? 'Update the expense details below'
              : 'Fill in the details to add a new expense'}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <ExpenseForm
            initialData={expense ? { ...expense, date: new Date(expense.date) } : null}
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
