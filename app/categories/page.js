'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { CATEGORIES } from '@/lib/constants';

export default function CategoriesPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchSummary();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Create a map of category totals from summary
  const categoryTotals = {};
  summary?.byCategory?.forEach((item) => {
    categoryTotals[item.category] = { total: item.total, count: item.count };
  });

  // Find max total for progress bar calculation
  const maxTotal = Math.max(
    ...Object.values(categoryTotals).map((c) => c.total),
    1
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-rose mb-2">
          Expense Categories
        </h1>
        <p className="text-gray-600">
          View expenses breakdown by category
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((category) => {
          const categoryData = categoryTotals[category.name] || { total: 0, count: 0 };
          const percentage = (categoryData.total / maxTotal) * 100;

          return (
            <Link
              key={category.name}
              href={`/expenses?category=${encodeURIComponent(category.name)}`}
            >
              <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl">{category.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-lg text-gray-800 mb-1">
                        {category.name}
                      </h3>
                      <CurrencyDisplay
                        amount={categoryData.total}
                        className="text-gold font-bold text-xl"
                      />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-linear-to-r from-gold to-rose h-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{categoryData.count} transactions</span>
                      <span>{percentage.toFixed(0)}% of max</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
