'use client';

import { useState, useEffect } from 'react';
import MemberCard from '@/components/MemberCard';

// Section Component
const Section = ({ title, members }) => {
  if (!members || members.length === 0) return null;
  
  return (
    <div className="mb-16">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-4 border-blue-500 inline-block">
        {title}
      </h2>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {members.map((member) => (
          <MemberCard key={member._id || member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

// Main Page Component
export default function ExecutiveCommittee() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/executive-committee?isActive=true');
      const data = await res.json();
      
      if (data.success) {
        setMembers(data.members || []);
      } else {
        setError(data.error || 'Failed to fetch members');
      }
    } catch (err) {
      console.error('Error fetching members:', err);
      setError('Failed to load executive committee members');
    } finally {
      setLoading(false);
    }
  };

  // Group members by organization and type
  const groupMembers = () => {
    const grouped = {
      leadership: [],
      sb: [],
      ias: [],
      ras: [],
      cs: [],
      wie: [],
      sps: [],
    };

    members.forEach(member => {
      // Advisors and counselors identified by position keywords
      const isAdvisor = member.position?.toLowerCase().includes('advisor') || 
                        member.position?.toLowerCase().includes('counselor');
      
      // Leadership & Guidance: Only show advisors/counselors from IEEE RUET SB
      if (isAdvisor && member.organization === 'IEEE RUET SB') {
        grouped.leadership.push(member);
      } else if (member.organization === 'IEEE RUET SB') {
        grouped.sb.push(member);
      } else if (member.organization === 'IEEE RUET IAS SB Chapter') {
        grouped.ias.push(member);
      } else if (member.organization === 'IEEE RUET RAS SB Chapter') {
        grouped.ras.push(member);
      } else if (member.organization === 'IEEE CS RUET SB Chapter') {
        grouped.cs.push(member);
      } else if (member.organization === 'IEEE RUET WIE SB AG') {
        grouped.wie.push(member);
      } else if (member.organization === 'IEEE RUET SPS SB Chapter') {
        grouped.sps.push(member);
      }
    });

    return grouped;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading executive committee...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchMembers}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const groupedMembers = groupMembers();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            IEEE RUET SB <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Executive Committee</span>
          </h1>
          <p className="text-xl text-gray-600">
            Meet the dedicated leaders driving innovation and excellence
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {members.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No executive committee members found.</p>
          </div>
        ) : (
          <>
            {/* Counselor & Advisors */}
            <Section
              title="Leadership & Guidance"
              members={groupedMembers.leadership}
            />

            {/* IEEE RUET Student Branch */}
            <Section
              title="IEEE RUET Student Branch"
              members={groupedMembers.sb}
            />

            {/* IEEE RUET IAS SB Chapter */}
            <Section
              title="IEEE RUET IAS SB Chapter"
              members={groupedMembers.ias}
            />

            {/* IEEE RUET RAS SB Chapter */}
            <Section
              title="IEEE RUET RAS SB Chapter"
              members={groupedMembers.ras}
            />

            {/* IEEE CS RUET SB Chapter */}
            <Section
              title="IEEE CS RUET SB Chapter"
              members={groupedMembers.cs}
            />

            {/* IEEE RUET WIE SB AG */}
            <Section
              title="IEEE RUET WIE SB AG"
              members={groupedMembers.wie}
            />

            {/* IEEE RUET SPS SB Chapter */}
            <Section
              title="IEEE RUET SPS SB Chapter"
              members={groupedMembers.sps}
            />
          </>
        )}
      </div>
    </div>
  );
}
