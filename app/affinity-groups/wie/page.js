import Image from 'next/image';
import Link from 'next/link';
import { getExecutivesByOrganization } from '@/data/executiveMembers';
import MemberCard from '@/components/MemberCard';


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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              IEEE RUET <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">WIE SB AG</span>
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

                IEEE RUET WIE SB AG is becoming a part of the leading team in changing the face of engineering. It is connected to the global network of nearly 20,000 members in over 100 countries to advance women in technology at all points in their life and career. It is a community that is working alongside IEEE RUET Student Branch to ensure an environment for women to grow, break the stereotype and be a role model. We are really very delighted to be a part of IEEE Women in Engineering, the largest technical organization aiming at helping women to advance in the several spheres of technical disciplines.

                We hope that women who aspire to utilize their potential in science and technology will get benefitted from us and we will ensure every possible opportunity for them. We try to make sure that they can surpass the barriers of stereotype threat and implicit bias to participate in the betterment of humanity.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <a
                href="https://web.facebook.com/ieeeruetwiesbaffinitygroup"
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
                href="https://www.linkedin.com/company/ieee-ruet-wie-student-branch-affinity-group/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-800 transition-all duration-300 hover:scale-105"
              >
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn Page
              </a>
              <a
                href="https://www.instagram.com/ieee_ruet_wie_sb_ag/"
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
