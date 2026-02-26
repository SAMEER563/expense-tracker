import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount must be greater than or equal to 0'],
    },
    event: {
      type: String,
      required: [true, 'Event is required'],
    },
    paidBy: {
      type: String,
      required: [true, 'Paid by is required'],
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
ExpenseSchema.index({ event: 1, date: -1 });

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
