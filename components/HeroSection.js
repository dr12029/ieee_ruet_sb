import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-indigo-50 to-purple-100 overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-300/20 rounded-full blur-2xl animate-pulse delay-75"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-indigo-300/20 rounded-full blur-2xl animate-pulse delay-150"></div>
        <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-cyan-300/20 rounded-full blur-2xl animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-violet-300/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* IEEE Text */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
          <span className="text-gray-900">IEEE</span>
        </h1>

        {/* RUET STUDENT BRANCH */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-wide">
          <span className="bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
            RUET STUDENT BRANCH
          </span>
        </h2>

        {/* Divider Line */}
        <div className="w-full max-w-4xl mx-auto h-1 bg-linear-to-r from-transparent via-gray-800 to-transparent mb-8"></div>

        {/* University Address */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-800 font-semibold mb-12 max-w-3xl mx-auto">
          Rajshahi University of Engineering & Technology, Rajshahi-6204, Bangladesh
        </p>

        {/* About Us Button */}
        <Link href="/about/ruet-sb">
          <button className="btn-primary group">
            <span className="relative z-10">About Us</span>
            <div className="btn-primary-shine -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;
