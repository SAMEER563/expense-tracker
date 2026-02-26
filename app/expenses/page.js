'use client';

import { useState, useEffect } from 'react';
import ExpenseFilters from '@/components/expenses/ExpenseFilters';
import ExpenseTable from '@/components/expenses/ExpenseTable';
import AddExpenseButton from '@/components/shared/AddExpenseButton';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    event: '',
    paidBy: '',
  });

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.event) params.append('event', filters.event);
      if (filters.paidBy) params.append('paidBy', filters.paidBy);
      params.append('limit', '100'); // Show more results

      const response = await fetch(`/api/expenses?${params.toString()}`);
      const data = await response.json();
      setExpenses(data.expenses);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-rose mb-2">
          All Expenses
        </h1>
        <p className="text-gray-600">
          View, filter, and manage all your wedding expenses
        </p>
      </div>

      {/* Filters */}
      <ExpenseFilters filters={filters} onFiltersChange={setFilters} />

      {/* Table */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ExpenseTable
          expenses={expenses}
          pagination={pagination}
          onRefresh={fetchExpenses}
        />
      )}

      {/* Floating Add Button */}
      <AddExpenseButton onSuccess={fetchExpenses} />
    </div>
  );
}
