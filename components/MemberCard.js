import Image from 'next/image';
import { FaLinkedin, FaFacebook, FaEnvelope } from 'react-icons/fa';

const MemberCard = ({ member }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
      {/* Rounded Image at Top */}
      <div className="flex justify-center pt-8 pb-6 bg-linear-to-b from-blue-50 to-white">
        <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-blue-100 shadow-lg">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-500 to-cyan-500">
              <div className="text-5xl font-bold text-white">
                {member.name.charAt(0)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="px-6 pb-6">
        {/* Name, Position, Organization - Fixed height for alignment */}
        <div className="text-left mb-4 h-28">
          <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight line-clamp-2">
            {member.name}
          </h3>
          <p className="text-base font-semibold text-blue-600 mb-0.5 line-clamp-1">
            {member.position}
          </p>
          <p className="text-sm text-gray-600 leading-snug line-clamp-2">
            {member.organization}
          </p>
        </div>

        {/* Divider Line */}
        <div className="border-t-2 border-gray-200 my-4"></div>

        {/* Details Section */}
        <div className="text-left space-y-1.5 mb-5 text-sm text-gray-700">
          {/* Student Year or Designation */}
          {member.designation && (
            <p className="font-medium text-gray-800">{member.designation}</p>
          )}
          {member.studentYear && (
            <p className="font-medium text-gray-800">{member.studentYear}</p>
          )}
          
          {/* Department */}
          <p className="text-gray-700">{member.department}</p>
          
          {/* University */}
          <p className="text-gray-600 text-xs leading-relaxed">
            {member.university}
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-3 pt-2">
          {/* LinkedIn */}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
              title="LinkedIn"
            >
              <FaLinkedin className="text-lg" />
            </a>
          )}

          {/* Facebook */}
          {member.facebook && (
            <a
              href={member.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
              title="Facebook"
            >
              <FaFacebook className="text-lg" />
            </a>
          )}

          {/* Email */}
          <a
            href={`mailto:${member.email}`}
            className="w-11 h-11 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white hover:from-cyan-600 hover:to-blue-600 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
            title="Email"
          >
            <FaEnvelope className="text-lg" />
          </a>

          {/* Website (for faculty) */}
          {member.website && (
            <a
              href={member.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white hover:from-purple-600 hover:to-indigo-600 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
              title="Website"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
