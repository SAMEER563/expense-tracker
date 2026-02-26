# 💍 Wedding Expense Tracker — Project Requirements

## Project Overview

A beautiful, responsive **Wedding Expense Tracker** web application built with **Next.js 15** for managing and tracking all expenses across multiple family wedding events. Multiple family members can log, view, and manage expenses — organized by category, event, and person who paid — all in Indian Rupees (₹). No login or authentication required.

---

## Tech Stack

| Layer          | Technology                                      |
|----------------|-------------------------------------------------|
| Framework      | Next.js 15 (App Router, JavaScript)             |
| Styling        | Tailwind CSS v3                                 |
| UI Components  | shadcn/ui (built on Radix UI)                   |
| Database       | MongoDB Atlas (Cloud) via Mongoose              |
| Charts         | Recharts                                        |
| Icons          | Lucide React                                    |
| Fonts          | Google Fonts via `next/font` — Playfair Display + Poppins |
| Form Handling  | React Hook Form + Zod (validation)              |
| Notifications  | Sonner (toast notifications)                    |
| Date Handling  | date-fns                                        |

---

## Installation Commands

```bash
npx create-next-app@latest wedding-expense-tracker --js --tailwind --app --no-src-dir
cd wedding-expense-tracker

# shadcn/ui setup
npx shadcn@latest init

# Install all dependencies
npm install mongoose recharts lucide-react react-hook-form zod @hookform/resolvers sonner date-fns
```

---

## UI Design Guidelines

- **Theme:** Elegant wedding aesthetic — soft pinks, golds, creams, and whites
- **Color Palette (add to `tailwind.config.js`):**
  ```js
  colors: {
    gold:  { DEFAULT: '#C9A84C', light: '#E8D5A3', dark: '#A07830' },
    rose:  { DEFAULT: '#8B1A4A', light: '#F4E4E4', dark: '#5C0F30' },
    cream: { DEFAULT: '#FFFAF9', dark: '#F5EDE8' },
  }
  ```
- **Style:** Cards with soft shadows, `rounded-2xl` corners, subtle gradients, glassmorphism accents
- **Fully responsive** — mobile-first, works on all screen sizes
- **Animations:** Tailwind `transition`, hover effects, smooth sheet/modal open-close
- **Typography:** Playfair Display for headings, Poppins for body text

---

## Project Folder Structure

```
wedding-expense-tracker/
│
├── app/
│   ├── layout.js                  # Root layout with Navbar + Toaster
│   ├── page.js                    # Dashboard (/)
│   ├── expenses/
│   │   └── page.js                # All Expenses (/expenses)
│   ├── events/
│   │   └── page.js                # Event-wise view (/events)
│   ├── categories/
│   │   └── page.js                # Category-wise view (/categories)
│   └── api/
│       ├── expenses/
│       │   ├── route.js           # GET all (with filters), POST new
│       │   └── [id]/
│       │       └── route.js       # GET one, PUT update, DELETE
│       └── summary/
│           └── route.js           # GET aggregated totals for dashboard
│
├── components/
│   ├── layout/
│   │   └── Navbar.jsx             # Top navigation bar
│   ├── dashboard/
│   │   ├── SummaryCards.jsx       # 4 stat cards at top
│   │   ├── ExpenseByCategory.jsx  # Pie chart (Recharts) — 'use client'
│   │   ├── ExpenseByEvent.jsx     # Bar chart (Recharts) — 'use client'
│   │   └── RecentTransactions.jsx # Last 10 expenses table
│   ├── expenses/
│   │   ├── ExpenseTable.jsx       # Filterable, searchable table — 'use client'
│   │   ├── ExpenseFilters.jsx     # Filter dropdowns + search bar
│   │   ├── DeleteDialog.jsx       # shadcn AlertDialog for confirm delete
│   │   └── ExpenseSheet.jsx       # shadcn Sheet wrapper for Add/Edit form
│   ├── forms/
│   │   └── ExpenseForm.jsx        # React Hook Form + Zod form — 'use client'
│   └── shared/
│       ├── EmptyState.jsx         # Shown when no data exists
│       ├── LoadingSpinner.jsx     # Full-page centered spinner
│       └── CurrencyDisplay.jsx    # ₹ formatted number component
│
├── lib/
│   ├── mongodb.js                 # MongoDB Atlas singleton connection
│   ├── utils.js                   # cn() Tailwind helper + misc utilities
│   └── constants.js               # Events, Categories, Default Members
│
├── models/
│   ├── Expense.js                 # Mongoose Expense schema & model
│   └── Member.js                  # Mongoose Member schema & model
│
├── scripts/
│   └── seed.js                    # Standalone Node.js seed script
│
├── .env.local                     # MONGODB_URI
├── tailwind.config.js
├── next.config.js
└── package.json
```

