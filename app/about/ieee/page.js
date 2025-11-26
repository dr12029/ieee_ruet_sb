import Image from 'next/image';
import { FaFacebook, FaGlobe } from 'react-icons/fa';

export default function IEEEAboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white text-gray-900 py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The Institute of Electrical and Electronics Engineers -{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">IEEE</span>
            </h1>
            <p className="text-xl text-gray-600">
              Advancing Technology for Humanity
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* IEEE Logo - Centered at Top */}
        <div className="flex justify-center mb-12">
          <Image
            src="/about/ieee-logo.png"
            alt="IEEE Logo"
            width={200}
            height={80}
            className="object-contain"
          />
        </div>

        {/* IEEE Introduction Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {/* IEEE Column - Wider (2 columns) */}
            <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-200 h-full">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">IEEE</h2>
              <p className="text-gray-700 leading-relaxed text-justify mb-6">
                Institute of Electrical and Electronics Engineers, a nonprofit organization being just the ticket to each and every necessity for individuals with the precept of advancing technology for the benefit of humanity. IEEE is the complete package to technology devotees trying their heart out to bring their dream technologies to come to life. With the corporate office in New York City and its operations center in Piscataway, New Jersey, IEEE has created a platform uniting the engineering and technology professionals to collaborate with each other and bring innovative ideas into existence.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.facebook.com/IEEE.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105"
                >
                  <FaFacebook className="text-xl" />
                  <span className="font-semibold">Facebook Page</span>
                </a>
                <a
                  href="https://www.ieee.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105"
                >
                  <FaGlobe className="text-xl" />
                  <span className="font-semibold">Website</span>
                </a>
              </div>
            </div>

            {/* History Column - Narrower (1 column) */}
            <div className="md:col-span-1 bg-white p-8 rounded-2xl shadow-lg border border-gray-200 h-full flex flex-col">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">History</h2>
              <p className="text-gray-700 leading-relaxed text-justify grow">
                The roots of IEEE go back to 1884 with the founding of the American Institute of Electrical Engineers (AIEE). By and by it merged with the Institute of Radio Engineers (IRE, found in 1912) labeled as Institute of Electrical and Electronics Engineers (IEEE) on the 1st January of 1963. AIEE was much larger than IRE initially but IRE attracted more technology enthusiasts by the 1950s. The union of two big institutes brought into being the largest professional society.
              </p>
            </div>
          </div>
        </div>

        {/* Growth Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="bg-linear-to-r from-blue-600 to-cyan-500 px-8 py-6">
              <h2 className="text-3xl font-bold text-white">GROWTH</h2>
            </div>
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-md">
                    <Image
                      src="/about/map1.png"
                      alt="IEEE Regions in World Map"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-lg"
                    />
                    <p className="text-sm text-gray-600 italic mt-3">
                      Image: <span className="font-semibold">IEEE Regions in World Map</span> (Source https://ieer8.org/)
                    </p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <p className="text-gray-700 leading-relaxed text-justify">
                    Even in 1963 IEEE had 150,000 members with 7% members from outside the United States of America. Later in 1984 IEEE grew up to 250,000 members with 20% non-American members. IEEE grew exponentially down the line. At present IEEE has crossed 160 borders of different countries with 420,000 members, of whom 44.5% are from outside of the United States. This growth continues yet today. Since IEEE has grown into 160 different nations. IEEE divided the world into 10 regions. These regions are not confined to a single state or nationality. The first 6 regions cover the USA and the rest covers the rest of the world. Within these regions, there are different sections of IEEE.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Volunteering and Communities Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Volunteering */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Volunteering</h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                IEEE volunteers play a key role in the growth of the organization. Volunteers are needed in order to strategize and execute the events, projects or various programs that are held throughout the year as activities of IEEE. Volunteers are offered a platform where individuals can outshine themselves in their interested sectors also learning about functional actions. Volunteers promote IEEE, develop members, also volunteer to strategize and execute events and grow as a future leader.
              </p>
            </div>

            {/* Communities */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Communities</h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                As IEEE is a global organization with a substantial number of members, IEEE has divided the world into 10 regions and in 39 different technical societies to satisfy their interests in different fields of technology. IEEE works to create a platform for networking and growing professionally.
              </p>
            </div>
          </div>
        </div>

        {/* Major Events Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="bg-linear-to-r from-purple-600 to-pink-500 px-8 py-6">
              <h2 className="text-3xl font-bold text-white">Major Events</h2>
            </div>
            <div className="p-8 md:p-12">
              <p className="text-gray-700 leading-relaxed text-justify">
                IEEE organizes or sponsors in more than 1900 conferences and other events annually worldwide to grow technical fields in great measure to benefit humanity. IEEE involves its members with trade events, training workshops, job fairs, and other technical programs apart from conferences. With the vibrant members, IEEE launches a handful of conferences annually producing 30% of the world&apos;s literature in the field of electrical and electronics engineering and computer science. IEEE also organizes various contests where students can show their excellence in particular fields. The contests that stand out are IEEEXtreme, IEEE Student Branch Website Contest, IEEE Maker Project Competition, etc. Among various summits organized worldwide by IEEE IEEE Industry Summit, IEEE 5g Summit are most popular. Another major event for IEEE is the IEEE Sections Congress, a flagship event organized triennially where IEEE brings together the root leadership of IEEE from every member country to share ideas, problems, and resolutions.
              </p>
            </div>
          </div>
        </div>

        {/* More about IEEE Button - Outside the box */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center">
            <a
              href="https://www.ieee.org/about/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-700 ease-in-out transform hover:scale-105"
            >
              More about IEEE
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="h-2 bg-linear-to-r from-blue-600 via-purple-600 to-cyan-500"></div>
    </div>
  );
}
