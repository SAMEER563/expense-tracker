'use client';

import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { EVENTS } from '@/lib/constants';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function PdfDownloadDialog() {
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/expenses?limit=1000');
        const data = await response.json();
        const uniqueMembers = [...new Set(data.expenses.map((e) => e.paidBy))];
        setMembers(uniqueMembers.sort());
      } catch (error) {
        console.error('Failed to fetch members:', error);
      }
    };

    if (open) {
      fetchMembers();
    }
  }, [open]);

const generatePDF = async () => {
  if (!event || !paidBy) {
    alert('Please select both Event and Paid By fields');
    return;
  }

  setLoading(true);

  try {
    const params = new URLSearchParams({
      event,
      paidBy,
      limit: '1000',
    });

    const response = await fetch(`/api/expenses?${params.toString()}`);
    const data = await response.json();
    const expenses = data.expenses;

    if (!expenses || expenses.length === 0) {
      alert('No expenses found for the selected filters');
      setLoading(false);
      return;
    }

    const total = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );

    const doc = new jsPDF();

    // ✅ VERY IMPORTANT FIXES
    doc.setFont('helvetica', 'normal');
    doc.setCharSpace(0);

    // ===== TITLE =====
    doc.setFontSize(20);
    doc.setTextColor(139, 26, 74);
    doc.text('Wedding Expense Report', 14, 20);

    // ===== REPORT DETAILS =====
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);

    doc.text(`Event: ${event}`, 14, 32);
    doc.text(`Paid By: ${paidBy}`, 14, 38);
    doc.text(
      `Generated: ${new Date().toLocaleDateString('en-IN')}`,
      14,
      44
    );

    doc.text(
      `Total Expenses: Rs ${total.toLocaleString('en-IN')}`,
      14,
      50
    );

    // ===== DIVIDER =====
    doc.setDrawColor(201, 168, 76);
    doc.setLineWidth(0.5);
    doc.line(14, 54, 196, 54);

    // ===== TABLE DATA =====
    const tableData = expenses.map((expense, index) => [
      index + 1,
      new Date(expense.date).toLocaleDateString('en-IN'),
      expense.title,
      expense.notes || '-',
      `${Number(expense.amount).toLocaleString('en-IN')}`,
    ]);

    // ===== TABLE =====
    autoTable(doc, {
      startY: 58,
      head: [['#', 'Date', 'Title', 'Notes', 'Amount']],
      body: tableData,
      theme: 'striped',

      headStyles: {
        fillColor: [139, 26, 74],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },

      alternateRowStyles: {
        fillColor: [244, 228, 228],
      },

      styles: {
        fontSize: 9,
        cellPadding: 3,
        font: 'helvetica',
        charSpace: 0,
      },

      columnStyles: {
        0: { cellWidth: 12 },
        1: { cellWidth: 25 },
        2: { cellWidth: 50 },
        3: { cellWidth: 'auto' },
        4: {
          halign: 'right',
          cellWidth: 25,
        },
      },

      margin: { left: 14, right: 14 },

      didParseCell: function (data) {
        if (data.column.index === 4) {
          data.cell.styles.fontStyle = 'bold';
        }
      },
    });

    // ===== GRAND TOTAL =====
    const finalY = doc.lastAutoTable?.finalY || 58;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(139, 26, 74);
    doc.setCharSpace(0);

    doc.text(
      `Grand Total: Rs ${total.toLocaleString('en-IN')}`,
      196,
      finalY + 12,
      { align: 'right' }
    );

    // ===== SAVE =====
    const fileName = `${event}_${paidBy}_${Date.now()}.pdf`;
    doc.save(fileName);

    setEvent('');
    setPaidBy('');
    setOpen(false);
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download PDF</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Download Expense Report</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Event Select */}
          <div className="grid gap-2">
            <Label htmlFor="event">Event *</Label>
            <Select value={event} onValueChange={setEvent}>
              <SelectTrigger id="event" className="w-full">
                <SelectValue placeholder="Select event" />
              </SelectTrigger>
              <SelectContent>
                {EVENTS.map((e) => (
                  <SelectItem key={e.name} value={e.name}>
                    {e.emoji} {e.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Paid By Select */}
          <div className="grid gap-2">
            <Label htmlFor="paidBy">Paid By *</Label>
            <Select value={paidBy} onValueChange={setPaidBy}>
              <SelectTrigger id="paidBy" className="w-full">
                <SelectValue placeholder="Select person" />
              </SelectTrigger>
              <SelectContent>
                {members.map((member) => (
                  <SelectItem key={member} value={member}>
                    {member}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={generatePDF}
            disabled={loading || !event || !paidBy}
            className="bg-rose hover:bg-rose-dark text-white"
          >
            {loading ? 'Generating...' : 'Download PDF'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}