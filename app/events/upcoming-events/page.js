'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

export default function UpcomingEventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch('/api/events?type=upcoming');
                const data = await response.json();
                setEvents(data.events || []);
            } catch (error) {
                console.error('Error fetching upcoming events:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                    <p className="mt-4 text-gray-600">Loading events...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-12 mt-8">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Upcoming</span> Events
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join us for exciting technical workshops, seminars, and competitions
                    </p>
                </div>

                {/* Events Grid or Stay Tuned Message */}
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {events.map((event) => (
                            <div key={event.id}>
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                    {/* Event Image */}
                                    <div className="relative w-full aspect-[2/1] overflow-hidden">
                                        <Image
                                            src={event.image}
                                            alt={event.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Event Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        {/* Event Name */}
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[4rem]">
                                            {event.name}
                                        </h3>

                                        {/* Spacer */}
                                        <div className="h-4"></div>

                                        {/* Date and Venue */}
                                        <div className="flex justify-between items-center text-gray-600 mb-4">
                                            <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-blue-500" />
                                                <span className="text-sm font-medium">
                                                    {formatDate(event.date)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaMapMarkerAlt className="text-blue-500" />
                                                <span className="text-sm font-medium">
                                                    {event.venue || 'RUET Campus'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Event Description */}
                                        <p className="text-gray-600 mb-6 line-clamp-3 flex-1">
                                            {event.description}
                                        </p>

                                        {/* View Details Button */}
                                        <Link href={`/events/${event.id}`}>
                                            <button className="group btn-primary w-full justify-center !py-3 !text-base !rounded-xl">
                                                <span className="relative z-10">View Details</span>
                                                <div className="btn-primary-shine -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                                <FaArrowRight className="relative z-10 ml-2" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto text-center py-20">
                        <div className="bg-white rounded-3xl shadow-xl p-12">
                            <div className="mb-6">
                                <FaClock className="w-24 h-24 text-blue-500 mx-auto mb-6 animate-pulse" />
                            </div>
                            <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Stay Tuned!
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">
                                Exciting events are coming soon. Follow us on social media to stay updated!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/events/past-events/2025"
                                    className="btn bg-linear-to-r from-blue-600 to-cyan-500 text-white border-none hover:shadow-xl transition-all"
                                >
                                    <FaCalendarAlt className="mr-2" />
                                    Explore Past Events
                                </Link>
                                <Link
                                    href="/contact"
                                    className="btn btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
