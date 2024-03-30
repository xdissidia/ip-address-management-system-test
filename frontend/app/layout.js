import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";

import "@styles/globals.css";
import Nav from "./components/Nav";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata = {
    title: "IP Address Management Information System",
    description: "IP Address Management Information System",
};

const isLoggedIn = false;

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <div className="main">
                <div className="gradient" />
            </div>
            <main className={isLoggedIn ? "app" : "app min-h-screen"} >
                {isLoggedIn && <Nav />}
                {children}
            </main>
        </html>
    );
}
