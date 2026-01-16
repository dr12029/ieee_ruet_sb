'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { FaUsers, FaCalendarAlt, FaNetworkWired, FaHandsHelping } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function StatisticsSection({ statistics }) {
  const [counts, setCounts] = useState(statistics.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const icons = {
    'Chapters': FaNetworkWired,
    'Affinity Group': FaHandsHelping,
    'Volunteers': FaUsers,
    '+Events': FaCalendarAlt,
  };

  const animateCounters = useCallback(() => {
    statistics.forEach((stat, index) => {
      let startValue = 0;
      const endValue = stat.count;
      const duration = 2000;
      const incrementTime = 30;
      const steps = duration / incrementTime;
      const increment = endValue / steps;

      const timer = setInterval(() => {
        startValue += increment;
        if (startValue >= endValue) {
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[index] = endValue;
            return newCounts;
          });
          clearInterval(timer);
        } else {
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[index] = Math.floor(startValue);
            return newCounts;
          });
        }
      }, incrementTime);
    });
  }, [statistics]);

  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, animateCounters]);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-linear-to-br from-blue-600 via-purple-600 to-cyan-500 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-white opacity-10 rounded-full -top-32 sm:-top-48 -left-32 sm:-left-48"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-white opacity-10 rounded-full -bottom-32 sm:-bottom-48 -right-32 sm:-right-48"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute w-48 sm:w-64 h-48 sm:h-64 bg-cyan-300 opacity-20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg">
            By The Numbers
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 font-light">
            Our journey in figures
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {statistics.map((stat, index) => {
            const Icon = icons[stat.label] || FaUsers;
            return (
              <motion.div
                key={stat.id}
                className="group relative bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
                  <motion.div
                    className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl"
                    whileHover={{ rotate: 12 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </motion.div>
                </div>

                {/* Counter */}
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-1 sm:mb-2 drop-shadow-lg">
                    {counts[index]}
                    {stat.label === '+Events' && '+'}
                  </div>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-blue-100">
                    {stat.label}
                  </p>
                </div>

                {/* Decorative glow */}
                <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 bg-linear-to-t from-white to-transparent"></div>
    </section>
  );
}
