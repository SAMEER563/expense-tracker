'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { EVENTS, DEFAULT_MEMBERS } from '@/lib/constants';
import { Search, X } from 'lucide-react';

export default function ExpenseFilters({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      search: '',
      event: '',
      paidBy: '',
    });
  };

  const hasActiveFilters =
    filters.search || filters.event || filters.paidBy;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <Label htmlFor="search" className="text-sm text-gray-600">
            Search
          </Label>
          <div className="relative mt-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search title or notes..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Event Filter */}
        <div>
          <Label className="text-sm text-gray-600">Event</Label>
          <Select
            value={filters.event || 'all'}
            onValueChange={(val) => handleFilterChange('event', val === 'all' ? '' : val)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="All Events" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              {EVENTS.map((event) => (
                <SelectItem key={event.name} value={event.name}>
                  {event.emoji} {event.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Paid By Filter */}
        <div>
          <Label className="text-sm text-gray-600">Paid By</Label>
          <Select
            value={filters.paidBy || 'all'}
            onValueChange={(val) => handleFilterChange('paidBy', val === 'all' ? '' : val)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="All Members" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Members</SelectItem>
              {DEFAULT_MEMBERS.map((member) => (
                <SelectItem key={member} value={member}>
                  {member}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            className="text-gray-600"
          >
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
