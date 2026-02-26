'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { EVENTS, DEFAULT_MEMBERS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const expenseSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  amount: z.coerce.number().positive('Amount must be greater than 0'),
  event: z.string().min(1, 'Please select an event'),
  paidBy: z.string().min(1, 'Please enter who paid'),
  date: z.date({ required_error: 'Date is required' }),
  notes: z.string().optional(),
});

export default function ExpenseForm({ initialData, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: initialData || {
      title: '',
      amount: '',
      event: '',
      paidBy: '',
      date: new Date(),
      notes: '',
    },
  });

  const selectedDate = watch('date');
  const selectedEvent = watch('event');
  const selectedPaidBy = watch('paidBy');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          {...register('title')}
          placeholder="e.g., Venue Booking"
          className="mt-1"
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Amount */}
      <div>
        <Label htmlFor="amount">Amount (₹) *</Label>
        <Input
          id="amount"
          type="number"
          {...register('amount')}
          placeholder="e.g., 50000"
          className="mt-1"
        />
        {errors.amount && (
          <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <Label>Event *</Label>
        <Select value={selectedEvent} onValueChange={(val) => setValue('event', val)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select event" />
          </SelectTrigger>
          <SelectContent>
            {EVENTS.map((event) => (
              <SelectItem key={event.name} value={event.name}>
                {event.emoji} {event.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.event && (
          <p className="text-sm text-red-500 mt-1">{errors.event.message}</p>
        )}
      </div>

      {/* Paid By */}
      <div>
        <Label>Paid By *</Label>
        <Select value={selectedPaidBy} onValueChange={(val) => setValue('paidBy', val)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select who paid" />
          </SelectTrigger>
          <SelectContent>
            {DEFAULT_MEMBERS.map((member) => (
              <SelectItem key={member} value={member}>
                {member}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.paidBy && (
          <p className="text-sm text-red-500 mt-1">{errors.paidBy.message}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <Label>Date *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal mt-1',
                !selectedDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => setValue('date', date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.date && (
          <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>
        )}
      </div>

      {/* Notes */}
      <div>
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          {...register('notes')}
          placeholder="Additional details..."
          className="mt-1"
          rows={3}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-gold hover:bg-gold-dark text-white"
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Add Expense'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
