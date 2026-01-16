'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaBook, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function PublicationsSection({ publications }) {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-linear-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-blue-100 opacity-30 rounded-full -top-32 sm:-top-48 right-1/4 blur-3xl"></div>
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-cyan-100 opacity-30 rounded-full -bottom-32 sm:-bottom-48 left-1/4 blur-3xl"></div>
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
            <FaBook className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-bold">PUBLICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 sm:mb-4">
            Knowledge <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Shared</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Our contributions to the academic and technical community
          </p>
        </motion.div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-5xl mx-auto mb-10 sm:mb-12 md:mb-16">
          {publications.map((publication, index) => (
            <motion.div
              key={publication.id}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Card container */}
              <motion.div
                className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl"
                whileHover={{ y: -12, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Publication cover with perspective effect */}
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden bg-linear-to-br from-gray-100 to-gray-50 p-4 sm:p-6 md:p-8">
                  <motion.div
                    className="relative h-full"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={publication.image}
                      alt={publication.title}
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </motion.div>

                  {/* Decorative corner ribbon */}
                  <div className="absolute top-0 right-0">
                    <div className="bg-linear-to-br from-blue-500 to-cyan-600 text-white px-4 sm:px-6 py-1 sm:py-2 shadow-lg transform rotate-45 translate-x-6 sm:translate-x-8 -translate-y-6 sm:-translate-y-8">
                      <span className="text-[10px] sm:text-xs font-bold">NEW</span>
                    </div>
                  </div>
                </div>

                {/* Decorative glow effect */}
                <div className="absolute inset-0 bg-linear-to-tr from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl"></div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center pt-4 sm:pt-6 md:pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/publications">
            <motion.button
              className="btn-primary group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10">Explore All Publications</span>
              <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              {/* Shine effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
