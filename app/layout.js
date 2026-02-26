import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "💍 Wedding Expense Tracker",
  description: "Track and manage all your wedding expenses beautifully",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${poppins.variable} font-body antialiased bg-cream`}
      >
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
