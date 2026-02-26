'use client';

import { useState, useEffect } from 'react';
import SummaryCards from '@/components/dashboard/SummaryCards';
import ExpenseByEvent from '@/components/dashboard/ExpenseByEvent';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import AddExpenseButton from '@/components/shared/AddExpenseButton';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import EmptyState from '@/components/shared/EmptyState';

export default function Home() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    try {
      const response = await fetch('/api/summary');
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error('Failed to fetch summary:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!summary || summary.totalTransactions === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          icon="💸"
          title="Welcome to Wedding Expense Tracker!"
          description="You haven't added any expenses yet. Click the button below to get started tracking your wedding expenses."
        />
        <AddExpenseButton onSuccess={fetchSummary} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-rose mb-3">
          💍 Wedding Expense Tracker
        </h1>
        <p className="text-gray-600 text-lg">
          Track and manage all your wedding expenses beautifully
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards summary={summary} />

      {/* Charts Grid */}
      <div className="mb-8">
        <ExpenseByEvent data={summary.byEvent} />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions expenses={summary.recentExpenses} />

      {/* Floating Add Button */}
      <AddExpenseButton onSuccess={fetchSummary} />
    </div>
  );
}
