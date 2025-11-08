'use client';

import { executiveMembers } from '@/data/executiveMembers';
import MemberCard from '@/components/MemberCard';

// Section Component
const Section = ({ title, members }) => {
  return (
    <div className="mb-16">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-4 border-blue-500 inline-block">
        {title}
      </h2>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

// Main Page Component
export default function ExecutiveCommittee() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative mt-16 overflow-hidden">
        {/* Gradient fade at top */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-white to-transparent z-10"></div>
        
        {/* Main gradient background */}
        <div className="relative bg-linear-to-br from-blue-600 via-purple-600 to-cyan-500 text-white py-32 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full -top-48 -left-48 animate-pulse"></div>
            <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full -bottom-48 -right-48 animate-pulse delay-700"></div>
            <div className="absolute w-64 h-64 bg-cyan-300 opacity-20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-1000"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              IEEE RUET SB Executive Committee
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-light">
              Meet the dedicated leaders driving innovation and excellence
            </p>
          </div>
        </div>
        
        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent z-10"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Counselor & Advisors */}
        <Section
          title="Leadership & Guidance"
          members={[executiveMembers.counselor, ...executiveMembers.advisors]}
        />

        {/* IEEE RUET Student Branch */}
        <Section
          title="IEEE RUET Student Branch"
          members={executiveMembers.sbExecutives}
        />

        {/* IEEE RUET IAS SB Chapter */}
        <Section
          title="IEEE RUET IAS SB Chapter"
          members={[
            executiveMembers.iasChapter.advisor,
            ...executiveMembers.iasChapter.executives,
          ]}
        />

        {/* IEEE RUET RAS SB Chapter */}
        <Section
          title="IEEE RUET RAS SB Chapter"
          members={[
            executiveMembers.rasChapter.advisor,
            ...executiveMembers.rasChapter.executives,
          ]}
        />

        {/* IEEE CS RUET SB Chapter */}
        <Section
          title="IEEE CS RUET SB Chapter"
          members={[
            executiveMembers.csChapter.advisor,
            ...executiveMembers.csChapter.executives,
          ]}
        />

        {/* IEEE RUET WIE SB AG */}
        <Section
          title="IEEE RUET WIE SB AG"
          members={[
            executiveMembers.wieChapter.advisor,
            ...executiveMembers.wieChapter.executives,
          ]}
        />

        {/* IEEE RUET SPS SB Chapter */}
        <Section
          title="IEEE RUET SPS SB Chapter"
          members={[
            executiveMembers.spsChapter.advisor,
            ...executiveMembers.spsChapter.executives,
          ]}
        />
      </div>
    </div>
  );
}
