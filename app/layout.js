import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weekday - Hire Engineers Vouched by other techies",
  description: "Hire Engineers Vouched by other techies",
};

export default function RootLayout({ children }) {
  return (
    // wrap redux storeprovider to access redux in wholw app
    <StoreProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </StoreProvider>
  );
}
