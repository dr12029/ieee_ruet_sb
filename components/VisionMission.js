'use client';

import { useState } from 'react';
import Image from 'next/image';

const VisionMission = () => {
  const [activeTab, setActiveTab] = useState('what');
  const [direction, setDirection] = useState('right');

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

  const handleTabClick = (newTabId) => {
    const currentIndex = tabs.find(tab => tab.id === activeTab).index;
    const newIndex = tabs.find(tab => tab.id === newTabId).index;

    // Determine animation direction
    setDirection(newIndex > currentIndex ? 'right' : 'left');
    setActiveTab(newTabId);
  };

  const getActiveIndex = () => tabs.find(tab => tab.id === activeTab).index;

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-100 opacity-30 rounded-full -top-48 -left-48 blur-3xl"></div>
        <div className="absolute w-96 h-96 bg-cyan-100 opacity-30 rounded-full -bottom-48 -right-48 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48 md:w-56 md:h-56">
            <Image
              src="/ruet-sb.png"
              alt="IEEE RUET SB Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our Vision & <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Mission</span>
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Empowering innovation, inspiring excellence, and advancing technology for humanity
        </p>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex gap-4 relative">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  relative px-10 py-4 font-semibold text-lg transition-all duration-300 ease-in-out
                  border-2 rounded-lg overflow-hidden
                  ${activeTab === tab.id
                    ? 'text-white border-transparent'
                    : 'text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600 bg-white'
                  }
                `}
              >
                {/* Animated background for active tab */}
                {activeTab === tab.id && (
                  <span
                    className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-500"
                  ></span>
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area with Animation */}
        <div className="bg-linear-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:px-12 md:pt-12 md:pb-2 shadow-xl border border-gray-100 min-h-[300px] relative overflow-hidden">
          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-400 to-cyan-400 opacity-10 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-blue-400 to-cyan-400 opacity-10 rounded-tr-full"></div>

          {/* Content with slide transition */}
          <div className="relative z-10">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`
                  transition-all duration-500 ease-in-out
                  ${activeTab === tab.id
                    ? 'opacity-100 translate-x-0'
                    : direction === 'right'
                      ? 'opacity-0 -translate-x-8 absolute inset-0 pointer-events-none'
                      : 'opacity-0 translate-x-8 absolute inset-0 pointer-events-none'
                  }
                `}
              >
                <p className="text-gray-700 text-lg leading-relaxed text-justify">
                  {content[tab.id]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
