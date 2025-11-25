import Image from 'next/image';
import Link from 'next/link';
import { getExecutivesByOrganization } from '@/data/executiveMembers';
import MemberCard from '@/components/MemberCard';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
              IEEE RUET RAS Student Branch Chapter
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
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-2"
              >
                <FaFacebook className="w-5 h-5" />
                Facebook Page
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-2"
              >
                <FaInstagram className="w-5 h-5" />
                Instagram Page
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-2"
              >
                <FaYoutube className="w-5 h-5" />
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
