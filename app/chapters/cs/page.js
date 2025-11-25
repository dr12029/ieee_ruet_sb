import Image from 'next/image';
import Link from 'next/link';
import { getExecutivesByOrganization } from '@/data/executiveMembers';
import MemberCard from '@/components/MemberCard';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function CSChapter() {
  const members = getExecutivesByOrganization('IEEE CS RUET SB Chapter');
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
              IEEE CS RUET Student Branch Chapter
            </h1>
          </div>
        </div>
      </section>

      {/* Chapter Title */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
              IEEE CS RUET Student Branch Chapter
            </h2>

            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
              <p className="text-gray-700 text-lg leading-relaxed mb-6 text-justify">
                IEEE Computer Society RUET Student Branch Chapter was formed in 2019. The motto behind forming this chapter includes sharing the knowledge of the latest technological inventions among each other and all the other branches, as well as providing help to all the enthusiastic members in their desired fields. In the past one year after its forming, IEEE Computer Society RUET Student Branch Chapter has arranged some effective event, the biggest of which was its flagship event labeled <span className="font-semibold">"IEEE Computer Society BDC Meet & Greet 2019: Rajshahi"</span>. This chapter arranges seminars from time to time on different topics, including higher studies' opportunities in different countries and so on.
              </p>

              <p className="text-gray-700 text-lg leading-relaxed text-justify">
                The focus of this chapter has always been to provide enough help to the enthusiastic student members and to encourage them to take a step towards more technological advancement.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href="https://www.facebook.com/IEEECSRUETSBC"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-2"
              >
                <FaFacebook className="w-5 h-5" />
                Facebook Page
              </a>
              <a
                href="https://www.linkedin.com/company/ieee-computer-society-ruet-sbc/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-2"
              >
                <FaLinkedin className="w-5 h-5" />
                LinkedIn Page
              </a>
              <a
                href="https://www.instagram.com/ieeecsruetsbc/"
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

            <div className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                {/* Left Side - Image and Info */}
                <div className="flex-shrink-0 lg:w-1/3">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-indigo-400 shadow-xl ring-4 ring-indigo-100">
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
                    <p className="text-indigo-700 font-semibold mb-1">
                      Chair
                    </p>
                    <p className="text-sm text-gray-600">
                      IEEE CS RUET SB Chapter
                    </p>
                  </div>
                </div>

                {/* Right Side - Quote */}
                <div className="flex-1 lg:w-2/3">
                  <div className="relative">
                    {/* Opening Quote */}
                    <svg className="absolute -top-4 -left-2 w-12 h-12 text-indigo-300 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                    </svg>

                    <blockquote className="relative z-10">
                      <p className="text-gray-700 text-lg leading-relaxed italic pl-8 pr-8">
                        &ldquo;I am humbled to serve as the Chair of IEEE Computer Society RUET Student Branch Chapter—a chapter known for its remarkable activities and promise in Bangladesh. It is my privilege to lead this community of talented individuals to explore the vast benefits of the computer field and create opportunities for them that will expose our members to advancing technologies and foster their growth and innovation. Together, we will strive to maintain our position as the &quot;Best Computer Society Student Branch Chapter&quot; in Bangladesh.&rdquo;
                      </p>
                    </blockquote>

                    {/* Closing Quote */}
                    <svg className="absolute -bottom-4 -right-2 w-12 h-12 text-indigo-300 opacity-50 rotate-180" fill="currentColor" viewBox="0 0 24 24">
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
