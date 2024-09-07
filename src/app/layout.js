import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title:
//     "Sarvanjana Hospital Rishikesh | Best 24/7 Multispeciality Services in Nepali Farm, Rishikesh, Raiwala",
//   description:
//     "Sarvanjana Hospital in Rishikesh offers 24/7 Multi-Specialty services & emergency care for residents & Tourists of Rishikesh & Raiwala. Visit us for comprehensive care.",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
