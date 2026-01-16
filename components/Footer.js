'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaYoutube, FaLinkedin, FaInstagram, FaHome, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
    const socialLinks = [
        { icon: FaFacebook, href: 'https://www.facebook.com/ieeeruet/?ref=br_rs', label: 'Facebook' },
        { icon: FaTwitter, href: 'https://x.com/ieeeruetsb', label: 'X (Twitter)' },
        { icon: FaYoutube, href: 'https://www.youtube.com/channel/UCHJMc7_Az4bbzrnsoC5_j1w', label: 'YouTube' },
        { icon: FaLinkedin, href: 'https://www.linkedin.com/company/ieee-ruet-student-branch/about/', label: 'LinkedIn' },
        { icon: FaInstagram, href: 'https://www.instagram.com/ieee_ruet_sb/', label: 'Instagram' }
    ];

    return (
        <footer className="bg-gray-900 text-gray-300 py-8 sm:py-10 md:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Logo & Social Media */}
                    <div className="text-center sm:text-left">
                        <div className="mb-4 sm:mb-6">
                            <Image
                                src="/ruet-sb.png"
                                alt="IEEE RUET SB Logo"
                                width={140}
                                height={47}
                                className="brightness-0 invert mx-auto sm:mx-0 sm:w-[160px] md:w-[180px]"
                            />
                        </div>
                        <div className="flex justify-center sm:justify-start gap-3 sm:gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white"
                                    aria-label={social.label}
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                >
                                    <social.icon className="text-xl sm:text-2xl" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Important Links */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-white text-base sm:text-lg font-bold mb-3 sm:mb-4">Important Links</h3>
                        <div className="h-px bg-gray-700 mb-3 sm:mb-4 mx-auto sm:mx-0 w-24 sm:w-full"></div>
                        <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                            <li className="flex items-start gap-2 sm:gap-3 justify-center sm:justify-start">
                                <span className="text-blue-500 text-sm sm:text-base leading-none shrink-0">■</span>
                                <div className="flex-1 leading-relaxed text-left">
                                    <span className="text-gray-300">Any query? </span>
                                    <Link href="/faqs" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline">
                                        read FAQs
                                    </Link>
                                </div>
                            </li>
                            <li className="flex items-start gap-2 sm:gap-3 justify-center sm:justify-start">
                                <span className="text-blue-500 text-sm sm:text-base leading-none shrink-0">■</span>
                                <div className="flex-1 leading-relaxed text-left">
                                    <span className="text-gray-300">Check new events </span>
                                    <Link href="/events/upcoming-events" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline">
                                        here
                                    </Link>
                                </div>
                            </li>
                            <li className="flex items-start gap-2 sm:gap-3 justify-center sm:justify-start">
                                <span className="text-blue-500 text-sm sm:text-base leading-none shrink-0">■</span>
                                <div className="flex-1 leading-relaxed text-left">
                                    <span className="text-gray-300">Executive Committee list </span>
                                    <Link href="/executive-committee" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline">
                                        here
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Address */}
                    <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
                        <h3 className="text-white text-base sm:text-lg font-bold mb-3 sm:mb-4">Address</h3>
                        <div className="h-px bg-gray-700 mb-3 sm:mb-4 mx-auto sm:mx-0 w-24 sm:w-full"></div>
                        <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                            <li className="flex items-start gap-2 sm:gap-3 justify-center sm:justify-start">
                                <FaHome className="text-blue-500 mt-0.5 sm:mt-1 shrink-0 text-sm sm:text-base" />
                                <span className="text-left">Rajshahi University of Engineering & Technology</span>
                            </li>
                            <li className="flex items-start gap-2 sm:gap-3 justify-center sm:justify-start">
                                <FaMapMarkerAlt className="text-blue-500 mt-0.5 sm:mt-1 shrink-0 text-sm sm:text-base" />
                                <span className="text-left">Rajshahi-6204, Bangladesh</span>
                            </li>
                            <li className="flex items-start gap-2 sm:gap-3 justify-center sm:justify-start">
                                <FaPhone className="text-blue-500 mt-0.5 sm:mt-1 shrink-0 text-sm sm:text-base" />
                                <a href="tel:+8801957138393" className="hover:text-white transition-colors duration-200">
                                    +8801957138393
                                </a>
                            </li>
                            <li className="flex items-start gap-2 sm:gap-3 justify-center sm:justify-start">
                                <FaEnvelope className="text-blue-500 mt-0.5 sm:mt-1 shrink-0 text-sm sm:text-base" />
                                <a href="mailto:sb.ieeeruet@gmail.com" className="hover:text-white transition-colors duration-200 break-all">
                                    sb.ieeeruet@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm">
                    <p>Copyright &copy; 2025 All Rights Reserved by IEEE RUET Student Branch</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;