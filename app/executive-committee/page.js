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
      <div className="bg-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
            IEEE RUET SB Executive Committee
          </h1>
          <p className="text-xl text-gray-600">
            Meet the dedicated leaders driving innovation and excellence
          </p>
        </div>
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
