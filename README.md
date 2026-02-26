# 💍 Wedding Expense Tracker

A beautiful, responsive wedding expense tracking application built with Next.js 15, MongoDB, and shadcn/ui. Track and manage all your wedding expenses across multiple events and categories.

## ✨ Features

- 📊 **Dashboard** - View summary cards, charts, and recent transactions
- 📋 **Expense Management** - Add, edit, delete expenses with rich filtering
- 🎉 **Event View** - Track expenses across 5 wedding events (Chheka, Mehendi, Haldi, Wedding, Reception)
- 🎨 **Category View** - Organize expenses by 12 categories
- 📈 **Beautiful Charts** - Visualize spending with pie and bar charts
- 💰 **Indian Rupee Support** - All amounts formatted in ₹
- 📱 **Fully Responsive** - Works beautifully on all devices
- 🎨 **Elegant Design** - Wedding-themed colors and fonts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd wedding-expense-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Edit the `.env.local` file and add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/wedding_tracker?retryWrites=true&w=majority
   ```

4. **Seed the database with sample data (optional):**
   ```bash
   node scripts/seed.js
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
wedding-expense-tracker/
├── app/                      # Next.js 15 App Router pages
│   ├── layout.js            # Root layout with fonts & navbar
│   ├── page.js              # Dashboard page
│   ├── expenses/            # All expenses page
│   ├── events/              # Events view page
│   ├── categories/          # Categories view page
│   └── api/                 # API routes
│       ├── expenses/        # CRUD operations for expenses
│       └── summary/         # Dashboard summary endpoint
├── components/
│   ├── dashboard/           # Dashboard-specific components
│   ├── expenses/            # Expense management components
│   ├── forms/               # Form components
│   ├── layout/              # Layout components (Navbar)
│   ├── shared/              # Reusable components
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── mongodb.js           # MongoDB connection
│   ├── constants.js         # App constants (events, categories)
│   └── utils.js             # Utility functions
├── models/
│   ├── Expense.js           # Expense Mongoose model
│   └── Member.js            # Member Mongoose model
└── scripts/
    └── seed.js              # Database seeding script
```

## 🎨 Tech Stack

- **Framework:** Next.js 15 (App Router, JavaScript)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (Radix UI)
- **Database:** MongoDB Atlas with Mongoose
- **Charts:** Recharts
- **Icons:** Lucide React
- **Fonts:** Playfair Display + Poppins (Google Fonts)
- **Form Handling:** React Hook Form + Zod
- **Notifications:** Sonner
- **Date Handling:** date-fns

## 📊 Features Overview

### Dashboard
- Total expenses and transaction count
- Most expensive event and category
- Pie chart showing expenses by category
- Bar chart showing expenses by event
- Recent 10 transactions table

### Expenses Page
- Searchable and filterable expense list
- Filter by event, category, or paid by
- Edit and delete functionality
- Pagination support

### Events View
- Visual cards for all 5 wedding events
- Color-coded gradients for each event
- Total spent and transaction count per event
- Click to view filtered expenses

### Categories View
- 12 expense categories with icons
- Progress bars showing relative spending
- Total amount and transaction count
- Click to view filtered expenses

## 🎯 API Endpoints

### Expenses
- `GET /api/expenses` - Get all expenses (with filters)
- `POST /api/expenses` - Create new expense
- `GET /api/expenses/[id]` - Get single expense
- `PUT /api/expenses/[id]` - Update expense
- `DELETE /api/expenses/[id]` - Delete expense

### Summary
- `GET /api/summary` - Get aggregated dashboard data

## 🌈 Wedding Events

1. 💍 **Chheka** - Engagement ceremony
2. 🌿 **Mehendi** - Henna ceremony
3. 🌼 **Haldi** - Turmeric ceremony
4. 👰 **Wedding** - Main wedding ceremony
5. 🎉 **Reception** - Wedding reception

## 📦 Expense Categories

1. 🍽️ Food & Catering
2. 🌸 Decoration
3. 👗 Clothing & Jewelry
4. 📸 Photography
5. 🎵 Music & DJ
6. 🏛️ Venue & Logistics
7. 💌 Invitation Cards
8. 💄 Makeup & Beauty
9. 🚗 Transport
10. 🎁 Gifts & Favors
11. 🪔 Pandit & Rituals
12. 📦 Miscellaneous

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Seed database with sample data
node scripts/seed.js
```

## 📝 Environment Variables

Create a `.env.local` file with the following:

```env
MONGODB_URI=your_mongodb_connection_string
```

## 🎨 Color Theme

The app uses an elegant wedding color palette:

- **Gold:** `#C9A84C` - Primary accent color
- **Rose:** `#8B1A4A` - Secondary accent color
- **Cream:** `#FFFAF9` - Background color
- **White:** For cards and surfaces

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)

## 📄 License

This project is open source and available for personal and commercial use.

---

Made with ❤️ for beautiful wedding planning
