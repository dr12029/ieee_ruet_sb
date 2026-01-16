'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const VisionMission = () => {
  const [activeTab, setActiveTab] = useState('what');

  const tabs = [
    { id: 'what', label: 'What', index: 0 },
    { id: 'why', label: 'Why', index: 1 },
    { id: 'who', label: 'Who', index: 2 }
  ];

  const content = {
    what: "IEEE, Institute of Electrical and Electronics Engineers is the world's largest nonprofit technical organization with a goal to improve humanity with the resources of electrical and electronic industries. IEEE doesn't work with graduates only. One of its goals is to develop students from their core to innovate and standardize the electrical and electronics industry. IEEE is solely dedicated to one purpose and that is \"advancing in technology for the benefit of humanity.\"",
    why: "IEEE was found with the goal to innovate and benefit human society. Working with graduates only doesn't fulfill that goal completely. In order to inspire future generations with the purpose of student, branches were found where students can work with the graduates and learn from them. Student branches were formed with a vision to develop the students for a more innovative and standardized future where they can contribute more for the benefit of human society. Student branches are the place where students get to learn from the experts first hand and nourish themselves.",
    who: "IEEE RUET SB was formed on the purpose of developing humanity with the advancement of technology. This branch consists of energetic members who work hard to promote IEEE among RUET students. IEEE RUET SB reaches out to general students with the benefits of IEEE membership and the goals that IEEE wants to achieve for human society. IEEE RUET SB organizes various events throughout the year in order to help the students. IEEE RUET SB recognizes various events which are wanted by the students to help in their academic life and their mental growth. IEEE RUET SB promotes IEEE and tries to a prominent student branch."
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-blue-100 opacity-30 rounded-full -top-32 sm:-top-48 -left-32 sm:-left-48 blur-3xl"></div>
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-cyan-100 opacity-30 rounded-full -bottom-32 sm:-bottom-48 -right-32 sm:-right-48 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Logo */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-56 lg:h-56">
            <Image
              src="/ruet-sb.png"
              alt="IEEE RUET SB Logo"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          className="text-center mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Our Vision & <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Mission</span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-center text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto px-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Empowering innovation, inspiring excellence, and advancing technology for humanity
        </motion.p>

        {/* Tab Buttons - Mobile Optimized */}
        <motion.div
          className="flex justify-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex gap-2 sm:gap-3 md:gap-4 relative">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-4 
                  font-semibold text-sm sm:text-base md:text-lg 
                  transition-all duration-300 ease-in-out
                  border-2 rounded-lg overflow-hidden
                  ${activeTab === tab.id
                    ? 'text-white border-transparent'
                    : 'text-gray-700 border-gray-300 bg-white'
                  }
                `}
                whileHover={{ scale: activeTab === tab.id ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated background for active tab */}
                {activeTab === tab.id && (
                  <motion.span
                    className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-500"
                    layoutId="activeTab"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content Area with Animation */}
        <motion.div
          className="bg-linear-to-br from-gray-50 to-blue-50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:px-10 md:pt-10 md:pb-4 lg:px-12 lg:pt-12 lg:pb-2 shadow-lg sm:shadow-xl border border-gray-100 min-h-[280px] sm:min-h-[300px] relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-linear-to-br from-blue-400 to-cyan-400 opacity-10 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-20 sm:w-32 h-20 sm:h-32 bg-linear-to-tr from-blue-400 to-cyan-400 opacity-10 rounded-tr-full"></div>

          {/* Content with AnimatePresence for smooth transitions */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed text-justify"
              >
                {content[activeTab]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMission;
