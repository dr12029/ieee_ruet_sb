'use client';

import Image from 'next/image';
import { FaLinkedin, FaFacebook, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MemberCard = ({ member }) => {
  return (
    <motion.div
      className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden border border-gray-100"
      whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Rounded Image at Top */}
      <div className="flex justify-center pt-6 sm:pt-8 pb-4 sm:pb-6 bg-linear-to-b from-blue-50 to-white">
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden ring-3 sm:ring-4 ring-blue-100 shadow-lg">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-500 to-cyan-500">
              <div className="text-4xl sm:text-5xl font-bold text-white">
                {member.name.charAt(0)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="px-4 sm:px-6 pb-5 sm:pb-6">
        {/* Name, Position, Organization - Fixed height for alignment */}
        <div className="text-left mb-3 sm:mb-4 h-24 sm:h-28">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 leading-tight line-clamp-2">
            {member.name}
          </h3>
          <p className="text-sm sm:text-base font-semibold text-blue-600 mb-0.5 line-clamp-1">
            {member.position}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 leading-snug line-clamp-2">
            {member.organization}
          </p>
        </div>

        {/* Divider Line */}
        <div className="border-t-2 border-gray-200 my-3 sm:my-4"></div>

        {/* Details Section */}
        <div className="text-left space-y-1 sm:space-y-1.5 mb-4 sm:mb-5 text-xs sm:text-sm text-gray-700">
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
        <div className="flex justify-center gap-2 sm:gap-3 pt-2">
          {/* LinkedIn */}
          {member.linkedin && (
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md"
              title="LinkedIn"
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <FaLinkedin className="text-base sm:text-lg" />
            </motion.a>
          )}

          {/* Facebook */}
          {member.facebook && (
            <motion.a
              href={member.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md"
              title="Facebook"
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <FaFacebook className="text-base sm:text-lg" />
            </motion.a>
          )}

          {/* Email */}
          <motion.a
            href={`mailto:${member.email}`}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-md"
            title="Email"
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <FaEnvelope className="text-base sm:text-lg" />
          </motion.a>

          {/* Website (for faculty) */}
          {member.website && (
            <motion.a
              href={member.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-md"
              title="Website"
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MemberCard;
