'use client';

import { Button } from '@/components/ui/button';

export default function EmptyState({ 
  icon = '📋', 
  title = 'No expenses found',
  description = 'Start adding expenses to track your wedding budget!',
  actionLabel = '+ Add First Expense',
  onAction 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-7xl mb-4">{icon}</div>
      <h3 className="text-2xl font-heading font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {description}
      </p>
      {onAction && (
        <Button 
          onClick={onAction}
          className="bg-gold hover:bg-gold-dark text-white"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
