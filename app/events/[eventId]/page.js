'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendar, FaMapMarkerAlt, FaClock, FaUsers, FaFacebook, FaArrowLeft, FaStar } from 'react-icons/fa';

export default function EventDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const eventId = params.eventId;

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvent() {
            try {
                const response = await fetch('/api/events');
                const data = await response.json();
                const foundEvent = data.events.find(e => e.id === eventId);

                if (foundEvent) {
                    setEvent(foundEvent);
                } else {
                    router.push('/events/upcoming-events');
                }
            } catch (error) {
                console.error('Error fetching event details:', error);
                router.push('/events/upcoming-events');
            } finally {
                setLoading(false);
            }
        }

        fetchEvent();
    }, [eventId, router]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function isUpcoming(dateString) {
        const eventDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return eventDate >= today;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                    <p className="mt-4 text-gray-600">Loading event details...</p>
                </div>
            </div>
        );
    }

    if (!event) {
        return null;
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 pt-24 pb-16">
            {/* Hero Section with Event Image */}
            <div className="max-w-6xl mx-auto px-6 md:px-12 mb-8">
                <div className="relative w-full aspect-[2/1] overflow-hidden rounded-3xl shadow-2xl">
                    <Image
                        src={event.image}
                        alt={event.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

                    {/* Back Button */}
                    <div className="absolute top-10 left-4 md:top-14 md:left-8 z-10">
                        <button
                            onClick={() => router.back()}
                            className="btn btn-circle bg-white/20 backdrop-blur-md border-none hover:bg-white/30 text-white"
                        >
                            <FaArrowLeft className="text-xl" />
                        </button>
                    </div>

                    {/* Event Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                        <div className="max-w-5xl">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                {event.featured && (
                                    <span className="badge bg-linear-to-r from-yellow-400 to-orange-500 border-none text-white px-4 py-3 gap-2 shadow-lg">
                                        <FaStar /> Featured Event
                                    </span>
                                )}
                                {isUpcoming(event.date) && (
                                    <span className="badge bg-linear-to-r from-green-400 to-emerald-500 border-none text-white px-4 py-3 shadow-lg">
                                        Upcoming
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg leading-tight">
                                {event.name}
                            </h1>
                            <div className="flex items-center gap-2 text-white/90 text-lg font-medium">
                                <FaCalendar />
                                <span>{formatDate(event.date)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Details Content */}
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-3xl font-bold mb-6 text-gray-900">About This Event</h2>
                            <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
                                {event.description}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 order-1 lg:order-2">
                        {/* Quick Info Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Quick Info</h3>

                            <div className="space-y-4">
                                {/* Date */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                        <FaCalendar className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Date</p>
                                        <p className="text-gray-900 font-semibold">{formatDate(event.date)}</p>
                                    </div>
                                </div>

                                {/* Time */}
                                {event.details?.time && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center shrink-0">
                                            <FaClock className="text-cyan-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Time</p>
                                            <p className="text-gray-900 font-semibold">{event.details.time}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Venue */}
                                {event.details?.venue && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                                            <FaMapMarkerAlt className="text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Venue</p>
                                            <p className="text-gray-900 font-semibold">{event.details.venue}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Participants/Attendance */}
                                {(event.details?.participants || event.details?.attendance) && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                                            <FaUsers className="text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Participants</p>
                                            <p className="text-gray-900 font-semibold">
                                                {event.details.participants || event.details.attendance}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Dynamic Details */}
                                {event.details && Object.entries(event.details).map(([key, value]) => {
                                    // Skip keys we already displayed above
                                    // if (['time', 'venue', 'participants', 'attendance'].includes(key)) return null;
                                    
                                    return (
                                        <div key={key} className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium capitalize">{key}</p>
                                                <p className="text-gray-900 font-semibold">{value}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                                <a
                                    href="https://www.facebook.com/ieeesbruet"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn bg-linear-to-r from-blue-600 to-blue-700 text-white border-none w-full hover:shadow-xl transition-all"
                                >
                                    <FaFacebook className="mr-2" />
                                    Visit Facebook Page
                                </a>

                                <Link
                                    href="/contact"
                                    className="btn btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 w-full"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
