import { Inter, Lexend } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"],weight: ['100','200','300','400','500','600','700','900'] });

export const metadata = {
  title: "Weekday - Hire Engineers Vouched by other techies",
  description: "Hire Engineers Vouched by other techies",
};

export default function RootLayout({ children }) {
  return (
    // wrap redux storeprovider to access redux in wholw app
    <StoreProvider>
    <html lang="en">
      <body className={lexend.className}>{children}</body>
    </html>
    </StoreProvider>
  );
}
