import Image from 'next/image';
import Link from 'next/link';
import { getExecutivesByOrganization } from '@/data/executiveMembers';
import MemberCard from '@/components/MemberCard';

export default function IASChapter() {
  const members = getExecutivesByOrganization('IEEE RUET IAS SB Chapter');
  const advisor = members.find(m => m.position === 'Advisor');
  const chair = members.find(m => m.position === 'Chair');
  const secretary = members.find(m => m.position === 'Secretary');
  
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-purple-700 via-purple-600 to-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              IEEE RUET IAS Student Branch Chapter
            </h1>
          </div>
        </div>
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 fill-gray-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Chapter Logo and Title */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Image
                  src="/about/ias_sc.gif"
                  alt="IEEE IAS Logo"
                  width={200}
                  height={150}
                  className="object-contain"
                />
                <p className="text-center text-green-600 font-semibold mt-2">
                  IEEE RUET IAS Student Branch Chapter
                </p>
              </div>
            </div>

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
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook Page
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn Page
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
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
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                    </svg>
                    
                    <blockquote className="relative z-10">
                      <p className="text-gray-700 text-lg leading-relaxed italic pl-8 pr-8">
                        &ldquo;I am thankful to those esteemed individuals who trusted me with this significant role of the chair of IEEE RUET IAS Student Branch Chapter. As the chair, my objective is to arrange a set of industrial tours and workshops that will have a significant positive impact on the students&apos; academic pursuits and future professional journeys. Through close co-operation and collaboration with the executive committee and members of the IEEE RUET IAS Student Branch Chapter and IEEE RUET Student Branch, my ultimate aim is to lead the chapter to unprecedented heights of success.&rdquo;
                      </p>
                    </blockquote>

                    {/* Closing Quote */}
                    <svg className="absolute -bottom-4 -right-2 w-12 h-12 text-purple-300 opacity-50 rotate-180" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
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
