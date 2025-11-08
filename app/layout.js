import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";


export const metadata = {
    title: "IEEE RUET SB",
    description: "OFFICIAL WEBSITE OF IEEE RUET STUDENT BRANCH",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                    className={`min-h-screen flex flex-col`}
            >
                <Navbar />
                <main className="grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
