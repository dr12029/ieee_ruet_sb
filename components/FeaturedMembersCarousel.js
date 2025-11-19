'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { getFeaturedMembers } from '@/data/executiveMembers';

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
    const cardWidth = 320 + 32; // 320px card width + 32px gap (8 * 4)
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
    <section className="py-20 bg-linear-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-200 opacity-20 rounded-full -top-48 -right-48 blur-3xl"></div>
        <div className="absolute w-96 h-96 bg-purple-200 opacity-20 rounded-full -bottom-48 -left-48 blur-3xl"></div>
      </div>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Executive <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Members</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the distinguished leaders shaping the future of IEEE RUET Student Branch
          </p>
        </div>

        {/* Infinite Scroll Container */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Gradient Mask Overlay - Hidden on small devices */}
          <div 
            className="hidden md:block absolute left-0 top-0 bottom-0 w-80 pointer-events-none z-20"
            style={{
              background: 'linear-gradient(to right, rgb(249, 250, 251) 0%, transparent 100%)'
            }}
          ></div>
          
          {/* Right Gradient Mask Overlay - Hidden on small devices */}
          <div 
            className="hidden md:block absolute right-0 top-0 bottom-0 w-80 pointer-events-none z-20"
            style={{
              background: 'linear-gradient(to left, rgb(249, 250, 251) 0%, transparent 100%)'
            }}
          ></div>

          <div 
            ref={scrollRef}
            className="flex gap-8"
            style={{
              width: 'fit-content',
              willChange: 'transform',
            }}
          >
            {duplicatedMembers.map((member, index) => (
              <div
                key={`${member.id}-${index}`}
                ref={(el) => (cardRefs.current[index] = el)}
                className="shrink-0 w-80"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-105">
                  {/* Rounded Image */}
                  <div className="flex justify-center pt-8 pb-6">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden ring-4 ring-blue-100 shadow-xl">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-500 to-cyan-500">
                          <div className="text-6xl font-bold text-white">
                            {member.name.charAt(0)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-6 pb-8 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-14">
                      {member.name}
                    </h3>
                    <p className="text-base text-blue-600 font-semibold line-clamp-1">
                      {member.position}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {member.organization}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/executive-committee"
            className="btn-primary group"
          >
            <span className="relative z-10">View All Executive Members</span>
            <div className="btn-primary-shine -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMembersCarousel;
