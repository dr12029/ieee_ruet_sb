'use client';

import { FaTrophy, FaMedal, FaStar } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AchievementsSection({ achievements }) {
  const icons = [FaTrophy, FaMedal, FaStar];

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-blue-100 opacity-30 rounded-full -top-32 sm:-top-48 -right-32 sm:-right-48 blur-3xl"></div>
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-cyan-100 opacity-30 rounded-full top-1/2 -left-32 sm:-left-48 blur-3xl"></div>
        <div className="absolute w-48 sm:w-64 h-48 sm:h-64 bg-blue-100 opacity-40 rounded-full -bottom-24 sm:-bottom-32 right-1/4 blur-3xl"></div>
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Achievements</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Recognitions and honors that define our excellence
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
          {achievements.map((achievement, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={achievement.id}
                className="group relative bg-linear-to-br from-white to-blue-50 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-lg sm:shadow-xl border border-blue-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Decorative corner gradient */}
                <div className="absolute top-0 right-0 w-20 sm:w-28 md:w-32 h-20 sm:h-28 md:h-32 bg-linear-to-br from-blue-400/20 to-transparent rounded-tr-2xl sm:rounded-tr-3xl rounded-bl-full"></div>

                <div className="relative text-center">
                  {/* Icon with animated gradient background */}
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-xl sm:rounded-2xl mb-4 sm:mb-5 md:mb-6 shadow-lg"
                    whileHover={{ rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                  </motion.div>

                  {/* Title Text */}
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 px-2 sm:px-4">
                    {achievement.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium px-1 sm:px-2">
                    {achievement.description}
                  </p>

                  {/* Decorative shine effect */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/achievements">
            <motion.button
              className="btn-primary group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                Explore All Achievements
                <FaTrophy className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-500" />
              </span>
              <div className="btn-primary-shine -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
