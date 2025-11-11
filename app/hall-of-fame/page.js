'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getSessions, getSessionData } from '@/data/hallOfFameData';
import OrganizationTable from '@/components/OrganizationTable';

export default function HallOfFame() {
  const sessions = getSessions();
  const [activeSession, setActiveSession] = useState(sessions[0]);
  
  const sessionData = getSessionData(activeSession);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section - Same as Executive Committee */}
      <section className="relative bg-linear-to-br from-purple-700 via-blue-600 to-cyan-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              IEEE RUET SB Hall of Fame
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Honoring our past leaders and their contributions
            </p>
          </div>
        </div>
        
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 fill-gray-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Image
              src="/team/ruet-sb.png"
              alt="IEEE RUET SB Logo"
              width={100}
              height={100}
              className="mx-auto mb-6"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Session Based Executive Committee
            </h2>
            <div className="w-32 h-1 bg-linear-to-r from-purple-600 via-blue-600 to-cyan-500 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Dropdown Selection */}
      <section className="py-6 bg-white border-b-2 border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 max-w-7xl mx-auto">
            <label htmlFor="session-select" className="text-lg font-semibold text-gray-700 whitespace-nowrap">
              Select Session Year:
            </label>
            <select
              id="session-select"
              value={activeSession}
              onChange={(e) => setActiveSession(e.target.value)}
              className="px-4 py-2.5 text-base font-medium text-gray-900 bg-white border-2 border-blue-300 rounded-lg shadow-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
            >
              {sessions.map((session) => (
                <option key={session} value={session}>
                  {session}
                </option>
              ))}
            </select>
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