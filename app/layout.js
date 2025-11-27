import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import Providers from "@/components/Providers";


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
                <Providers>
                    <Navbar />
                    <main className="grow">
                        {children}
                    </main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