---

## Environment Variables (`.env.local`)

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/wedding_tracker?retryWrites=true&w=majority
```

---

## MongoDB Connection (`lib/mongodb.js`)

Use a singleton pattern to prevent multiple connections in Next.js dev mode:

```js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
```

---

## Data Models

### `models/Expense.js`

```js
import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  title:    { type: String, required: true, trim: true },
  amount:   { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  event:    { type: String, required: true },
  paidBy:   { type: String, required: true },
  date:     { type: Date, required: true, default: Date.now },
  notes:    { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
```

### `models/Member.js`

```js
import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
```

---

## Constants (`lib/constants.js`)

```js
export const EVENTS = [
  { name: 'Chheka',    emoji: '💍' },
  { name: 'Mehendi',   emoji: '🌿' },
  { name: 'Haldi',     emoji: '🌼' },
  { name: 'Wedding',   emoji: '👰' },
  { name: 'Reception', emoji: '🎉' },
];

export const CATEGORIES = [
  { name: 'Food & Catering',    icon: '🍽️' },
  { name: 'Decoration',          icon: '🌸' },
  { name: 'Clothing & Jewelry',  icon: '👗' },
  { name: 'Photography',         icon: '📸' },
  { name: 'Music & DJ',          icon: '🎵' },
  { name: 'Venue & Logistics',   icon: '🏛️' },
  { name: 'Invitation Cards',    icon: '💌' },
  { name: 'Makeup & Beauty',     icon: '💄' },
  { name: 'Transport',           icon: '🚗' },
  { name: 'Gifts & Favors',      icon: '🎁' },
  { name: 'Pandit & Rituals',    icon: '🪔' },
  { name: 'Miscellaneous',       icon: '📦' },
];

export const DEFAULT_MEMBERS = [
  'Ramesh (Father)',
  'Sunita (Mother)',
  'Rahul (Brother)',
  'Priya (Aunt)',
  'Suresh (Uncle)',
];
```

---

## API Routes

### `app/api/expenses/route.js`

**GET** — Fetch all expenses. Support query params:
- `?event=Wedding`
- `?category=Food & Catering`
- `?paidBy=Ramesh`
- `?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- `?page=1&limit=10`
- `?search=flower` (searches title and notes fields)

**POST** — Create new expense. Validate all required fields. Return created document.

### `app/api/expenses/[id]/route.js`

- **GET** — Fetch single expense by MongoDB `_id`
- **PUT** — Update expense by `_id`
- **DELETE** — Delete expense by `_id`, return success message

### `app/api/summary/route.js`

**GET** — Return aggregated dashboard data using MongoDB aggregation pipeline:

```json
{
  "totalAmount": 250000,
  "totalTransactions": 42,
  "byEvent": [
    { "event": "Wedding", "total": 120000, "count": 18 }
  ],
  "byCategory": [
    { "category": "Food & Catering", "total": 80000 }
  ],
  "byMember": [
    { "paidBy": "Ramesh (Father)", "total": 100000 }
  ],
  "mostExpensiveEvent": "Wedding",
  "mostExpensiveCategory": "Food & Catering",
  "recentExpenses": []
}
```

---

## Pages

### 1. Dashboard (`app/page.js`)

- Hero header: "💍 Wedding Expense Tracker" with total spend badge
- **4 Summary Cards** (shadcn `Card`):
  - 💰 Total Expenses (₹ formatted)
  - 📋 Total Transactions (count)
  - 🏆 Most Expensive Event
  - 🎯 Most Expensive Category
- **Pie Chart** — Expenses by Category (Recharts `PieChart`) with gold/rose color palette
- **Bar Chart** — Expenses by Event (Recharts `BarChart`)
- **Recent 10 Transactions** — shadcn `Table` with title, amount, event, paid by, date
- Fixed bottom-right **"+ Add Expense"** button (gold background) that opens an `ExpenseSheet`

### 2. All Expenses (`app/expenses/page.js`)

- Search bar (searches title/notes)
- Filter bar: dropdowns for Event, Category, Paid By
- shadcn `Table` — columns: Title | Amount | Category | Event | Paid By | Date | Actions
- Edit button (pencil) → opens `ExpenseSheet` pre-filled with existing data
- Delete button (trash) → shows `DeleteDialog` (shadcn `AlertDialog`) before removing
- Pagination: show `Showing X of Y expenses`, Previous/Next buttons
- Show `EmptyState` component if no results match filters

### 3. Events View (`app/events/page.js`)

- Grid of 5 event cards (2 columns mobile, 3 columns desktop)
- Each card: large emoji, event name, total ₹ spent, number of transactions
- Each card has a unique gradient background color:
  - Chheka → gold gradient
  - Mehendi → green gradient
  - Haldi → yellow gradient
  - Wedding → rose/pink gradient
  - Reception → purple gradient
- Clicking a card links to `/expenses?event=EventName` (filtered view)

### 4. Categories View (`app/categories/page.js`)

- Grid of category cards
- Each card: emoji, category name, total ₹ spent, relative progress bar
- Progress bar width = (category total / max category total) × 100%
- Clicking a card links to `/expenses?category=CategoryName`

---

## Key Component Details

### `ExpenseForm.jsx` — `'use client'`

React Hook Form + Zod validation:

```js
const schema = z.object({
  title:    z.string().min(2, 'Title is required'),
  amount:   z.coerce.number().positive('Amount must be greater than 0'),
  category: z.string().min(1, 'Please select a category'),
  event:    z.string().min(1, 'Please select an event'),
  paidBy:   z.string().min(1, 'Please enter who paid'),
  date:     z.date({ required_error: 'Date is required' }),
  notes:    z.string().optional(),
});
```

- shadcn components used: `Input`, `Select`, `Button`, `Textarea`, `Label`, `Popover` + `Calendar` (date picker)
- On submit (add): POST to `/api/expenses`, show Sonner success toast, close sheet, refresh data
- On submit (edit): PUT to `/api/expenses/:id`, show Sonner success toast, close sheet, refresh data
- Show inline Zod validation errors under each field

### `Navbar.jsx` — `'use client'`

- Left: 💍 **Wedding Tracker** in Playfair Display font
- Center links: Dashboard | Expenses | Events | Categories
- Right: Live total spend badge (fetches from `/api/summary`)
- Mobile: hamburger icon → dropdown nav links
- Active link highlighted with gold color/underline

### `CurrencyDisplay.jsx`

Always format with Indian locale:
```js
new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
// Output: ₹1,20,000
```

### `EmptyState.jsx`

- Large decorative emoji or simple SVG (e.g., 💸 or 📋)
- Heading: "No expenses found"
- Subtext: "Start adding expenses to track your wedding budget!"
- Gold CTA button: "+ Add First Expense"

---

## Seed Script (`scripts/seed.js`)

Standalone Node.js script — run with `node scripts/seed.js`:

```bash
node scripts/seed.js
```

- Load `.env.local` using `dotenv`
- Connect to MongoDB Atlas
- Clear existing expenses
- Insert **20+ sample expenses** covering:
  - All 5 events (Chheka, Mehendi, Haldi, Wedding, Reception)
  - At least 8 different categories
  - All 5 default family members as `paidBy`
  - Dates spread across the week of the wedding
  - Amounts ranging from ₹500 to ₹80,000

```bash
npm install --save-dev dotenv   # needed for seed script only
```

---

## shadcn/ui Components to Install

Run after `npx shadcn@latest init`:

```bash
npx shadcn@latest add card table button input select sheet alert-dialog dialog label textarea badge separator skeleton popover calendar
```

---

## Tailwind Config (`tailwind.config.js`)

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold:  { DEFAULT: '#C9A84C', light: '#E8D5A3', dark: '#A07830' },
        rose:  { DEFAULT: '#8B1A4A', light: '#F4E4E4', dark: '#5C0F30' },
        cream: { DEFAULT: '#FFFAF9', dark: '#F5EDE8' },
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        body:    ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

---

## Important Implementation Notes for AI Editor

1. **App Router only** — use `app/` directory, never `pages/` directory
2. **Server Components by default** — only add `'use client'` to components that use React hooks, browser APIs, or event handlers (forms, charts, interactive tables)
3. **API Route Handlers** — use `app/api/.../route.js` with `NextResponse` from `next/server`, not old `pages/api`
4. **Mongoose model safety** — always use `mongoose.models.X || mongoose.model('X', Schema)` to avoid hot-reload re-registration errors
5. **No authentication** — all routes and pages are publicly accessible
6. **Indian Rupee formatting** — use `Intl.NumberFormat('en-IN')` everywhere amounts are displayed
7. **Recharts** — must always be in a `'use client'` component; wrap in a `<div className="w-full h-80">` for responsive sizing
8. **Loading states** — use shadcn `Skeleton` components while API calls are in-flight
9. **Error handling** — all API routes must return proper HTTP status codes (200, 201, 400, 404, 500) with JSON `{ error: "message" }` on failure
10. **Mobile-first** — design starting from mobile, scale up with `md:` and `lg:` breakpoints
11. **Data fetching** — dashboard page can use server-side fetch; interactive pages (expenses list with filters) should use client-side fetch with `useState` + `useEffect`
12. **next/font** — load Playfair Display and Poppins via `next/font/google` in `app/layout.js` and pass as CSS variables

---

## Bonus Features (Nice to Have)

- **Budget Tracker** — input a total wedding budget on dashboard, show remaining as a colored progress bar (green → yellow → red as budget fills up)
- **Dark Mode** — install `next-themes`, add toggle button in Navbar, use Tailwind `dark:` classes
- **Print/Export Summary** — a clean `/summary/print` page with all expenses grouped by event, formatted for printing
- **Confetti on first expense** — `canvas-confetti` npm package, trigger once when first expense is added 🎊

---

## Final Checklist for AI Editor

| Task                                          | Required  |
|-----------------------------------------------|-----------|
| Next.js 15 App Router setup                   | ✅        |
| Tailwind CSS + custom gold/rose theme         | ✅        |
| shadcn/ui components installed & configured   | ✅        |
| MongoDB Atlas connection via Mongoose          | ✅        |
| Expense CRUD API routes                       | ✅        |
| Summary/aggregation API route                 | ✅        |
| Dashboard with charts (Recharts)              | ✅        |
| All Expenses page with filter + search        | ✅        |
| Events view (5 events)                        | ✅        |
| Categories view (12 categories)               | ✅        |
| Add/Edit form (React Hook Form + Zod)         | ✅        |
| Delete with confirmation dialog               | ✅        |
| Sonner toast notifications                    | ✅        |
| ₹ Indian Rupee formatting (en-IN)             | ✅        |
| Responsive mobile-first UI                    | ✅        |
| Seed script with 20+ sample expenses          | ✅        |
| `.env.local` with MONGODB_URI                 | ✅        |
| No authentication required                    | ✅        |
