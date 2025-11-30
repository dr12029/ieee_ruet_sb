'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getSessions, getSessionData } from '@/data/hallOfFameData';
import OrganizationTable from '@/components/OrganizationTable';
import YearSelector from '@/components/YearSelector';

const colorVariants = {
  blue: {
    title: 'text-blue-700 border-blue-200',
    rowHover: 'hover:bg-blue-50',
  },
  pink: {
    title: 'text-pink-700 border-pink-200',
    rowHover: 'hover:bg-pink-50',
  },
  purple: {
    title: 'text-purple-700 border-purple-200',
    rowHover: 'hover:bg-purple-50',
  },
  indigo: {
    title: 'text-indigo-700 border-indigo-200',
    rowHover: 'hover:bg-indigo-50',
  },
  orange: {
    title: 'text-orange-700 border-orange-200',
    rowHover: 'hover:bg-orange-50',
  },
};

const ChapterTable = ({ title, members, color }) => {
  const styles = colorVariants[color] || colorVariants.blue;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 break-inside-avoid mb-8">
      <h3 className={`text-2xl font-bold mb-4 pb-3 border-b-2 ${styles.title}`}>
        {title}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-50">
              <th className="w-12 px-2 py-3 text-left text-sm font-semibold text-gray-700">#</th>
              <th className="w-48 px-2 py-3 text-left text-sm font-semibold text-gray-700">Designation</th>
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.no} className={`${styles.rowHover} transition-colors`}>
                <td className="w-12 px-2 py-3 text-sm text-gray-600">{member.no}</td>
                <td className="w-48 px-2 py-3 text-sm font-medium text-gray-900 break-words">
                  {member.designation}
                </td>
                <td className="px-2 py-3 text-sm text-gray-700 break-words">{member.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function HallOfFame() {
  const sessions = getSessions();
  const [activeSession, setActiveSession] = useState(sessions[0]);

  const sessionData = getSessionData(activeSession);

  const chapters = [
    { key: 'sb', title: 'IEEE RUET SB', color: 'blue' },
    { key: 'wie', title: 'IEEE RUET WIE SB AG', color: 'pink' },
    { key: 'ias', title: 'IEEE RUET IAS SB Chapter', color: 'purple' },
    { key: 'ras', title: 'IEEE RUET RAS SB Chapter', color: 'blue' },
    { key: 'cs', title: 'IEEE CS RUET SB Chapter', color: 'indigo' },
    { key: 'sps', title: 'IEEE RUET SPS SB Chapter', color: 'orange' },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white text-gray-900 py-16 mt-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              IEEE RUET SB <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Hall of Fame</span>
            </h1>
            <p className="text-xl text-gray-600">
              Honoring our past leaders and their contributions
            </p>
          </div>
        </div>
      </section>

      {/* Session Title Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Session Based Executive Committee
            </h2>
          </div>
        </div>
      </section>

      {/* Dropdown Selection */}
      <section className="py-6 bg-gray-50 border-b-2 border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <YearSelector
              years={sessions}
              selectedYear={activeSession}
              onYearChange={setActiveSession}
              label="Select Session Year:"
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {sessionData && (
              <div className="columns-1 lg:columns-2 gap-8 space-y-8 lg:space-y-0">
                {chapters.map((chapter) => {
                  if (sessionData[chapter.key]) {
                    return (
                      <ChapterTable
                        key={chapter.key}
                        title={chapter.title}
                        members={sessionData[chapter.key]}
                        color={chapter.color}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}