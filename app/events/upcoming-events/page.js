'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendar, FaClock } from 'react-icons/fa';

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
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
                        Upcoming Events
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
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
                                    {/* Event Image */}
                                    <div className="relative h-56 overflow-hidden">
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
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                            {event.name}
                                        </h3>

                                        {/* Event Date */}
                                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                                            <FaCalendar className="text-blue-500" />
                                            <span className="text-sm font-medium">
                                                {formatDate(event.date)}
                                            </span>
                                        </div>

                                        {/* Event Description */}
                                        <p className="text-gray-600 mb-6 line-clamp-3 flex-1">
                                            {event.description}
                                        </p>

                                        {/* View Details Button */}
                                        <Link href={`/events/${event.id}`}>
                                            <button className="btn bg-linear-to-r from-blue-600 to-cyan-500 text-white border-none w-full hover:shadow-lg transition-all">
                                                View Details
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
                                    <FaCalendar className="mr-2" />
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
