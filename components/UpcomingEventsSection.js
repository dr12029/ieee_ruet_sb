'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

export default function UpcomingEventsSection({ events }) {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Event badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
                    EVENT #{index + 1}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
                  {event.title}
                </h3>
                
                <Link
                  href={event.link}
                  className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  View Event Details
                  <FaArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-linear-to-tl from-cyan-200/30 to-transparent rounded-tl-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
