'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [titleText, setTitleText] = useState('');
  const [subtitleText, setSubtitleText] = useState('');
  const [descText, setDescText] = useState('');
  const [showButton, setShowButton] = useState(false);

  const fullTitle = "IEEE";
  const fullSubtitle = "RUET STUDENT BRANCH";
  const fullDesc = "Rajshahi University of Engineering & Technology, Rajshahi-6204, Bangladesh";

  useEffect(() => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const typeWriter = async () => {
      // Initial delay
      await sleep(200);

      // Type Title
      for (let i = 0; i <= fullTitle.length; i++) {
        setTitleText(fullTitle.substring(0, i));
        await sleep(100);
      }

      // Start Subtitle and Description concurrently
      const typeSubtitle = async () => {
        for (let i = 0; i <= fullSubtitle.length; i++) {
          setSubtitleText(fullSubtitle.substring(0, i));
          await sleep(50);
        }
      };

      const typeDesc = async () => {
        for (let i = 0; i <= fullDesc.length; i++) {
          setDescText(fullDesc.substring(0, i));
          await sleep(20);
        }
      };

      await Promise.all([typeSubtitle(), typeDesc()]);

      await sleep(200);
      setShowButton(true);
    };

    typeWriter();
  }, []);

  return (
    <section className="relative min-h-[70vh] sm:min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-indigo-50 to-purple-100 overflow-hidden py-10 sm:py-0">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 sm:w-32 h-20 sm:h-32 bg-blue-300/20 rounded-full blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-40 right-10 sm:right-20 w-16 sm:w-24 h-16 sm:h-24 bg-purple-300/20 rounded-full blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-28 sm:w-40 h-28 sm:h-40 bg-indigo-300/20 rounded-full blur-2xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.25, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-20 sm:w-28 h-20 sm:h-28 bg-cyan-300/20 rounded-full blur-2xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
        <motion.div
          className="hidden sm:block absolute bottom-1/4 right-1/4 w-36 h-36 bg-violet-300/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* IEEE Text - Mobile optimized */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-1 sm:mb-4 tracking-tight min-h-[1.2em]">
          <span className="text-gray-900">{titleText}</span>
        </h1>

        {/* RUET STUDENT BRANCH - Mobile optimized */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-6 md:mb-8 tracking-wide min-h-[1.2em]">
          <span className="bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
            {subtitleText}
          </span>
        </h2>

        {/* Divider Line */}
        <div className={`w-full max-w-4xl mx-auto h-0.5 sm:h-1 bg-linear-to-r from-transparent via-gray-800 to-transparent mb-3 sm:mb-6 md:mb-8 transition-opacity duration-1000 ${descText ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* University Address - Mobile optimized */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-800 font-semibold mb-6 sm:mb-10 md:mb-12 max-w-3xl mx-auto min-h-[1.5em] px-2">
          {descText}
        </p>

        {/* About Us Button - with tap animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showButton ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Link href="/about/ruet-sb">
            <motion.button
              className="btn-primary group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10">About Us</span>
              <div className="btn-primary-shine -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 bg-linear-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;
