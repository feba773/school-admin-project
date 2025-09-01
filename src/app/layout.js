import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "School Management",
  description: "Assignment for Reno Platforms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* <-- Add Navbar here */}
<main className="pt-16">{children}</main>      </body>
    </html>
  );
}