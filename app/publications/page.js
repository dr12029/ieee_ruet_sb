import Image from 'next/image';
import Link from 'next/link';
import { FaBook, FaDownload, FaEye } from 'react-icons/fa';
import { publications } from '@/data/publicationsData';

export const metadata = {
  title: 'Publications | IEEE RUET Student Branch',
  description: 'Explore magazines, technical articles, and documentation published by IEEE RUET Student Branch',
};

export default function PublicationsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-linear-to-br from-blue-600 via-cyan-600 to-blue-700 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full -top-48 -right-48 blur-3xl"></div>
          <div className="absolute w-96 h-96 bg-cyan-300 opacity-10 rounded-full -bottom-48 -left-48 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <FaBook className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              IEEE RUET SB Publications
            </h1>
          </div>
        </div>
      </section>

      {/* Publications Grid Section */}
      <section className="py-20 bg-linear-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              All <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Publications</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Download and read our magazines, technical documentation, and more
            </p>
          </div>

          {/* Publications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {publications.map((publication, index) => (
              <div
                key={publication.id}
                className="flex flex-col items-center"
              >
                {/* Image Section */}
                <div className="relative w-full max-w-sm h-[560px]">
                  <Image
                    src={publication.image}
                    alt={publication.title}
                    fill
                    className="object-cover rounded-2xl shadow-lg"
                  />
                </div>

                {/* Description - Fixed height for alignment */}
                <div className="w-full max-w-sm mt-6 h-32 flex items-center justify-center">
                  <p className="text-gray-700 text-center leading-relaxed">
                    {publication.description}
                  </p>
                </div>

                {/* Buttons Container */}
                <div className="w-full max-w-sm">
                  {/* Download Button */}
                  <a
                    href={publication.pdfUrl}
                    download
                    className="btn-secondary-2 w-full mb-4 flex items-center justify-center"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <FaDownload className="w-5 h-5" />
                      Download
                    </span>
                  </a>

                  {/* Read Online Button */}
                  <a
                    href={publication.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-2 w-full flex items-center justify-center"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <FaEye className="w-6 h-6" />
                      Read Online
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
