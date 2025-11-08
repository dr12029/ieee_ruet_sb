import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaYoutube, FaLinkedin, FaInstagram, FaHome, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    const socialLinks = [
        { icon: FaFacebook, href: 'https://www.facebook.com/ieeeruet/?ref=br_rs', label: 'Facebook' },
        { icon: FaTwitter, href: 'https://x.com/ieeeruetsb', label: 'X (Twitter)' },
        { icon: FaYoutube, href: 'https://www.youtube.com/channel/UCHJMc7_Az4bbzrnsoC5_j1w', label: 'YouTube' },
        { icon: FaLinkedin, href: 'https://www.linkedin.com/company/ieee-ruet-student-branch/about/', label: 'LinkedIn' },
        { icon: FaInstagram, href: 'https://www.instagram.com/ieee_ruet_sb/', label: 'Instagram' }
    ];

    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {/* Logo & Social Media */}
                    <div>
                        <div className="mb-6">
                            <Image 
                                src="/ruet-sb.png" 
                                alt="IEEE RUET SB Logo" 
                                width={180} 
                                height={60}
                                className="brightness-0 invert"
                            />
                        </div>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <Link 
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                                    aria-label={social.label}
                                >
                                    <social.icon className="text-2xl" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Important Links */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Important Links</h3>
                        <div className="h-px bg-gray-700 mb-4"></div>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 text-base leading-none shrink-0">■</span>
                                <div className="flex-1 leading-relaxed">
                                    <span className="text-gray-300">Any query? </span>
                                    <Link href="/faqs" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline">
                                        read FAQs
                                    </Link>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 text-base leading-none shrink-0">■</span>
                                <div className="flex-1 leading-relaxed">
                                    <span className="text-gray-300">Check new events </span>
                                    <Link href="/events/upcoming-events" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline">
                                        here
                                    </Link>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 text-base leading-none shrink-0">■</span>
                                <div className="flex-1 leading-relaxed">
                                    <span className="text-gray-300">Executive Committee list </span>
                                    <Link href="/executive-committee" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline">
                                        here
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Address */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Address</h3>
                        <div className="h-px bg-gray-700 mb-4"></div>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <FaHome className="text-blue-500 mt-1 shrink-0" />
                                <span>Rajshahi University of Engineering & Technology</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-blue-500 mt-1 shrink-0" />
                                <span>Rajshahi-6204, Bangladesh</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaPhone className="text-blue-500 mt-1 shrink-0" />
                                <a href="tel:+8801957138393" className="hover:text-white transition-colors duration-200">
                                    +8801957138393
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaEnvelope className="text-blue-500 mt-1 shrink-0" />
                                <a href="mailto:sb.ieeeruet@gmail.com" className="hover:text-white transition-colors duration-200">
                                    sb.ieeeruet@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                    <p>Copyright &copy; 2025 All Rights Reserved by IEEE RUET Student Branch</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;