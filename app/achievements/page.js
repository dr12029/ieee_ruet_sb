'use client';

import { useState } from 'react';
import Image from 'next/image';
import { achievementsData, getAchievementYears } from '@/data/achievementsData';
import { FaAward, FaTimes } from 'react-icons/fa';
import YearSelector from '@/components/YearSelector';

export default function AchievementsPage() {
  const years = getAchievementYears();
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedImage, setSelectedImage] = useState(null);

  const currentData = achievementsData[selectedYear];

  const openImageModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeImageModal}
        >
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full p-3 transition-colors duration-300 z-10"
            aria-label="Close"
          >
            <FaTimes className="w-6 h-6" />
          </button>
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Achievement"
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-white text-gray-900 py-16 mt-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Achievements</span>
            </h1>
            <p className="text-xl text-gray-600">
              Celebrating Excellence & Success Over The Years
            </p>
          </div>
        </div>
      </section>

      {/* Year Selection Section */}
      <section className="py-6 bg-white border-b-2 border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <YearSelector
              years={years}
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {/* Branch Achievements */}
          {currentData.branchAchievements.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Branch Achievements
                </h2>
                <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-cyan-500 mx-auto"></div>
              </div>

              {/* Image Gallery for 2025 */}
              {currentData.branchAchievements[0]?.images && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                  {currentData.branchAchievements[0].images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                      onClick={() => openImageModal(img)}
                    >
                      <div className="relative w-full h-64 bg-gray-200">
                        <Image
                          src={img}
                          alt={`Achievement ${selectedYear} - ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                          <span className="text-white font-semibold">Click to view</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Trophy/Certificate Display */}
              {!currentData.branchAchievements[0]?.images && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {currentData.branchAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-t-4 border-blue-600 ${achievement.image ? 'cursor-pointer' : ''
                        }`}
                      onClick={() => achievement.image && openImageModal(achievement.image)}
                    >
                      {achievement.image ? (
                        <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
                          <Image
                            src={achievement.image}
                            alt={achievement.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="mb-6">
                          <FaAward className="w-20 h-20 mx-auto text-yellow-500" />
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {achievement.title}
                      </h3>
                      <div className="w-16 h-1 bg-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Personal Achievements */}
          {currentData.personalAchievements.length > 0 && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Meet Our Awesome Members
                </h2>
                <div className="w-24 h-1 bg-linear-to-r from-purple-600 to-pink-500 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {currentData.personalAchievements.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row gap-6 p-6">
                      {/* Image Section */}
                      <div className="sm:w-2/5 shrink-0">
                        <div className="relative w-full h-64 sm:h-56 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 shadow-md">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover p-2"
                            sizes="(max-width: 640px) 100vw, 40vw"
                          />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="sm:w-3/5 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {member.name}
                        </h3>
                        <div className="w-16 h-1 bg-blue-600 mb-4"></div>
                        <ul className="space-y-3">
                          {member.achievements.map((achievement, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-gray-700"
                            >
                              <span className="text-blue-600 font-bold mt-0.5">•</span>
                              <span className="flex-1 leading-relaxed">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {currentData.branchAchievements.length === 0 &&
            currentData.personalAchievements.length === 0 && (
              <div className="text-center py-20">
                <FaAward className="w-24 h-24 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-xl">
                  No achievements recorded for {selectedYear}
                </p>
              </div>
            )}
        </div>
      </section>
    </main>
  );
}
