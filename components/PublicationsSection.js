'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaBook, FaArrowRight } from 'react-icons/fa';

export default function PublicationsSection({ publications }) {
  return (
    <section className="relative py-24 bg-linear-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-100 opacity-30 rounded-full -top-48 right-1/4 blur-3xl"></div>
        <div className="absolute w-96 h-96 bg-cyan-100 opacity-30 rounded-full -bottom-48 left-1/4 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full mb-6 shadow-lg">
            <FaBook className="w-5 h-5" />
            <span className="font-bold">PUBLICATIONS</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Knowledge <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Shared</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our contributions to the academic and technical community
          </p>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
          {publications.map((publication, index) => (
            <div
              key={publication.id}
              className="group relative"
            >
              {/* Card container */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
                {/* Publication cover with perspective effect */}
                <div className="relative h-[500px] overflow-hidden bg-linear-to-br from-gray-100 to-gray-50 p-8">
                  <div className="relative h-full transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-700">
                    <Image
                      src={publication.image}
                      alt={publication.title}
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                  
                  {/* Decorative corner ribbon */}
                  <div className="absolute top-0 right-0">
                    <div className="bg-linear-to-br from-blue-500 to-cyan-600 text-white px-6 py-2 shadow-lg transform rotate-45 translate-x-8 -translate-y-8">
                      <span className="text-xs font-bold">NEW</span>
                    </div>
                  </div>
                </div>

                {/* Title badge */}
                <div className="p-6 text-center">
                  <div className="inline-block px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full shadow-lg">
                    Issue #{index + 1}
                  </div>
                </div>

                {/* Decorative glow effect */}
                <div className="absolute inset-0 bg-linear-to-tr from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-white px-6 py-2 rounded-full shadow-lg border-4 border-blue-100">
                  <FaBook className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-8">
          <Link
            href="/publications"
            className="group inline-flex items-center gap-3 px-12 py-5 bg-linear-to-r from-blue-600 to-cyan-500 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden relative"
          >
            <span className="relative z-10">Explore All Publications</span>
            <FaArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            {/* Shine effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}
