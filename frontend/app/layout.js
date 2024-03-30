import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";

import "@styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "IP Address Management Information System",
  description: "IP Address Management Information System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
