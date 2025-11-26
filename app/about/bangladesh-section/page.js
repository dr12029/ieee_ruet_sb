import Image from 'next/image';

export default function BangladeshSectionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white text-gray-900 py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              IEEE <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Bangladesh Section</span>
            </h1>
            <p className="text-xl text-gray-600">
              Advancing Technology in Bangladesh
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto mb-16">
          {/* Bangladesh Section Logo */}
          <div className="flex justify-center mb-12">
            <Image
              src="/about/bds-logo.png"
              alt="IEEE Bangladesh Section Logo"
              width={300}
              height={120}
              className="object-contain"
            />
          </div>

          {/* All Content in One Card */}
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-200">
            {/* Introduction Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">IEEE Bangladesh Section</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed text-justify">
                <p>
                  Being a Local branch of IEEE, IEEE Bangladesh Section is one of the finest and most popular sections by member growth and activities among all other sections around the world. IEEE Bangladesh Section was formed on 20th November 1993. Currently, the IEEE Bangladesh Section has 42 Student Branches along with 9 Society chapters and 2 affinity groups.
                </p>
              </div>
            </div>

            {/* Region 10 Information */}
            <div className="mb-12">
              <p className="text-gray-700 leading-relaxed text-justify">
                <span className="font-bold text-gray-900">IEEE Bangladesh Section</span> is under <span className="font-bold text-gray-900">Region 10</span> of IEEE, one of 10 geographical regions that is referred to as the Asia Pacific Region. This Region 10 was created on 1st January 1967 and at present, it has 56 Sections, 5 Councils, 8 Sub-sections, 334 Chapters, and 490 student branches. With a membership of over 67,500, it is one of the largest regions in IEEE.
              </p>
            </div>

            {/* First Row of Images */}
            <div className="mb-12">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-md">
                  <Image
                    src="/about/bds-1.jpg"
                    alt="IEEE Bangladesh Section Students-YP-WIE Congress (SYWC) 2016"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="text-sm text-gray-600 italic mt-3 text-center">
                    Image: <span className="font-semibold">IEEE Bangladesh Section Students-YP-WIE Congress (SYWC) 2016</span>
                    <br />
                    (Source https://site.ieee.org/bangladesh-sac/)
                  </p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-md">
                  <Image
                    src="/about/bds-2.jpg"
                    alt="R10 Mentors Summit 2016"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="text-sm text-gray-600 italic mt-3 text-center">
                    Image: <span className="font-semibold">R10 Mentors Summit 2016</span>
                    <br />
                    (Source https://site.ieee.org/bangladesh-sac/)
                  </p>
                </div>
              </div>
            </div>

            {/* Activities Section */}
            <div className="mb-12">
              <p className="text-gray-700 leading-relaxed text-justify">
                <span className="font-bold text-gray-900">IEEE Bangladesh Section</span> arranges and sponsored many conferences, congress, workshops, seminars and as well as webinars and short courses on different topics of Electrical, Electronic, Communication and Computer engineering. Delegates from renowned industry and Professors of different universities conduct these sessions. It helps students to be introduced with the industrial environment and makes them expert for the upcoming challenges.
              </p>
            </div>

            {/* Achievements Section */}
            <div className="mb-12">
              <p className="text-gray-700 leading-relaxed text-justify">
                Among a lot of achievements of the IEEE Bangladesh Sections, some of the memorable achievements are the 2017 Outstanding Section Membership Recruitment Award for its three years in a row performance - 2015, 2016 and 2017. On the other hand, IEEE WIE Affinity Group Bangladesh Section has been awarded the 2017 WIE Affinity Group of the year award by Global WIE for the activities in 2016.
              </p>
            </div>

            {/* Second Row of Images */}
            <div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-md">
                  <Image
                    src="/about/bds-3.jpg"
                    alt="IEEE RUET SB Team in IEEE BDS SYWMC 2018"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="text-sm text-gray-600 italic mt-3 text-center">
                    Image: <span className="font-semibold">IEEE RUET SB Team in IEEE BDS SYWMC 2018</span>
                  </p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-md">
                  <Image
                    src="/about/bds-4.jpg"
                    alt="IEEE RUET SB Team in IEEE BDS SYW CONGRESS 2017"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="text-sm text-gray-600 italic mt-3 text-center">
                    Image: <span className="font-semibold">IEEE RUET SB Team in IEEE BDS SYW CONGRESS 2017</span>
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
              href="https://site.ieee.org/bangladesh-sac/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-700 ease-in-out transform hover:scale-105"
            >
              More About IEEE BDS
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="h-2 bg-linear-to-r from-blue-600 via-purple-600 to-cyan-500"></div>
    </div>
  );
}
