'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { FaUsers, FaCalendarAlt, FaNetworkWired, FaHandsHelping } from 'react-icons/fa';

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
      className="relative py-24 bg-linear-to-br from-blue-600 via-purple-600 to-cyan-500 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full -bottom-48 -right-48 animate-pulse delay-700"></div>
        <div className="absolute w-64 h-64 bg-cyan-300 opacity-20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            By The Numbers
          </h2>
          <p className="text-xl text-blue-100 font-light">
            Our journey in figures
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => {
            const Icon = icons[stat.label] || FaUsers;
            return (
              <div
                key={stat.id}
                className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-1 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105"
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl group-hover:rotate-12 transition-transform duration-500">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Counter */}
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-lg">
                    {counts[index]}
                    {stat.label === '+Events' && '+'}
                  </div>
                  <p className="text-lg md:text-xl font-semibold text-blue-100">
                    {stat.label}
                  </p>
                </div>

                {/* Decorative glow */}
                <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent"></div>
    </section>
  );
}
