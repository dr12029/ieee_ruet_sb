'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Script from 'next/script';

export default function MembershipPage() {
  useEffect(() => {
    // Chart will be initialized after Script loads
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white text-gray-900 py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              IEEE <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Membership</span>
            </h1>
            <p className="text-xl text-gray-600">
              Join the World&apos;s Largest Technical Professional Organization
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Video and Benefits Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Video Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-full flex items-center">
              <div className="w-full">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/hQfIwS2Utyc"
                  title="Join IEEE"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full"
                ></iframe>
              </div>
            </div>

            {/* IEEE Offers You Section */}
            <div className="bg-linear-to-br from-gray-50 to-blue-50 rounded-2xl shadow-xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">IEEE offers you</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">A community of 420,000+ technology and engineering professionals to learn, interact, collaborate, and innovate</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Your desired resources & pathways to learn about new technology & also get a chance to contribute</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">The chance to enhance your networking skill & knowledge</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">The opportunity to sharpen your organizing, leadership, management & interpersonal skills with the collaboration of your student branch & different chapters</span>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://www.ieee.org/membership/join/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-48 !py-3 !px-4 !text-base !rounded-xl justify-center"
                >
                  Join IEEE
                </a>
                <a
                  href="https://www.ieee.org/membership/societies/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-1 w-48 !flex items-center justify-center !py-3 !px-4 !text-base !rounded-xl"
                >
                  Join IEEE Society
                </a>
              </div>

              <div className="mt-6">
                <p className="text-gray-700 font-semibold mb-3">Have been a member?</p>
                <a
                  href="https://www.ieee.org/membership/renew.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-2 w-48 justify-center !py-3 !px-4 !text-base !rounded-xl"
                >
                  Renew now!
                </a>
              </div>
            </div>
          </div>

          {/* Membership Growth Chart */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Chart */}
              <div>
                <canvas id="membershipChart" className="w-full"></canvas>
                <p className="text-center text-gray-600 italic mt-4 text-sm">
                  Figure: Membership growth chart of IEEE RUET SB
                </p>
              </div>

              {/* Text */}
              <div className="flex items-center">
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    IEEE RUET Student Branch&apos;s members are increasing each year. Students from the first year, second year, third year & final year are interested to join this community nowadays. Our members & volunteers enhancing their organizational, communication & interpersonal skills day by day.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    We work not only for our members but also for other general students of our institution. This brings students closer to IEEE, they attend our seminars & finally get involved in it. Our members working with IEEE to make a positive impact on the betterment of our innovation & students.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Load Chart.js */}
          <Script
            src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"
            strategy="afterInteractive"
            onLoad={() => {
              const ctx = document.getElementById('membershipChart');
              if (ctx && window.Chart) {
                new window.Chart(ctx, {
                  type: 'bar',
                  data: {
                    labels: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
                    datasets: [{
                      label: '# Number of our members',
                      data: [7, 15, 23, 39, 45, 57, 60, 66, 78, 97, 110, 121],
                      backgroundColor: [
                        'rgb(141, 179, 250)',
                        'rgb(131, 169, 240)',
                        'rgb(121, 159, 230)',
                        'rgb(111, 149, 220)',
                        'rgb(101, 139, 210)',
                        'rgb(91, 129, 200)',
                        'rgb(81, 119, 190)',
                        'rgb(71, 109, 180)',
                        'rgb(70, 99, 170)',
                        'rgb(60, 89, 160)',
                        'rgb(50, 79, 150)',
                        'rgb(41, 69, 140)'
                      ],
                      borderColor: 'rgb(19, 75, 181)',
                      borderWidth: 1
                    }]
                  },
                  options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }
                });
              }
            }}
          />

          {/* Join a Society Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Join a <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">society</span>
            </h2>
            <div className="w-32 h-1 bg-linear-to-r from-blue-600 to-cyan-500 mx-auto mb-12"></div>

            {/* Societies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* IAS */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-400 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col">
                <div className="flex justify-center mb-6 grow">
                  <Image
                    src="/about/ias_sc.gif"
                    alt="IEEE Industry Applications Society"
                    width={150}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <div className="space-y-3 mt-auto">
                  <a
                    href="https://ias.ieee.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2 w-full text-center block"
                  >
                    Visit website
                  </a>
                  <a
                    href="https://www.ieee.org/membership-catalog/productdetail/showProductDetailPage.html?product=MEMIA034"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2 w-full text-center block"
                  >
                    Join IEEE IAS
                  </a>
                </div>
              </div>

              {/* RAS */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-400 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col">
                <div className="flex justify-center mb-6 grow">
                  <Image
                    src="/about/ras_sc.jpg"
                    alt="IEEE Robotics and Automation Society"
                    width={180}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <div className="space-y-3 mt-auto">
                  <a
                    href="https://www.ieee-ras.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2 w-full text-center block"
                  >
                    Visit website
                  </a>
                  <a
                    href="https://www.ieee.org/membership-catalog/productdetail/showProductDetailPage.html?product=MEMRA024"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2 w-full text-center block"
                  >
                    Join IEEE RAS
                  </a>
                </div>
              </div>

              {/* CS */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-400 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col">
                <div className="flex justify-center mb-6 grow">
                  <Image
                    src="/about/cs_sc.gif"
                    alt="IEEE Computer Society"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <div className="space-y-3 mt-auto">
                  <a
                    href="https://www.computer.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2 w-full text-center block"
                  >
                    Visit website
                  </a>
                  <a
                    href="https://www.computer.org/membership/join"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2 w-full text-center block"
                  >
                    Join IEEE CS
                  </a>
                </div>
              </div>

              {/* SPS */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-400 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col">
                <div className="flex justify-center mb-6 grow">
                  <Image
                    src="/about/sps.gif"
                    alt="IEEE Signal Processing Society"
                    width={120}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <div className="space-y-3 mt-auto">
                  <a
                    href="https://signalprocessingsociety.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2 w-full text-center block"
                  >
                    Visit website
                  </a>
                  <a
                    href="https://www.ieee.org/membership-catalog/productdetail/showProductDetailPage.html?product=MEMSP001&refProd=MEMSP001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2 w-full text-center block"
                  >
                    Join IEEE SPS
                  </a>
                </div>
              </div>
            </div>

            {/* WIE */}
            <div className="flex justify-center">
              <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-400 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 max-w-xs w-full flex flex-col">
                <div className="flex justify-center mb-6 grow">
                  <Image
                    src="/about/wie-ok.png"
                    alt="IEEE Women in Engineering"
                    width={100}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <div className="space-y-3 mt-auto">
                  <a
                    href="https://wie.ieee.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2 w-full text-center block"
                  >
                    Visit website
                  </a>
                  <a
                    href="https://wie.ieee.org/membership/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2 w-full text-center block"
                  >
                    Join IEEE WIE
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Membership Benefits Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Membership <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Benefits</span>
            </h2>
            <div className="w-32 h-1 bg-linear-to-r from-blue-600 to-cyan-500 mx-auto mb-12"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* IEEE Xplore */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-400 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 rounded-full bg-green-100 flex items-center justify-center p-6">
                    <Image
                      src="/about/ieee-xplre.png"
                      alt="IEEE Xplore"
                      width={140}
                      height={140}
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-gray-600 text-justify italic mb-6 flex-grow">
                  A powerful resource for discovery of and access to scientific and technical content published by IEEE.
                </p>
                <div className="flex justify-center mt-auto">
                  <a
                    href="https://ieeexplore.ieee.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2"
                  >
                    View Site
                  </a>
                </div>
              </div>

              {/* IEEE Spectrum */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-400 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 rounded-full bg-lime-200 flex items-center justify-center p-6">
                    <Image
                      src="/about/Spectrum.png"
                      alt="IEEE Spectrum"
                      width={140}
                      height={140}
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-gray-600 text-justify italic mb-6 flex-grow">
                  The flagship magazine and website engaging its visitors with clear explanations about emerging concepts with details.
                </p>
                <div className="flex justify-center mt-auto">
                  <a
                    href="https://spectrum.ieee.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2"
                  >
                    View Site
                  </a>
                </div>
              </div>

              {/* IEEE.tv */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-400 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 rounded-full bg-slate-700 flex items-center justify-center p-6">
                    <Image
                      src="/about/tv.png"
                      alt="IEEE.tv"
                      width={140}
                      height={140}
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-gray-600 text-justify italic mb-6 flex-grow">
                  An excellent step by IEEE, paving a new way in knowledge-sharing and spreading ideas across the globe.
                </p>
                <div className="flex justify-center mt-auto">
                  <a
                    href="https://ieeetv.ieee.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2"
                  >
                    View Site
                  </a>
                </div>
              </div>

              {/* IEEE Potentials */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-400 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 rounded-full bg-purple-700 flex items-center justify-center p-6">
                    <Image
                      src="/about/potentials.png"
                      alt="IEEE Potentials"
                      width={140}
                      height={140}
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-gray-600 text-justify italic mb-6 flex-grow">
                  IEEE Potentials Magazine helps to explore career strategies, the latest in research, and important technical developments.
                </p>
                <div className="flex justify-center mt-auto">
                  <a
                    href="https://www.ieee.org/membership/students/potentials.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2"
                  >
                    View Site
                  </a>
                </div>
              </div>

              {/* The Institute */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-400 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 rounded-full bg-yellow-300 flex items-center justify-center p-6">
                    <Image
                      src="/about/institute.png"
                      alt="The Institute"
                      width={140}
                      height={140}
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-gray-600 text-justify italic mb-6 flex-grow">
                  The Institute provides the latest news about IEEE, the world&apos;s largest technical professional society, and its members.
                </p>
                <div className="flex justify-center mt-auto">
                  <a
                    href="http://theinstitute.ieee.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2"
                  >
                    View Site
                  </a>
                </div>
              </div>

              {/* IEEE Job Site */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-400 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center p-6">
                    <Image
                      src="/about/jobsite.png"
                      alt="IEEE Job Site"
                      width={140}
                      height={140}
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-gray-600 text-justify italic mb-6 flex-grow">
                  IEEE Job Site provides resources and opportunities for working in the engineering sciences, research and technology areas.
                </p>
                <div className="flex justify-center mt-auto">
                  <a
                    href="https://jobs.ieee.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2"
                  >
                    View Site
                  </a>
                </div>
              </div>

              {/* IEEE Awards */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-400 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 rounded-full bg-pink-200 flex items-center justify-center p-6">
                    <Image
                      src="/about/Awards.png"
                      alt="IEEE Awards"
                      width={140}
                      height={140}
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-gray-600 text-justify italic mb-6 flex-grow">
                  It offers a variety of scholarships, grants, and fellowships to members for their excellence and contribution.
                </p>
                <div className="flex justify-center mt-auto">
                  <a
                    href="https://www.ieee.org/about/awards/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2"
                  >
                    View Site
                  </a>
                </div>
              </div>

              {/* IEEE ResumeLab */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-400 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 rounded-full bg-teal-100 flex items-center justify-center p-6">
                    <Image
                      src="/about/Resume-lab.png"
                      alt="IEEE ResumeLab"
                      width={140}
                      height={140}
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-gray-600 text-justify italic mb-6 flex-grow">
                  It is an online-based career management platform that contains several tools to create an optimal professional profile.
                </p>
                <div className="flex justify-center mt-auto">
                  <a
                    href="https://www.ieee.org/membership/products/resumelab.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2"
                  >
                    View Site
                  </a>
                </div>
              </div>

              {/* IEEE Collabratec */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-400 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 rounded-full bg-orange-200 flex items-center justify-center p-6">
                    <Image
                      src="/about/collabratec.png"
                      alt="IEEE Collabratec"
                      width={140}
                      height={140}
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-gray-600 text-justify italic mb-6 flex-grow">
                  IEEE collabratec is a research, collaboration and professional networking platform offered to members.
                </p>
                <div className="flex justify-center mt-auto">
                  <a
                    href="https://ieee-collabratec.ieee.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2"
                  >
                    View Site
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
