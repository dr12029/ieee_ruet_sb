'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendar } from 'react-icons/fa';
import YearSelector from '@/components/YearSelector';

export default function PastEventsPage() {
    const params = useParams();
    const router = useRouter();
    const year = params.year;

    const [events, setEvents] = useState([]);
    const [years, setYears] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch('/api/events?type=past');
                const data = await response.json();

                // Use years from API response (already filtered for past events)
                setYears(data.years || []);

                // Filter events by selected year
                const yearEvents = data.events.filter(e => e.year === year);
                setEvents(yearEvents);
            } catch (error) {
                console.error('Error fetching past events:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, [year]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function handleYearChange(newYear) {
        router.push(`/events/past-events/${newYear}`);
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                    <p className="mt-4 text-gray-600">Loading events...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-12 mt-8">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
                        Our Past Events
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore our rich history of technical excellence and community engagement
                    </p>
                </div>

                {/* Year Selector */}
                <div className="mb-12">
                    <YearSelector
                        years={years}
                        selectedYear={year}
                        onYearChange={handleYearChange}
                        label="Select Year:"
                    />
                </div>

                {/* Events Grid or No Events Message */}
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

                                        {/* Featured Badge */}
                                        {event.featured && (
                                            <div className="absolute top-4 right-4 bg-linear-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                                Featured
                                            </div>
                                        )}
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
                            <div className="text-8xl mb-6">📅</div>
                            <h2 className="text-4xl font-bold mb-4 text-gray-800">
                                No Events in {year}
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">
                                We didn't host any events this year. Check out other years to explore our event history.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {years.length > 1 && (
                                    <button
                                        onClick={() => handleYearChange(years.find(y => y !== year) || years[0])}
                                        className="btn bg-linear-to-r from-blue-600 to-cyan-500 text-white border-none hover:shadow-xl transition-all"
                                    >
                                        <FaCalendar className="mr-2" />
                                        Browse Other Years
                                    </button>
                                )}
                                <Link
                                    href="/events/upcoming-events"
                                    className="btn btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                                >
                                    Upcoming Events
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
