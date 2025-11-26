'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaNewspaper, FaTimes } from 'react-icons/fa';

export default function FeaturedPage() {
    const [featuredItems, setFeaturedItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFeaturedItems() {
            try {
                const response = await fetch('/api/featured');
                const result = await response.json();
                setFeaturedItems(result.data || []);
            } catch (error) {
                console.error('Error fetching featured items:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchFeaturedItems();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Loading featured items...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-white text-gray-900 py-16 px-4 mt-16">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        IEEE RUET SB <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Featured</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our achievements and recognition in media and IEEE publications
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ${item.fullWidth ? 'lg:col-span-2' : ''}`}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
                                {/* Image */}
                                <div className="relative">
                                    <div className="relative w-full h-full min-h-[300px] cursor-pointer">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-contain"
                                            onClick={() => setSelectedItem(item)}
                                        />
                                    </div>
                                    <p className="absolute bottom-0 left-0 right-0 bg-white/90 text-gray-700 text-xs italic px-3 py-2 text-center">
                                        {item.source}
                                    </p>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col p-6 bg-white">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-700 mb-6 leading-relaxed text-sm flex-1 text-justify">
                                        {item.description}
                                    </p>

                                    {/* Buttons */}
                                    <div className="flex flex-col gap-2 mt-auto">
                                        <button
                                            onClick={() => setSelectedItem(item)}
                                            className="btn-secondary-2 w-full"
                                        >
                                            View Feature
                                        </button>
                                        {item.newsletterLink && (
                                            <a
                                                href={item.newsletterLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-secondary-2 w-full"
                                            >
                                                Newsletter
                                            </a>
                                        )}
                                        {item.eventLink && (
                                            <Link href={item.eventLink} className="btn-secondary-2 w-full">
                                                View Event
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedItem && (
                <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedItem(null)}
                >
                    <div
                        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
                            <h3 className="text-2xl font-bold text-gray-900">{selectedItem.title}</h3>
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="btn btn-circle btn-ghost"
                            >
                                <FaTimes className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <div className="relative w-full h-auto">
                                <Image
                                    src={selectedItem.modalImage}
                                    alt={selectedItem.title}
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto rounded-2xl"
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-3xl">
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="btn-secondary-2 w-full"
                            >
                                Close This Feature
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
