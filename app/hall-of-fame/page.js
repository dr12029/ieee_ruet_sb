'use client';

import { useState, useEffect } from 'react';
import YearSelector from '@/components/YearSelector';
import Loader from '@/components/Loader';

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

  if (!members || members.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 break-inside-avoid mb-8">
      <h3 className={`text-2xl font-bold mb-4 pb-3 border-b-2 ${styles.title}`}>
        {title}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="w-12 px-2 py-3 text-left text-sm font-semibold text-gray-700">#</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Designation</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((member, index) => (
              <tr key={member._id || member.id || index} className={`${styles.rowHover} transition-colors`}>
                <td className="w-12 px-2 py-3 text-sm text-gray-600">{member.displayOrder || index + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {member.position}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{member.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function HallOfFame() {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (activeSession) {
      fetchMembers(activeSession);
    }
  }, [activeSession]);

  const fetchSessions = async () => {
    try {
      const res = await fetch('/api/executive-committee?isActive=false');
      const data = await res.json();
      
      if (data.success) {
        const availableSessions = data.sessions || [];
        setSessions(availableSessions);
        
        if (availableSessions.length > 0) {
            let foundSession = null;
            // Find first session with members
            for (const session of availableSessions) {
                try {
                    const memRes = await fetch(`/api/executive-committee?session=${session}&isActive=false`);
                    const memData = await memRes.json();
                    if (memData.success && memData.members && memData.members.length > 0) {
                        foundSession = session;
                        break;
                    }
                } catch (e) {
                    console.error("Error checking session members", e);
                }
            }
            setActiveSession(foundSession || availableSessions[0]);
        }
      } else {
        setError(data.error || 'Failed to fetch sessions');
      }
    } catch (err) {
      console.error('Error fetching sessions:', err);
      setError('Failed to load sessions');
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async (session) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/executive-committee?session=${session}&isActive=false`);
      const data = await res.json();
      
      if (data.success) {
        setMembers(data.members || []);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch members');
      }
    } catch (err) {
      console.error('Error fetching members:', err);
      setError('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  // Group members by organization
  const groupMembersByOrganization = () => {
    const grouped = {};
    
    members.forEach(member => {
      const org = member.organization;
      if (!grouped[org]) {
        grouped[org] = [];
      }
      grouped[org].push(member);
    });

    // Sort members within each organization by displayOrder
    Object.keys(grouped).forEach(org => {
      grouped[org].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    });

    return grouped;
  };

  const chapters = [
    { org: 'IEEE RUET SB', title: 'IEEE RUET SB', color: 'blue' },
    { org: 'IEEE RUET WIE SB AG', title: 'IEEE RUET WIE SB AG', color: 'pink' },
    { org: 'IEEE RUET IAS SB Chapter', title: 'IEEE RUET IAS SB Chapter', color: 'purple' },
    { org: 'IEEE RUET RAS SB Chapter', title: 'IEEE RUET RAS SB Chapter', color: 'blue' },
    { org: 'IEEE CS RUET SB Chapter', title: 'IEEE CS RUET SB Chapter', color: 'indigo' },
    { org: 'IEEE RUET SPS SB Chapter', title: 'IEEE RUET SPS SB Chapter', color: 'orange' },
  ];

  const groupedMembers = groupMembersByOrganization();

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
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Session Based Executive Committee
            </h2>
          </div>
        </div>
      </section>

      {/* Dropdown Selection */}
      {sessions.length > 0 && (
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
      )}

      {/* Content Section */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-16">
                <Loader />
                <p className="text-gray-600 mt-4">Loading hall of fame data...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-xl text-red-600 mb-4">⚠️ {error}</p>
                <button 
                  onClick={fetchSessions}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            ) : members.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">No hall of fame data available for this session.</p>
              </div>
            ) : (
              <div className="columns-1 lg:columns-2 gap-8 space-y-8 lg:space-y-0">
                {chapters.map((chapter) => (
                  <ChapterTable
                    key={chapter.org}
                    title={chapter.title}
                    members={groupedMembers[chapter.org] || []}
                    color={chapter.color}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}