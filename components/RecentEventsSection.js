'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import { getFeaturedEvents } from '@/data/eventsData';
import { motion } from 'framer-motion';

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

export default function RecentEventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ===== CURRENT: Load events directly from eventsData.js (no API call) =====
    const featuredEvents = getFeaturedEvents();
    // Get the 3 most recent featured events
    const recentFeatured = featuredEvents.slice(0, 3);
    setEvents(recentFeatured);
    setLoading(false);

    // ===== UNCOMMENT BELOW & COMMENT ABOVE TO USE MONGODB API =====
    // async function fetchEvents() {
    //   try {
    //     const response = await fetch('/api/events?featured=true');
    //     const data = await response.json();
    //     const recentFeatured = (data.events || []).slice(0, 3);
    //     setEvents(recentFeatured);
    //   } catch (error) {
    //     console.error('Error fetching featured events:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // fetchEvents();
  }, []);

  function formatDateLocal(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).toUpperCase();
  }

  if (loading) {
    return (
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
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
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-blue-100 opacity-30 rounded-full top-1/4 -left-32 sm:-left-48 blur-3xl"></div>
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-cyan-100 opacity-30 rounded-full bottom-1/4 -right-32 sm:-right-48 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-full mb-4 sm:mb-6 shadow-lg text-sm sm:text-base">
            <FaCalendarAlt className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-bold">RECENT HIGHLIGHTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 sm:mb-4">
            Iconic <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Events</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Celebrating our successful events and memorable moments
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg flex flex-col p-3 sm:p-4 md:p-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Image (2:1 Aspect Ratio) */}
              <div className="relative w-full aspect-[2/1] overflow-hidden rounded-xl sm:rounded-2xl">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
                {/* Title (Min 3 lines space) */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 leading-tight line-clamp-3 min-h-[3.5em] sm:min-h-[4em] md:min-h-[4.5em]">
                  {event.name || event.title}
                </h3>

                {/* Divider */}
                <div className="w-full h-px bg-gray-200 mb-2 sm:mb-3 md:mb-4"></div>

                {/* Meta Info */}
                <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-5 md:mb-6 flex-grow">
                  <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                    <FaCalendarAlt className="text-blue-600 w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                    <FaMapMarkerAlt className="text-blue-600 w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">{event.venue || 'RUET Campus'}</span>
                  </div>
                </div>

                {/* View button */}
                <Link href={`/events/${event.id}`}>
                  <motion.button
                    className="btn-primary w-full justify-center !py-2.5 sm:!py-3 !px-4 sm:!px-6 !text-xs sm:!text-sm !rounded-lg sm:!rounded-xl mt-auto"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">View Event Details</span>
                    <div className="btn-primary-shine -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <FaArrowRight className="relative z-10 w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/events/2021">
            <motion.button
              className="btn-primary group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10">Explore All Events</span>
              <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              {/* Shine effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
