import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import Providers from "@/components/Providers";
import Script from "next/script";

export const metadata = {
    metadataBase: new URL('https://ieee-ruet-sb.org'),
    title: {
        default: "IEEE RUET Student Branch",
        template: "%s | IEEE RUET Student Branch",
    },
    description: "IEEE RUET SB was formed on the purpose of developing humanity with the advancement of technology. This branch consists of energetic members who work hard to promote IEEE among students.",
    icons: {
        icon: '/nav-logo.png',
        shortcut: '/nav-logo.png',
        apple: '/nav-logo.png',
    },
    keywords: ['IEEE', 'RUET', 'Student Branch', 'Engineering', 'Technology', 'Bangladesh', 'Rajshahi', 'IEEE RUET SB', 'IEEE RUET Student Branch'],
    authors: [{ name: 'IEEE RUET Student Branch' }],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        title: 'IEEE RUET Student Branch',
        description: 'IEEE RUET SB was formed on the purpose of developing humanity with the advancement of technology. This branch consists of energetic members who work hard to promote IEEE among students.',
        url: 'https://ieee-ruet-sb.org',
        siteName: 'IEEE RUET Student Branch',
        images: [
            {
                url: '/nav-logo.png',
                width: 800,
                height: 600,
                alt: 'IEEE RUET Student Branch Logo',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'IEEE RUET Student Branch',
        description: 'IEEE RUET SB was formed on the purpose of developing humanity with the advancement of technology.',
        images: ['/nav-logo.png'],
        creator: '@ieeeruetsb',
    },
};

export default function RootLayout({ children }) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'IEEE RUET Student Branch',
        url: 'https://ieee-ruet-sb.org',
        logo: 'https://ieee-ruet-sb.org/nav-logo.png',
        description: "IEEE RUET SB was formed on the purpose of developing humanity with the advancement of technology. This branch consists of energetic members who work hard to promote IEEE among students.",
        sameAs: [
            'https://www.facebook.com/ieeeruet/?ref=br_rs',
            'https://x.com/ieeeruetsb',
            'https://www.youtube.com/channel/UCHJMc7_Az4bbzrnsoC5_j1w',
            'https://www.linkedin.com/company/ieee-ruet-student-branch/about/',
            'https://www.instagram.com/ieee_ruet_sb/'
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+8801957138393',
            contactType: 'customer service',
            areaServed: 'BD',
            availableLanguage: 'en'
        },
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Rajshahi University of Engineering & Technology',
            addressLocality: 'Rajshahi',
            postalCode: '6204',
            addressCountry: 'BD'
        }
    };

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
                <Script
                    id="json-ld"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </body>
        </html>
    );
}
