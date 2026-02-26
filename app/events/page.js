'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { EVENTS } from '@/lib/constants';

const EVENT_GRADIENTS = {
  Chheka: 'from-amber-300 to-amber-500',
  Mehendi: 'from-green-300 to-green-500',
  Haldi: 'from-yellow-300 to-yellow-500',
  Wedding: 'from-pink-300 to-pink-500',
  Reception: 'from-purple-300 to-purple-500',
};

export default function EventsPage() {
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

  // Create a map of event totals from summary
  const eventTotals = {};
  summary?.byEvent?.forEach((item) => {
    eventTotals[item.event] = { total: item.total, count: item.count };
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-rose mb-2">
          Wedding Events
        </h1>
        <p className="text-gray-600">
          View expenses breakdown by each wedding event
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EVENTS.map((event) => {
          const eventData = eventTotals[event.name] || { total: 0, count: 0 };

          return (
            <Link key={event.name} href={`/expenses?event=${encodeURIComponent(event.name)}`}>
              <Card
                className={`cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-linear-to-br ${
                  EVENT_GRADIENTS[event.name]
                } border-0`}
              >
                <CardContent className="p-8 text-white">
                  <div className="text-6xl mb-4 text-center">{event.emoji}</div>
                  <h2 className="text-2xl font-heading font-bold text-center mb-3">
                    {event.name}
                  </h2>
                  <div className="bg-white/90 rounded-lg p-4 text-gray-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Total Spent:</span>
                      <CurrencyDisplay
                        amount={eventData.total}
                        className="text-lg font-bold text-gold"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Transactions:</span>
                      <span className="text-lg font-bold text-rose">{eventData.count}</span>
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
