import Image from 'next/image';

export default function Region10Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-blue-600 via-purple-600 to-cyan-500 text-white py-20 mt-16 overflow-hidden">
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-white to-transparent opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-blue-600 to-transparent opacity-30"></div>

        {/* Animated Background Circles */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
              IEEE Region 10
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-light">
              Asia Pacific Region
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto mb-16">
          {/* Region 10 Logo */}
          <div className="flex justify-center mb-12">
            <Image
              src="/about/r10-logo.png"
              alt="IEEE Region 10 Logo"
              width={300}
              height={120}
              className="object-contain"
            />
          </div>

          {/* All Content in One Card */}
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-200">
            {/* Introduction Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">IEEE Region 10</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed text-justify">
                <p>
                  A Region is an enclosure that is widely divided by bodily features, human impact features, and the interaction of humanity and the ecosystem. IEEE has been split up into 10 geographical units called &apos;Regions&apos;. The United States of America has been divided into Region 1 to Region 6. Canada falls under Region 7. Europe, Middle East, and Africa have been categorized into Region 8. Again, Region 9 consists of only Latin America. On the other hand, Asia and the Pacific have been placed as Region 10. The main objective of the Region is to support the worldwide technology community to enhance the quality of living for humanity. As IEEE is the world&apos;s largest technical organization so the needs of its members are met swiftly after proper divisions which are known as Regions. Membership recruitment, retention strategies, and implementation are better carried out consequently. The volunteers are always informed, and their activities coordinated so that their respective regions remain most vibrant and active among 10 geographical regions in IEEE.
                </p>
                <p>
                  The geographic units of IEEE (Sections, Chapters, Affinity Groups, and Student Branches) prepare distinctive opportunities for members to participate in presentations and leadership conveniences so that they can make a positive reputation in IEEE members&apos; jobs and careers.
                </p>
              </div>
            </div>

            {/* Executive Committee Image */}
            <div className="mb-12">
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <Image
                  src="/about/img1.jpg"
                  alt="2020 IEEE Region 10 Executive Committee Meeting"
                  width={1200}
                  height={600}
                  className="w-full h-auto rounded-lg"
                />
                <p className="text-sm text-gray-600 italic mt-4 text-center">
                  Image: <span className="font-semibold">2020 IEEE Region 10 Executive Committee Meeting</span> (Source https://www.ieer10.org)
                </p>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Region 10 Overview</h2>
              <p className="text-gray-700 leading-relaxed text-justify mb-8">
                Region 10 has the most extensive number of members compared to the other regions. It is usually referred to as the Asia Pacific Region. It is the unique Region in IEEE showing steady growth in membership and counts more than 135,000 members by the end of 2019, the number is almost 32% of the entire membership of IEEE. A total of 58 Sections and 6 Councils alone are in Asia and Pacific along with
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold text-xl">•</span>
                      <span><span className="font-semibold">35</span> Subsections</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold text-xl">•</span>
                      <span><span className="font-semibold">44</span> WIE Affinity Groups</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold text-xl">•</span>
                      <span><span className="font-semibold">46</span> YP Affinity Groups</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-linear-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold text-xl">•</span>
                      <span><span className="font-semibold">14</span> Life Members Affinity Groups</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold text-xl">•</span>
                      <span><span className="font-semibold">697</span> Chapters, and</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold text-xl">•</span>
                      <span><span className="font-semibold">1600</span> Student Branches</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed text-justify">
                There is a total of 5 IEEE facilities under Region 10 which are in Singapore, Beijing, Bangalore, Tokyo, and Shenzhen to assist IEEE members in all ways possible. The organizational units collaborate to deliver better services and value to their members.
              </p>
            </div>

            {/* Operations Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">IEEE Asia-Pacific Office Operations</h2>
              <p className="text-gray-700 leading-relaxed text-justify mb-6">
                The IEEE Asia-Pacific office&apos;s main objective is to serve the members in the Region 10 by assisting its Committees and Director&apos;s in their activities. Operations are:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-600">
                  <span className="text-blue-600 font-bold text-xl shrink-0">→</span>
                  <p className="text-gray-700">
                    The office encourages the Director and Committee members to plan, organize and coordinate the meeting of Region 10
                  </p>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-cyan-600">
                  <span className="text-cyan-600 font-bold text-xl shrink-0">→</span>
                  <p className="text-gray-700">
                    The office assists the Region 10 Coordinators in advancing IEEE membership and their activities
                  </p>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-purple-600">
                  <span className="text-purple-600 font-bold text-xl shrink-0">→</span>
                  <p className="text-gray-700">
                    The office encourages the formation of new IEEE organizational units
                  </p>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-pink-600">
                  <span className="text-pink-600 font-bold text-xl shrink-0">→</span>
                  <p className="text-gray-700">
                    The office collects and reports responses from volunteers and members on IEEE procedures, benefits, and services for the region
                  </p>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                  <span className="text-blue-500 font-bold text-xl shrink-0">→</span>
                  <p className="text-gray-700">
                    The office endeavors to work with Societies to promote the IEEE, society memberships and technical activities in the region
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More About Button - Outside */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center">
            <a
              href="https://www.ieeer10.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-700 ease-in-out transform hover:scale-105"
            >
              More About Region 10
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="h-2 bg-linear-to-r from-blue-600 via-purple-600 to-cyan-500"></div>
    </div>
  );
}
