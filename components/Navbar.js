'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            // Check if user has scrolled past the hero section (roughly viewport height)
            const heroHeight = window.innerHeight;
            setScrolled(window.scrollY > heroHeight * 0.8);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        {
            name: 'About',
            children: [
                { name: 'IEEE', href: '/about/ieee' },
                { name: 'IEEE Region-10', href: '/about/region-10' },
                { name: 'IEEE Bangladesh Section', href: '/about/bangladesh-section' },
                { name: 'IEEE RUET SB', href: '/about/ruet-sb' },
                { name: 'Membership & Benefits', href: '/about/membership' }
            ]
        },
        {
            name: 'Chapters & AG',
            children: [
                { name: 'IEEE RUET IAS SB Chapter', href: '/ias' },
                { name: 'IEEE RUET RAS SB Chapter', href: '/ras' },
                { name: 'IEEE CS RUET SB Chapter', href: '/cs' },
                { name: 'IEEE RUET SPS SB Chapter', href: '/sps' },
                { name: 'IEEE RUET WIE SB Affinity Group', href: '/wie' }
            ]
        },
        { name: 'Events', href: '/events' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Publications', href: '/publications' },
        {
            name: 'Team',
            children: [
                { name: 'Executive Committee', href: '/executive-committee' },
                { name: 'Hall of Fame', href: '/hall-of-fame' }
            ]
        },
        {
            name: 'More',
            children: [
                { name: 'Achievements', href: '/achievements' },
                { name: 'Featured', href: '/featured' }
            ]
        },
        { name: 'Contact', href: '/contact' }
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 shadow-lg transition-all duration-700 ease-in-out ${
            scrolled 
                ? 'bg-linear-to-r from-blue-600 to-purple-600' 
                : 'bg-linear-to-r from-white to-gray-50'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="shrink-0">
                        <Link href="/">
                            <Image 
                                src="/nav-logo.png" 
                                alt="IEEE RUET SB Logo" 
                                width={120} 
                                height={40}
                                className={`transition-all duration-700 ease-in-out ${
                                    scrolled ? '' : 'brightness-0'
                                }`}
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group">
                                {link.children ? (
                                    <div className="relative">
                                        <button className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-500 ease-in-out ${
                                            scrolled ? 'text-white hover:bg-white hover:bg-opacity-20 hover:text-blue-600' : 'text-gray-800 hover:bg-gray-200'
                                        }`}>
                                            {link.name}
                                            <FaChevronDown className="text-xs" />
                                        </button>
                                        {/* Dropdown Menu */}
                                        <div className="absolute left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300 ease-in-out rounded-xl shadow-2xl py-3 z-50 backdrop-blur-lg border bg-white/95 border-gray-200/50">
                                            {link.children.map((child, index) => (
                                                <Link 
                                                    key={child.name} 
                                                    href={child.href}
                                                    className={`block px-5 py-2.5 text-sm font-medium transition-all duration-200 text-gray-700 hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50 hover:pl-6 hover:text-blue-600 ${index !== 0 ? 'border-t border-gray-200/10' : ''}`}
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link 
                                        href={link.href}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-500 ease-in-out ${
                                            scrolled ? 'text-white hover:bg-white hover:bg-opacity-20 hover:text-blue-600' : 'text-gray-800 hover:bg-gray-200'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Profile Icon (Desktop) */}
                    <div className="hidden lg:flex items-center">
                        <Link href="/admin">
                            <button className={`p-2 rounded-full transition-all duration-500 ease-in-out ${
                                scrolled ? 'text-white hover:bg-white hover:bg-opacity-20 hover:text-blue-600' : 'text-gray-800 hover:bg-gray-200'
                            }`}>
                                <FaUser className="text-xl" />
                            </button>
                        </Link>
                    </div>

                    {/* Mobile: Profile Icon + Hamburger */}
                    <div className="lg:hidden flex items-center gap-3">
                        {/* Profile Icon (Mobile) */}
                        <Link href="/admin">
                            <button className={`p-2 rounded-full transition-all duration-500 ease-in-out ${
                                scrolled ? 'text-white hover:bg-white hover:bg-opacity-20 hover:text-blue-600' : 'text-gray-800 hover:bg-gray-200'
                            }`}>
                                <FaUser className="text-lg" />
                            </button>
                        </Link>
                        
                        {/* Hamburger Menu */}
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`p-2 rounded-md transition-all duration-500 ease-in-out ${
                                scrolled ? 'text-white hover:bg-white hover:bg-opacity-20 hover:text-blue-600' : 'text-gray-800 hover:bg-gray-200'
                            }`}
                        >
                            {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                    mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <div key={link.name}>
                                {link.children ? (
                                    <div>
                                        <button 
                                            onClick={() => toggleDropdown(link.name)}
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                                                scrolled ? 'text-white hover:bg-white hover:bg-opacity-20 hover:text-blue-600' : 'text-gray-800 hover:bg-gray-200'
                                            }`}
                                        >
                                            {link.name}
                                            <FaChevronDown className={`text-xs transition-transform duration-300 ${
                                                openDropdown === link.name ? 'rotate-180' : ''
                                            }`} />
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ${
                                            openDropdown === link.name ? 'max-h-96' : 'max-h-0'
                                        }`}>
                                            <div className="ml-2 mt-1 rounded-lg backdrop-blur-sm border bg-gray-50/80 border-gray-200/50">
                                                {link.children.map((child, index) => (
                                                    <Link 
                                                        key={child.name}
                                                        href={child.href}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className={`block px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-700 hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50 hover:pl-5 hover:text-blue-600 ${index !== 0 ? 'border-t border-gray-200/10' : ''} ${index === 0 ? 'rounded-t-lg' : ''} ${index === link.children.length - 1 ? 'rounded-b-lg' : ''}`}
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link 
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                                            scrolled ? 'text-white hover:bg-white hover:bg-opacity-20 hover:text-blue-600' : 'text-gray-800 hover:bg-gray-200'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;