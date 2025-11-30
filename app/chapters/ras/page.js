import Image from 'next/image';
import Link from 'next/link';
import { getExecutivesByOrganization } from '@/data/executiveMembers';
import MemberCard from '@/components/MemberCard';


export default function RASChapter() {
  const members = getExecutivesByOrganization('IEEE RUET RAS SB Chapter');
  const advisor = members.find(m => m.position === 'Advisor');
  const chair = members.find(m => m.position === 'Chair');
  const viceChair = members.find(m => m.position === 'Vice Chair');
  const secretary = members.find(m => m.position === 'Secretary');
  const membershipCoordinator = members.find(m => m.position === 'Membership Development Coordinator');

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white text-gray-900 py-16 mt-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              IEEE RUET <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">RAS Student Branch Chapter</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Chapter Title */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
              IEEE RUET RAS Student Branch Chapter
            </h2>

            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
              <p className="text-gray-700 text-lg leading-relaxed mb-6 text-justify">
                IEEE RUET Robotics and Automation Society Student Branch Chapter started the journey with the intent on barter the knowledge in the field of <span className="font-semibold">Automation, Robotics</span> and <span className="font-semibold">IOT based systems</span> spread among the students of all kinds. The target of IEEE RUET RAS Student Branch Chapter has exhorted the progress to simplify human life with the knowledge of <span className="font-semibold">robotics and automation</span>. In the era of robotics technology autonomously serve many fields in associate with the human being.
              </p>

              <p className="text-gray-700 text-lg leading-relaxed mb-6 text-justify">
                IEEE RUET RAS encourage the IEEE members also non-members for work in the field of <span className="font-semibold">robotics, applies research on robotics</span> for the development of the world. IEEE RUET RAS Student Branch Chapter sets a number of <span className="font-semibold">seminars, day-long workshops, as well as conferences on Robotics, Automation, IoT technology</span>. IEEE RUET RAS Student Branch Chapter will mainly focus on automation to enhance the performance in the automation field, for this we will planning for a seminar every month and will also focus the practical as well as theoretical issues for development in this field in IoT based system and progress the research in this field in Bangladesh and try to spread the knowledge and importance of this technology in every kind of people.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <a
                href="https://web.facebook.com/IEEE-RUET-RAS-Student-Branch-Chapter-112822840091059"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook Page
              </a>
              <a
                href="https://www.instagram.com/ieee_ruet_ras/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram Page
              </a>
              <a
                href="https://www.youtube.com/channel/UCbIiuDPODLgjJmWH-Wo9vVQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Youtube Channel
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

            <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                {/* Left Side - Image and Info */}
                <div className="flex-shrink-0 lg:w-1/3">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-blue-400 shadow-xl ring-4 ring-blue-100">
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
                    <p className="text-blue-700 font-semibold mb-1">
                      Chair
                    </p>
                    <p className="text-sm text-gray-600">
                      IEEE RUET RAS SB Chapter
                    </p>
                  </div>
                </div>

                {/* Right Side - Quote */}
                <div className="flex-1 lg:w-2/3">
                  <div className="relative">
                    {/* Opening Quote */}
                    <svg className="absolute -top-4 -left-2 w-12 h-12 text-blue-300 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                    </svg>

                    <blockquote className="relative z-10">
                      <p className="text-gray-700 text-lg leading-relaxed italic pl-8 pr-8">
                        &ldquo;As the chair of the IEEE RUET RAS Student Branch Chapter, it is my honor to lead this dynamic community of robotics and automation enthusiasts. Together, we strive to foster innovation, knowledge sharing, and hands-on experiences in the world of robotics and automation. Our vision is to embrace the power of collaboration and dedication to create a brighter future through technology and conduct an exciting journey of learning and exploration.&rdquo;
                      </p>
                    </blockquote>

                    {/* Closing Quote */}
                    <svg className="absolute -bottom-4 -right-2 w-12 h-12 text-blue-300 opacity-50 rotate-180" fill="currentColor" viewBox="0 0 24 24">
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
              {viceChair && <MemberCard member={viceChair} />}
              {secretary && <MemberCard member={secretary} />}
              {membershipCoordinator && <MemberCard member={membershipCoordinator} />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
