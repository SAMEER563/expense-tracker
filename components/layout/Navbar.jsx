'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/expenses', label: 'Expenses' },
  { href: '/events', label: 'Events' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    // Fetch total expense for display
    fetch('/api/summary')
      .then((res) => res.json())
      .then((data) => {
        setTotalExpense(data.totalAmount || 0);
      })
      .catch((err) => console.error('Failed to fetch summary:', err));
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">💍</span>
            <span className="text-xl font-heading font-bold text-rose">
              Wedding Tracker
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-gold ${
                  pathname === link.href
                    ? 'text-gold border-b-2 border-gold'
                    : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Total Expense Badge */}
          <div className="hidden md:block">
            <Badge variant="outline" className="bg-rose-light text-rose border-rose px-3 py-1">
              Total: <CurrencyDisplay amount={totalExpense} className="ml-1 font-semibold" />
            </Badge>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {navLinks
                .filter((link) => link.href !== '/expenses') // Hide Expenses on mobile
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-gold ${
                      pathname === link.href ? 'text-gold' : 'text-gray-700'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              <div className="pt-2 border-t">
                <Badge variant="outline" className="bg-rose-light text-rose border-rose">
                  Total: <CurrencyDisplay amount={totalExpense} className="ml-1 font-semibold" />
                </Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
