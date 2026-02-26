import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Expense from '@/models/Expense';

// GET all expenses with optional filters
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    
    // Build query based on filters
    const query = {};
    
    if (searchParams.get('event')) {
      query.event = searchParams.get('event');
    }
    
    if (searchParams.get('paidBy')) {
      query.paidBy = searchParams.get('paidBy');
    }
    
    // Date range filter
    if (searchParams.get('startDate') || searchParams.get('endDate')) {
      query.date = {};
      if (searchParams.get('startDate')) {
        query.date.$gte = new Date(searchParams.get('startDate'));
      }
      if (searchParams.get('endDate')) {
        query.date.$lte = new Date(searchParams.get('endDate'));
      }
    }
    
    // Search in title and notes
    if (searchParams.get('search')) {
      const searchTerm = searchParams.get('search');
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { notes: { $regex: searchTerm, $options: 'i' } },
      ];
    }
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Execute query
    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Expense.countDocuments(query);
    
    return NextResponse.json({
      expenses,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /api/expenses error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch expenses' },
      { status: 500 }
    );
  }
}

// POST new expense
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const { title, amount, event, paidBy, date } = body;
    
    if (!title || !amount || !event || !paidBy || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const expense = await Expense.create(body);
    
    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    console.error('POST /api/expenses error:', error);
    return NextResponse.json(
      { error: 'Failed to create expense' },
      { status: 500 }
    );
  }
}
