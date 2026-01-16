'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { getFeaturedMembers } from '@/data/executiveMembers';
import { motion } from 'framer-motion';

const FeaturedMembersCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const featuredMembers = getFeaturedMembers();
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const scrollPositionRef = useRef(0); // Persist scroll position
  const cardRefs = useRef([]);

  // Duplicate members multiple times for seamless infinite scroll
  const duplicatedMembers = [...featuredMembers, ...featuredMembers];

  // Calculate mask gradient based on card position
  const updateCardMask = () => {
    if (!containerRef.current) return;

    // Disable mask on small devices (below md breakpoint: 768px)
    const isSmallDevice = window.innerWidth < 768;

    const containerRect = containerRef.current.getBoundingClientRect();
    const fadeDistance = 250; // Distance over which fade occurs

    cardRefs.current.forEach((card) => {
      if (!card) return;

      // Skip masking on small devices
      if (isSmallDevice) {
        card.style.webkitMaskImage = 'none';
        card.style.maskImage = 'none';
        return;
      }

      const cardRect = card.getBoundingClientRect();
      const cardLeft = cardRect.left;
      const cardRight = cardRect.right;
      const containerLeft = containerRect.left;
      const containerRight = containerRect.right;

      let maskImage = 'none';

      // Card is entering from the left
      if (cardLeft < containerLeft && cardRight > containerLeft) {
        const visibleWidth = cardRight - containerLeft;
        const fadePercentage = Math.min(100, (visibleWidth / fadeDistance) * 100);
        maskImage = `linear-gradient(to right, transparent, black ${fadePercentage}%)`;
      }
      // Card is exiting to the right
      else if (cardRight > containerRight && cardLeft < containerRight) {
        const visibleWidth = containerRight - cardLeft;
        const fadeStart = 100 - Math.min(100, ((cardRect.width - visibleWidth) / fadeDistance) * 100);
        maskImage = `linear-gradient(to right, black ${fadeStart}%, transparent)`;
      }

      card.style.webkitMaskImage = maskImage;
      card.style.maskImage = maskImage;
    });
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;
    // Responsive card width: smaller on mobile
    const isMobile = window.innerWidth < 640;
    const cardWidth = isMobile ? (256 + 16) : (320 + 32); // 256px or 320px card width + gap
    const totalWidth = cardWidth * featuredMembers.length;

    const animate = () => {
      if (!isPaused) {
        scrollPositionRef.current += 0.5; // Adjust speed here (higher = faster)

        // Reset position seamlessly when we've scrolled through one set
        if (scrollPositionRef.current >= totalWidth) {
          scrollPositionRef.current = 0;
        }
      }

      scrollContainer.style.transform = `translateX(-${scrollPositionRef.current}px)`;
      updateCardMask(); // Update mask on each frame
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPaused, featuredMembers.length]);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-linear-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-blue-200 opacity-20 rounded-full -top-32 sm:-top-48 -right-32 sm:-right-48 blur-3xl"></div>
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-purple-200 opacity-20 rounded-full -bottom-32 sm:-bottom-48 -left-32 sm:-left-48 blur-3xl"></div>
      </div>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
            Executive <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Members</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Meet the distinguished leaders shaping the future of IEEE RUET Student Branch
          </p>
        </motion.div>

        {/* Infinite Scroll Container */}
        <div
          ref={containerRef}
          className="relative overflow-hidden w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Left Gradient Mask Overlay - Hidden on small devices */}
          <div
            className="hidden md:block absolute left-0 top-0 bottom-0 w-40 lg:w-80 pointer-events-none z-20"
            style={{
              background: 'linear-gradient(to right, rgb(249, 250, 251) 0%, transparent 100%)'
            }}
          ></div>

          {/* Right Gradient Mask Overlay - Hidden on small devices */}
          <div
            className="hidden md:block absolute right-0 top-0 bottom-0 w-40 lg:w-80 pointer-events-none z-20"
            style={{
              background: 'linear-gradient(to left, rgb(249, 250, 251) 0%, transparent 100%)'
            }}
          ></div>

          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 md:gap-8"
            style={{
              width: 'fit-content',
              willChange: 'transform',
            }}
          >
            {duplicatedMembers.map((member, index) => (
              <motion.div
                key={`${member.id}-${index}`}
                ref={(el) => (cardRefs.current[index] = el)}
                className="shrink-0 w-64 sm:w-72 md:w-80"
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full transition-all duration-300 active:shadow-xl">
                  {/* Rounded Image */}
                  <div className="flex justify-center pt-5 sm:pt-6 md:pt-8 pb-4 sm:pb-5 md:pb-6">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden ring-3 sm:ring-4 ring-blue-100 shadow-xl">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-500 to-cyan-500">
                          <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                            {member.name.charAt(0)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-4 sm:px-5 md:px-6 pb-5 sm:pb-6 md:pb-8 text-center">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.5rem]">
                      {member.name}
                    </h3>
                    <p className="text-sm sm:text-base text-blue-600 font-semibold line-clamp-1">
                      {member.position}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">
                      {member.organization}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-8 sm:mt-10 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a href="/executive-committee">
            <motion.button
              className="btn-primary group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10">View All Executive Members</span>
              <div className="btn-primary-shine -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedMembersCarousel;
