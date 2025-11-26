import Image from 'next/image';
import Link from 'next/link';
import { getExecutivesByOrganization } from '@/data/executiveMembers';
import MemberCard from '@/components/MemberCard';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function IASChapter() {
  const members = getExecutivesByOrganization('IEEE RUET IAS SB Chapter');
  const advisor = members.find(m => m.position === 'Advisor');
  const chair = members.find(m => m.position === 'Chair');
  const secretary = members.find(m => m.position === 'Secretary');

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white text-gray-900 py-16 mt-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              IEEE RUET <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">IAS Student Branch Chapter</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Chapter Title */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
              IEEE RUET IAS Student Branch Chapter
            </h2>

            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
              <p className="text-gray-700 text-lg leading-relaxed mb-6 text-justify">
                <span className="font-bold text-gray-900">IEEE Industry Applications Society</span> enables the advancement of theory and practice in the design, development, manufacturing, and application of safe, sustainable, reliable, smart electrical systems, equipment, and services.
              </p>

              <p className="text-gray-700 text-lg leading-relaxed mb-6 text-justify">
                <span className="font-bold text-gray-900">IEEE RUET IAS Student Branch Chapter</span> is working hard to fulfill the mission and vision of IEEE IAS. It's a very active student branch chapter that is organizing many effective <span className="font-semibold">workshops, seminars, industrial tours</span> to gather industrial knowledge and to develop professional skills. <span className="font-semibold">Industrial tours, The workshop on Plasmonic Sensors, Short course on HVDC Power Transmission, Induct from the Smart Grid: The Role of IoT, WORKSHOP ON MATLAB/Simulink and PLC</span>, etc. are some of the event organized by IEEE RUET IAS Student Branch Chapter. Recently, IEEE RUET IAS Student Branch Chapter, in association with IEEE RUET Student Branch organized a visit to <span className="font-semibold">HDVC Back to Back Station, Bheramara, Kushtia on 5th March 2020</span>. It's a very friendly platform for knowledge sharing and skill development. IEEE RUET IAS Student Branch Chapter is improving the efficiency of its activities day by day. We are planning to organize more workshops, seminars, project showing and industrial tours for the benefits of the members of IEEE RUET SB. Its members will get more benefits in the future.
              </p>

              <p className="text-gray-700 text-lg leading-relaxed text-justify">
                <span className="font-bold text-gray-900">IEEE RUET IAS Student Branch Chapter</span> members will get the ability to enhance the professional skills and the opportunity for interpersonal connectivity in the industrial sector. Any current student member or graduate member of the IEEE RUET Student Branch is eligible to join IEEE RUET IAS Student Branch Chapter by applying and paying a nominal fee. IEEE Industry Applications Society is the best place for connecting thousands of other professionals from many different platforms for the betterment of your knowledge and skill.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href="https://web.facebook.com/ieeeruetsbias"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-2"
              >
                <FaFacebook className="w-5 h-5" />
                Facebook Page
              </a>
              <a
                href="https://www.linkedin.com/company/ieee-ruet-ias-student-branch-chapter/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-2"
              >
                <FaLinkedin className="w-5 h-5" />
                LinkedIn Page
              </a>
              <a
                href="https://www.instagram.com/ieee_ruet_ias_sbc/"
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

            <div className="bg-linear-to-br from-purple-50 to-blue-50 rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                {/* Left Side - Image and Info */}
                <div className="flex-shrink-0 lg:w-1/3">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-purple-400 shadow-xl ring-4 ring-purple-100">
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
                    <p className="text-purple-700 font-semibold mb-1">
                      Chair
                    </p>
                    <p className="text-sm text-gray-600">
                      IEEE RUET IAS SB Chapter
                    </p>
                  </div>
                </div>

                {/* Right Side - Quote */}
                <div className="flex-1 lg:w-2/3">
                  <div className="relative">
                    {/* Opening Quote */}
                    <svg className="absolute -top-4 -left-2 w-12 h-12 text-purple-300 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                    </svg>

                    <blockquote className="relative z-10">
                      <p className="text-gray-700 text-lg leading-relaxed italic pl-8 pr-8">
                        &ldquo;I am thankful to those esteemed individuals who trusted me with this significant role of the chair of IEEE RUET IAS Student Branch Chapter. As the chair, my objective is to arrange a set of industrial tours and workshops that will have a significant positive impact on the students&apos; academic pursuits and future professional journeys. Through close co-operation and collaboration with the executive committee and members of the IEEE RUET IAS Student Branch Chapter and IEEE RUET Student Branch, my ultimate aim is to lead the chapter to unprecedented heights of success.&rdquo;
                      </p>
                    </blockquote>

                    {/* Closing Quote */}
                    <svg className="absolute -bottom-4 -right-2 w-12 h-12 text-purple-300 opacity-50 rotate-180" fill="currentColor" viewBox="0 0 24 24">
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
            <div className="w-32 h-1 bg-linear-to-r from-purple-600 to-blue-600 mx-auto mb-12"></div>

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
