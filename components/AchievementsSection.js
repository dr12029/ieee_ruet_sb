'use client';

import { FaTrophy, FaMedal, FaStar } from 'react-icons/fa';
import Link from 'next/link';

export default function AchievementsSection({ achievements }) {
  const icons = [FaTrophy, FaMedal, FaStar];
  
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-100 opacity-30 rounded-full -top-48 -right-48 blur-3xl"></div>
        <div className="absolute w-96 h-96 bg-cyan-100 opacity-30 rounded-full top-1/2 -left-48 blur-3xl"></div>
        <div className="absolute w-64 h-64 bg-blue-100 opacity-40 rounded-full -bottom-32 right-1/4 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Our <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Achievements</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Recognitions and honors that define our excellence
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {achievements.map((achievement, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={achievement.id}
                className="group relative bg-linear-to-br from-white to-blue-50 rounded-3xl p-3 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-blue-100"
              >
                {/* Decorative corner gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-400/20 to-transparent rounded-tr-3xl rounded-bl-full"></div>
                
                <div className="relative text-center">
                  {/* Icon with animated gradient background */}
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-2xl mb-6 shadow-lg transform group-hover:rotate-6 transition-transform duration-500">
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                  
                  {/* Title Text */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 px-4">
                    {achievement.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed font-medium px-2">
                    {achievement.description}
                  </p>
                  
                  {/* Decorative shine effect */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/achievements"
            className="btn-primary group"
          >
            <span className="relative z-10 flex items-center gap-3">
              Explore All Achievements
              <FaTrophy className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" />
            </span>
            <div className="btn-primary-shine -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}
