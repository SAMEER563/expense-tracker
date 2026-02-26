import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Expense from '@/models/Expense';

// GET single expense
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    const expense = await Expense.findById(id);
    
    if (!expense) {
      return NextResponse.json(
        { error: 'Expense not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(expense);
  } catch (error) {
    console.error('GET /api/expenses/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch expense' },
      { status: 500 }
    );
  }
}

// PUT update expense
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    const body = await request.json();
    
    const expense = await Expense.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!expense) {
      return NextResponse.json(
        { error: 'Expense not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(expense);
  } catch (error) {
    console.error('PUT /api/expenses/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update expense' },
      { status: 500 }
    );
  }
}

// DELETE expense
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    const expense = await Expense.findByIdAndDelete(id);
    
    if (!expense) {
      return NextResponse.json(
        { error: 'Expense not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/expenses/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete expense' },
      { status: 500 }
    );
  }
}
