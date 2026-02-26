'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExpenseSheet from '@/components/expenses/ExpenseSheet';

export default function AddExpenseButton({ onSuccess }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gold hover:bg-gold-dark text-white shadow-lg hover:shadow-xl transition-all z-40"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>
      
      <ExpenseSheet
        open={isOpen}
        onOpenChange={setIsOpen}
        onSuccess={() => {
          setIsOpen(false);
          if (onSuccess) onSuccess();
        }}
      />
    </>
  );
}
