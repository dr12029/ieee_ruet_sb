'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import { getUpcomingEvents } from '@/data/eventsData';
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

export default function UpcomingEventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ===== CURRENT: Load events directly from eventsData.js (no API call) =====
    const upcomingEvents = getUpcomingEvents();
    setEvents(upcomingEvents);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-linear-to-br from-blue-50 via-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
      </section>
    );
  }

  if (!events || events.length === 0) {
    return (
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-linear-to-br from-blue-50 via-cyan-50 to-blue-50 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-blue-200 opacity-30 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 sm:mb-4">
              Upcoming <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Events</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Stay tuned for exciting events
            </p>
          </motion.div>

          {/* Empty State */}
          <motion.div
            className="text-center py-12 sm:py-16 md:py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-linear-to-br from-blue-100 to-cyan-100 rounded-full mb-6 sm:mb-8">
              <FaCalendarAlt className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-blue-500" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4 px-4">
              Something Amazing is Coming Soon!
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
              We&apos;re preparing incredible events for you. Check back soon!
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-linear-to-br from-blue-50 via-cyan-50 to-blue-50 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-blue-200 opacity-30 rounded-full -top-32 sm:-top-48 -left-32 sm:-left-48 blur-3xl"></div>
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-cyan-200 opacity-30 rounded-full top-1/2 -right-32 sm:-right-48 blur-3xl"></div>
        <div className="absolute w-48 sm:w-64 h-48 sm:h-64 bg-blue-200 opacity-30 rounded-full -bottom-24 sm:-bottom-32 left-1/4 blur-3xl"></div>
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
            <span className="font-bold">UPCOMING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 sm:mb-4">
            Don&apos;t Miss <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">What&apos;s Next</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Join us for these exciting events and opportunities
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl flex flex-col md:flex-row p-4 sm:p-5 md:p-6 gap-4 sm:gap-5 md:gap-6 items-stretch"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Content (Left on MD) */}
              <div className="w-full md:w-5/12 flex flex-col order-2 md:order-1 relative z-10">
                {/* Title - Grows to fill space */}
                <div className="flex-grow">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight line-clamp-3 sm:line-clamp-4 min-h-[2.5em] sm:min-h-[3em] md:min-h-0">
                    {event.name || event.title}
                  </h3>
                </div>

                {/* Bottom Section: Divider + Meta + Button */}
                <div className="mt-auto">
                  {/* Divider */}
                  <div className="w-full h-px bg-gray-200 mb-3 sm:mb-4 md:mb-5"></div>

                  {/* Meta Info */}
                  <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base md:text-lg">
                      <FaCalendarAlt className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base md:text-lg">
                      <FaMapMarkerAlt className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{event.venue || 'RUET Campus'}</span>
                    </div>
                  </div>

                  {/* Button */}
                  <Link href={`/events/${event.id}`}>
                    <motion.button
                      className="btn-primary w-full md:w-auto justify-center !py-2.5 sm:!py-3 !px-5 sm:!px-8 !text-sm sm:!text-base !rounded-lg sm:!rounded-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">View Event Details</span>
                      <div className="btn-primary-shine -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <FaArrowRight className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Image (Right on MD) */}
              <div className="w-full md:w-7/12 relative aspect-[2/1] order-1 md:order-2 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={event.image}
                  alt={event.title || 'Event image'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
