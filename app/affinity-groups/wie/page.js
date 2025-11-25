import Image from 'next/image';
import Link from 'next/link';
import { getExecutivesByOrganization } from '@/data/executiveMembers';
import MemberCard from '@/components/MemberCard';
import { FaFacebook, FaLinkedin, FaInstagram, FaEye } from 'react-icons/fa';

export default function WIEAffinityGroup() {
  const members = getExecutivesByOrganization('IEEE RUET WIE SB AG');
  const advisor = members.find(m => m.position === 'Advisor');
  const chair = members.find(m => m.position === 'Chair');
  const secretary = members.find(m => m.position === 'Secretary');
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white text-gray-900 py-16 mt-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
              IEEE RUET WIE SB AG
            </h1>
          </div>
        </div>
      </section>

      {/* WIE Title */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
              IEEE RUET WIE Student Branch Affinity Group
            </h2>

            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
              <p className="text-gray-700 text-lg leading-relaxed mb-6 text-justify">
                IEEE RUET WIE Student Branch affinity group is a platform dedicated to promoting <span className="font-bold text-gray-900">women engineers and scientists and inspiring girls</span> around the world to follow their academic interests to a career in engineering. It is a team of lively and enthusiastic members who works hard to provide facilities to women to follow their academic interests in a career in engineering and science. It is a place where women can find opportunities to fulfill their dream and overcome the challenges to prove their worth. We give them a platform to excel in their skills in the field of science and technology and contribute to the welfare of humanity. It also helps to improve their discipline, teamwork and organizing skill while working in a professional environment. WIE members make lifelong friendships, acquire influential mentors, and make a difference for the benefit of humanity.
              </p>

              <div className="flex justify-center">
                <button className="btn-secondary-2">
                  <FaEye className="w-5 h-5" />
                  View More Details
                </button>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href="https://web.facebook.com/ieeeruetwiesbaffinitygroup"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-2"
              >
                <FaFacebook className="w-5 h-5" />
                Facebook Page
              </a>
              <a
                href="https://www.linkedin.com/company/ieee-ruet-wie-student-branch-affinity-group/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-2"
              >
                <FaLinkedin className="w-5 h-5" />
                LinkedIn Page
              </a>
              <a
                href="https://www.instagram.com/ieee_ruet_wie_sb_ag/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-2"
              >
                <FaInstagram className="w-5 h-5" />
                Instagram Page
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Chair's Message */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Message from the Chair
            </h2>

            <div className="bg-linear-to-br from-pink-50 to-rose-50 rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                {/* Left Side - Image and Info */}
                <div className="flex-shrink-0 lg:w-1/3">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-pink-400 shadow-xl ring-4 ring-pink-100">
                      {chair?.image ? (
                        <Image
                          src={chair.image}
                          alt={chair.name}
                          width={160}
                          height={160}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <Image
                          src="/team/default-avatar.jpg"
                          alt="Chair"
                          width={160}
                          height={160}
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {chair?.name || 'Chair Name'}
                    </h3>
                    <p className="text-pink-700 font-semibold mb-1">
                      Chair
                    </p>
                    <p className="text-sm text-gray-600">
                      IEEE RUET WIE SB AG
                    </p>
                  </div>
                </div>

                {/* Right Side - Quote */}
                <div className="flex-1 lg:w-2/3">
                  <div className="relative">
                    {/* Opening Quote */}
                    <svg className="absolute -top-4 -left-2 w-12 h-12 text-pink-300 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                    </svg>

                    <blockquote className="relative z-10">
                      <p className="text-gray-700 text-lg leading-relaxed italic pl-8 pr-8">
                        &ldquo;I am humbled and honored to be appointed as the Chair of our esteemed affinity group. My ambition is to cultivate an environment where every member feels valued, supported, and empowered to excel in engineering. Together, we will promote gender equality, foster skill development, and engage in impactful outreach initiatives. Let&apos;s unite our diverse talents and passion to create a lasting impact within our community and beyond. Thank you for entrusting me with this responsibility. I am thrilled to lead and work alongside each of you.&rdquo;
                      </p>
                    </blockquote>

                    {/* Closing Quote */}
                    <svg className="absolute -bottom-4 -right-2 w-12 h-12 text-pink-300 opacity-50 rotate-180" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Committee */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              Meet the executive committee
            </h2>
            <div className="w-32 h-1 bg-linear-to-r from-purple-600 to-pink-600 mx-auto mb-12"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advisor && <MemberCard member={advisor} />}
              {chair && <MemberCard member={chair} />}
              {secretary && <MemberCard member={secretary} />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
