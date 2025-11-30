'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';

const formatDate = (dateString) => {
  if (!dateString) return 'Coming Soon';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

export default function UpcomingEventsSection() {
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

  if (loading) {
    return (
      <section className="relative py-24 bg-linear-to-br from-blue-50 via-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
      </section>
    );
  }

  if (!events || events.length === 0) {
    return (
      <section className="relative py-24 bg-linear-to-br from-blue-50 via-cyan-50 to-blue-50 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-blue-200 opacity-30 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Upcoming <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Events</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay tuned for exciting events
            </p>
          </div>

          {/* Empty State */}
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-linear-to-br from-blue-100 to-cyan-100 rounded-full mb-8">
              <FaCalendarAlt className="w-16 h-16 text-blue-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Something Amazing is Coming Soon!
            </h3>
            <p className="text-xl text-gray-600">
              We&apos;re preparing incredible events for you. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 bg-linear-to-br from-blue-50 via-cyan-50 to-blue-50 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-200 opacity-30 rounded-full -top-48 -left-48 blur-3xl"></div>
        <div className="absolute w-96 h-96 bg-cyan-200 opacity-30 rounded-full top-1/2 -right-48 blur-3xl"></div>
        <div className="absolute w-64 h-64 bg-blue-200 opacity-30 rounded-full -bottom-32 left-1/4 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full mb-6 shadow-lg">
            <FaCalendarAlt className="w-5 h-5" />
            <span className="font-bold">UPCOMING</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Don&apos;t Miss <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">What&apos;s Next</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join us for these exciting events and opportunities
          </p>
        </div>

        {/* Events Grid */}
        <div className="flex flex-col gap-12 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row p-5 md:p-6 gap-6 items-stretch"
            >
              {/* Content (Left on MD) */}
              <div className="w-full md:w-5/12 flex flex-col order-2 md:order-1 relative z-10">
                {/* Title - Grows to fill space */}
                <div className="flex-grow">
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-tight line-clamp-4 min-h-[3em] md:min-h-0">
                    {event.name || event.title}
                  </h3>
                </div>

                {/* Bottom Section: Divider + Meta + Button */}
                <div className="mt-auto">
                  {/* Divider */}
                  <div className="w-full h-px bg-gray-200 mb-5"></div>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-3 text-gray-700 text-lg">
                      <FaCalendarAlt className="text-blue-600 w-5 h-5" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 text-lg">
                      <FaMapMarkerAlt className="text-blue-600 w-5 h-5" />
                      <span>{event.venue || 'RUET Campus'}</span>
                    </div>
                  </div>

                  {/* Button */}
                  <Link
                    href={`/events/${event.id}`}
                    className="group/btn btn-primary w-full md:w-auto justify-center !py-3 !px-8 !text-base !rounded-xl"
                  >
                    <span className="relative z-10">View Event Details</span>
                    <div className="btn-primary-shine -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                    <FaArrowRight className="relative z-10 w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Image (Right on MD) */}
              <div className="w-full md:w-7/12 relative aspect-[2/1] order-1 md:order-2 rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={event.image}
                  alt={event.title || 'Event image'}
                  fill
                  className="object-cover transition-transform duration-700"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
