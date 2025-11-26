'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getSessions, getSessionData } from '@/data/hallOfFameData';
import OrganizationTable from '@/components/OrganizationTable';
import YearSelector from '@/components/YearSelector';

export default function HallOfFame() {
  const sessions = getSessions();
  const [activeSession, setActiveSession] = useState(sessions[0]);

  const sessionData = getSessionData(activeSession);

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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - IEEE RUET SB */}
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-2xl font-bold text-blue-700 mb-4 pb-3 border-b-2 border-blue-200">
                    IEEE RUET SB
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
                        {sessionData.sb.map((member) => (
                          <tr key={member.no} className="hover:bg-blue-50 transition-colors">
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

                {/* Right Column - Chapters & AG */}
                <div className="space-y-8">
                  {/* WIE */}
                  {sessionData.wie && (
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-2xl font-bold text-pink-700 mb-4 pb-3 border-b-2 border-pink-200">
                        IEEE RUET WIE SB AG
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
                            {sessionData.wie.map((member) => (
                              <tr key={member.no} className="hover:bg-pink-50 transition-colors">
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
                  )}

                  {/* IAS */}
                  {sessionData.ias && (
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-2xl font-bold text-purple-700 mb-4 pb-3 border-b-2 border-purple-200">
                        IEEE RUET IAS SB Chapter
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
                            {sessionData.ias.map((member) => (
                              <tr key={member.no} className="hover:bg-purple-50 transition-colors">
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
                  )}

                  {/* RAS */}
                  {sessionData.ras && (
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-2xl font-bold text-blue-700 mb-4 pb-3 border-b-2 border-blue-200">
                        IEEE RUET RAS SB Chapter
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
                            {sessionData.ras.map((member) => (
                              <tr key={member.no} className="hover:bg-blue-50 transition-colors">
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
                  )}

                  {/* CS */}
                  {sessionData.cs && (
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-2xl font-bold text-indigo-700 mb-4 pb-3 border-b-2 border-indigo-200">
                        IEEE CS RUET SB Chapter
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
                            {sessionData.cs.map((member) => (
                              <tr key={member.no} className="hover:bg-indigo-50 transition-colors">
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
                  )}

                  {/* SPS */}
                  {sessionData.sps && (
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-2xl font-bold text-orange-700 mb-4 pb-3 border-b-2 border-orange-200">
                        IEEE RUET SPS SB Chapter
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
                            {sessionData.sps.map((member) => (
                              <tr key={member.no} className="hover:bg-orange-50 transition-colors">
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
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}