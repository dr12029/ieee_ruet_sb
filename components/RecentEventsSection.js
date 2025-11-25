'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarDay, FaArrowRight } from 'react-icons/fa';

export default function RecentEventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events?featured=true');
        const data = await response.json();
        // Get the 3 most recent featured events
        const recentFeatured = (data.events || []).slice(0, 3);
        setEvents(recentFeatured);
      } catch (error) {
        console.error('Error fetching featured events:', error);
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
    }).toUpperCase();
  }

  if (loading) {
    return (
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
      </section>
    );
  }

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-100 opacity-30 rounded-full top-1/4 -left-48 blur-3xl"></div>
        <div className="absolute w-96 h-96 bg-cyan-100 opacity-30 rounded-full bottom-1/4 -right-48 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full mb-6 shadow-lg">
            <FaCalendarDay className="w-5 h-5" />
            <span className="font-bold">RECENT HIGHLIGHTS</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Iconic <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Events</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrating our successful events and memorable moments
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image with overlay */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />)
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight min-h-14 line-clamp-2">
                  {event.name}
                </h3>

                {/* Date badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-50 to-cyan-50 rounded-full mb-4">
                  <FaCalendarDay className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-600">
                    {formatDate(event.date)}
                  </span>
                </div>

                {/* View button */}
                <Link
                  href={`/events/${event.id}`}
                  className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 w-full justify-center"
                >
                  View Details
                  <FaArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-cyan-200/30 to-transparent rounded-bl-full"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/events/2021"
            className="group inline-flex items-center gap-3 px-12 py-5 bg-linear-to-r from-blue-600 to-cyan-500 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden relative"
          >
            <span className="relative z-10">Explore All Events</span>
            <FaArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            {/* Shine effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}
