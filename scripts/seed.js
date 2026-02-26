require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// MongoDB URI from environment
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

// Define Expense schema (matching the model)
const ExpenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    event: { type: String, required: true },
    paidBy: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

const Expense = mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);

// Sample expense data
const sampleExpenses = [
  // Chheka
  { title: 'Engagement Ring', amount: 75000, event: 'Chheka', paidBy: 'Ramesh (Father)', date: new Date('2026-02-15'), notes: 'Diamond ring from jewelry store' },
  { title: 'Venue Booking', amount: 25000, event: 'Chheka', paidBy: 'Suresh (Uncle)', date: new Date('2026-02-10'), notes: 'Garden venue for engagement' },
  { title: 'Photographer', amount: 15000, event: 'Chheka', paidBy: 'Rahul (Brother)', date: new Date('2026-02-15'), notes: 'Professional photography' },
  { title: 'Decoration', amount: 12000, event: 'Chheka', paidBy: 'Priya (Aunt)', date: new Date('2026-02-15'), notes: 'Floral and lighting' },

  // Mehendi
  { title: 'Mehendi Artist', amount: 18000, event: 'Mehendi', paidBy: 'Sunita (Mother)', date: new Date('2026-02-18'), notes: 'Bridal mehendi specialist' },
  { title: 'Venue Decoration', amount: 22000, event: 'Mehendi', paidBy: 'Ramesh (Father)', date: new Date('2026-02-18'), notes: 'Floral decoration and marigolds' },
  { title: 'Catering for 100 guests', amount: 35000, event: 'Mehendi', paidBy: 'Suresh (Uncle)', date: new Date('2026-02-18'), notes: 'Snacks and beverages' },
  { title: 'DJ and Music', amount: 20000, event: 'Mehendi', paidBy: 'Rahul (Brother)', date: new Date('2026-02-18'), notes: 'Wedding DJ with sound system' },
  { title: 'Invitation Cards', amount: 8000, event: 'Mehendi', paidBy: 'Priya (Aunt)', date: new Date('2026-02-12'), notes: 'Printed invitations' },

  // Haldi
  { title: 'Haldi Ceremony Setup', amount: 15000, event: 'Haldi', paidBy: 'Sunita (Mother)', date: new Date('2026-02-19'), notes: 'Yellow flowers and drapes' },
  { title: 'Traditional Outfits', amount: 30000, event: 'Haldi', paidBy: 'Ramesh (Father)', date: new Date('2026-02-17'), notes: 'Yellow kurtas for family' },
  { title: 'Photography & Videography', amount: 18000, event: 'Haldi', paidBy: 'Rahul (Brother)', date: new Date('2026-02-19'), notes: 'Candid shots' },
  { title: 'Catering', amount: 28000, event: 'Haldi', paidBy: 'Suresh (Uncle)', date: new Date('2026-02-19'), notes: 'Lunch for 80 guests' },

  // Wedding
  { title: 'Wedding Venue', amount: 120000, event: 'Wedding', paidBy: 'Ramesh (Father)', date: new Date('2026-02-20'), notes: 'Premium banquet hall' },
  { title: 'Catering - 500 guests', amount: 180000, event: 'Wedding', paidBy: 'Ramesh (Father)', date: new Date('2026-02-20'), notes: 'Full course dinner' },
  { title: 'Bridal Lehenga & Jewelry', amount: 150000, event: 'Wedding', paidBy: 'Sunita (Mother)', date: new Date('2026-02-18'), notes: 'Designer bridal outfit' },
  { title: 'Groom Sherwani', amount: 45000, event: 'Wedding', paidBy: 'Ramesh (Father)', date: new Date('2026-02-18'), notes: 'Designer sherwani set' },
  { title: 'Photography Package', amount: 65000, event: 'Wedding', paidBy: 'Rahul (Brother)', date: new Date('2026-02-20'), notes: 'Photo + video coverage' },
  { title: 'Wedding Decoration', amount: 85000, event: 'Wedding', paidBy: 'Suresh (Uncle)', date: new Date('2026-02-20'), notes: 'Stage, mandap, flowers' },
  { title: 'Live Band', amount: 50000, event: 'Wedding', paidBy: 'Priya (Aunt)', date: new Date('2026-02-20'), notes: 'Professional wedding band' },
  { title: 'Makeup Artist', amount: 25000, event: 'Wedding', paidBy: 'Sunita (Mother)', date: new Date('2026-02-20'), notes: 'Bridal makeup and hair' },
  { title: 'Transport - Guest Cars', amount: 40000, event: 'Wedding', paidBy: 'Suresh (Uncle)', date: new Date('2026-02-20'), notes: 'Car rentals for family' },
  { title: 'Pandit Dakshina', amount: 11000, event: 'Wedding', paidBy: 'Ramesh (Father)', date: new Date('2026-02-20'), notes: 'Wedding rituals' },
  { title: 'Wedding Gifts', amount: 35000, event: 'Wedding', paidBy: 'Priya (Aunt)', date: new Date('2026-02-19'), notes: 'Return gifts for guests' },

  // Reception
  { title: 'Reception Venue', amount: 95000, event: 'Reception', paidBy: 'Ramesh (Father)', date: new Date('2026-02-21'), notes: 'Hotel ballroom' },
  { title: 'Catering - 400 guests', amount: 140000, event: 'Reception', paidBy: 'Ramesh (Father)', date: new Date('2026-02-21'), notes: 'Buffet dinner' },
  { title: 'Reception Decoration', amount: 55000, event: 'Reception', paidBy: 'Suresh (Uncle)', date: new Date('2026-02-21'), notes: 'Elegant theme decor' },
  { title: 'DJ & Entertainment', amount: 35000, event: 'Reception', paidBy: 'Rahul (Brother)', date: new Date('2026-02-21'), notes: 'DJ for reception party' },
  { title: 'Reception Photography', amount: 30000, event: 'Reception', paidBy: 'Priya (Aunt)', date: new Date('2026-02-21'), notes: 'Evening photography' },
  { title: 'Bride Reception Dress', amount: 40000, event: 'Reception', paidBy: 'Sunita (Mother)', date: new Date('2026-02-19'), notes: 'Designer gown' },

  // Miscellaneous
  { title: 'Wedding Cards Printing', amount: 15000, event: 'Wedding', paidBy: 'Ramesh (Father)', date: new Date('2026-02-05'), notes: '500 premium cards' },
  { title: 'Priest Accommodation', amount: 5000, event: 'Wedding', paidBy: 'Sunita (Mother)', date: new Date('2026-02-19'), notes: 'Hotel stay' },
  { title: 'Emergency Supplies', amount: 8000, event: 'Wedding', paidBy: 'Rahul (Brother)', date: new Date('2026-02-20'), notes: 'First aid, extras' },
];

// Connect to MongoDB and seed data
async function seedDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully!');

    console.log('🗑️  Clearing existing expenses...');
    await Expense.deleteMany({});
    console.log('✅ Cleared existing data');

    console.log('🌱 Seeding sample expenses...');
    const result = await Expense.insertMany(sampleExpenses);
    console.log(`✅ Successfully inserted ${result.length} expenses!`);

    console.log('\n📊 Summary:');
    console.log('-'.repeat(50));
    
    // Show counts by event
    const events = ['Chheka', 'Mehendi', 'Haldi', 'Wedding', 'Reception'];
    for (const event of events) {
      const count = await Expense.countDocuments({ event });
      const total = await Expense.aggregate([
        { $match: { event } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);
      const totalAmount = total[0]?.total || 0;
      console.log(`${event}: ${count} expenses, ₹${totalAmount.toLocaleString('en-IN')}`);
    }

    console.log('-'.repeat(50));
    const grandTotal = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    console.log(`\n💰 Grand Total: ₹${grandTotal[0].total.toLocaleString('en-IN')}`);
    console.log('\n🎉 Database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
