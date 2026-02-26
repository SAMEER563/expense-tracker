import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Expense from '@/models/Expense';

export async function GET() {
  try {
    await connectDB();

    // Get total amount and transaction count
    const totalStats = await Expense.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          totalTransactions: { $sum: 1 },
        },
      },
    ]);

    // Get expenses by event
    const byEvent = await Expense.aggregate([
      {
        $group: {
          _id: '$event',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          event: '$_id',
          total: 1,
          count: 1,
        },
      },
      { $sort: { total: -1 } },
    ]);

    // Get expenses by member
    const byMember = await Expense.aggregate([
      {
        $group: {
          _id: '$paidBy',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          paidBy: '$_id',
          total: 1,
          count: 1,
        },
      },
      { $sort: { total: -1 } },
    ]);

    // Get recent expenses
    const recentExpenses = await Expense.find()
      .sort({ date: -1 })
      .limit(10)
      .lean();

    // Prepare summary data
    const summary = {
      totalAmount: totalStats[0]?.totalAmount || 0,
      totalTransactions: totalStats[0]?.totalTransactions || 0,
      byEvent,
      byMember,
      mostExpensiveEvent: byEvent[0]?.event || null,
      recentExpenses,
    };

    return NextResponse.json(summary);
  } catch (error) {
    console.error('GET /api/summary error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch summary' },
      { status: 500 }
    );
  }
}
