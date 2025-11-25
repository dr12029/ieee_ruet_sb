"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedMembers } from "@/data/executiveMembers";

export default function RuetSBPage() {
    const [showMore, setShowMore] = useState(false);
    const featuredMembers = getFeaturedMembers();

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-white text-gray-900 py-16 mt-16">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
                            IEEE RUET Student Branch
                        </h1>
                        <p className="text-xl text-gray-600">
                            Rajshahi University of Engineering & Technology
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-12">
                        <div className="relative w-48 h-48 md:w-56 md:h-56">
                            <Image
                                src="/ruet-sb.png"
                                alt="IEEE RUET Student Branch Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 text-lg leading-relaxed text-justify mb-6">
                            <span className="font-bold text-gray-900">
                                IEEE RUET (Rajshahi University of Engineering &
                                Technology) STUDENT BRANCH
                            </span>{" "}
                            was created for the students of RUET to get
                            acquainted with IEEE and the benefits it is
                            offering.{" "}
                            <span className="font-bold text-gray-900">
                                IEEE RUET Student Branch
                            </span>{" "}
                            is one of the most operative student branches in{" "}
                            <span className="font-bold text-gray-900">
                                Bangladesh
                            </span>
                            . With a vibrant student body and experienced
                            mentors, IEEE RUET Student Branch operates to
                            promote IEEE and become a prominent student branch.
                            We give our best for the betterment of the students
                            to develop as a technical individual. IEEE RUET
                            Student Branch offers students different{" "}
                            <span className="font-bold text-gray-900">
                                seminars, courses, workshops to develop their
                                ability to grow as a professional
                            </span>{" "}
                            so that the students can dedicate themselves to the
                            prosperity of humanity. IEEE is promoted to the
                            students who are studying different manners of
                            engineering through IEEE RUET Student Branch and
                            assembled many individuals in the process. To
                            develop the student in their own strings of
                            engineering IEEE RUET Student Branch formed
                            different chapters. These chapters help the students
                            to improve themselves in their own sectors.
                        </p>
                    </div>

                    {/* Image Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                        {[1, 2, 3].map((num) => (
                            <div
                                key={num}
                                className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-lg border-4 border-blue-400 hover:border-cyan-500 transition-all duration-300 hover:scale-105"
                            >
                                <Image
                                    src={`/about/ruet-sb-${num}.jpg`}
                                    alt={`IEEE RUET Student Branch Activity ${num}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Show More/Less Button */}
                    <div className="flex justify-center mb-8">
                        <button
                            onClick={() => setShowMore(!showMore)}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
                        >
                            {showMore ? (
                                <>
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 15l7-7 7 7"
                                        />
                                    </svg>
                                    Show Less
                                </>
                            ) : (
                                <>
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                    Show More
                                </>
                            )}
                        </button>
                    </div>

                    {/* Chapters and Affinity Group - Collapsible */}
                    <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${showMore
                                ? "max-h-[3000px] opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                    >
                        <div className="bg-linear-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 mb-12">
                            <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                IEEE RUET Student Branch currently has{" "}
                                <span className="font-bold text-blue-600">
                                    three chapters and one affinity group
                                </span>
                                . These different chapters grant accesses in
                                different communities and collaborate the
                                students with different professional individuals
                                and help them achieve their own dreams.
                            </p>

                            <div className="space-y-6">
                                {/* IAS Chapter */}
                                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        IEEE RUET IAS STUDENT BRANCH CHAPTER
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        <span className="font-semibold">
                                            (Industry Applications Society)
                                        </span>{" "}
                                        associates the students with their
                                        interest in the commercial or industrial
                                        sector. It focuses particularly on the
                                        needs of industries. With nearly 14000
                                        members worldwide it offers the students
                                        to collaborate with the industrial
                                        professionals and grow as a professional
                                        the fulfill the unique needs of
                                        industries.
                                    </p>
                                </div>

                                {/* RAS Chapter */}
                                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-cyan-500">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        IEEE RUET RAS STUDENT BRANCH CHAPTER
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        <span className="font-semibold">
                                            (ROBOTICS AND AUTOMATION SOCIETY)
                                        </span>{" "}
                                        works in order to exchange knowledge in
                                        the field of robotics and automation.
                                        The world is favoring more and more of
                                        the automated technologies. This chapter
                                        assists the students to know more about
                                        this field in both practical and
                                        theoretical sector.
                                    </p>
                                </div>

                                {/* CS Chapter */}
                                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        IEEE CS RUET STUDENT BRANCH CHAPTER
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        <span className="font-semibold">
                                            (Computer Society)
                                        </span>{" "}
                                        promotes the motto of IEEE CS &quot;to
                                        advance the theory, practice, and
                                        application of computer and information
                                        processing science and technology&quot;.
                                        Students with the aim to work in the
                                        field of computers are greatly benefited
                                        by this chapter. IEEE RUET Student
                                        Branch works to develop its students in
                                        their own line of interest and reaches
                                        out to the students with the benefits
                                        IEEE is offering for the students. With
                                        the help of different chapters and
                                        affinity groups, the students can pursue
                                        their personal dreams in the sector they
                                        are interested in. With an energetic
                                        student body and experienced mentors, we
                                        work to promote IEEE and mold ourselves
                                        to benefit humanity.
                                    </p>
                                </div>

                                {/* SPS Chapter */}
                                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-cyan-500">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        IEEE RUET SPS STUDENT BRANCH CHAPTER
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        <span className="font-semibold">
                                            (Signal Processing Society)
                                        </span>{" "}
                                        started the new journey with the target
                                        of spreading extensive knowledge in the
                                        field of image processing, signal
                                        processing and other wave related
                                        research and systems among the students
                                        of all kinds.
                                    </p>
                                </div>

                                {/* WIE Affinity Group */}
                                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        IEEE RUET WIE STUDENT BRANCH AFFINITY
                                        GROUP
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        is a platform dedicated to promoting
                                        women engineers and scientists and
                                        inspiring girls around the world to
                                        follow their academic interests to a
                                        career in engineering. It is a team of
                                        lively and enthusiastic members who
                                        works hard to provide facilities to
                                        women to follow their academic interests
                                        in a career in engineering and science.
                                        It is a place where women can find
                                        opportunities to fulfill their dream and
                                        overcome the challenges to prove their
                                        worth.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Links Section */}
            <section className="py-12 bg-linear-to-br from-gray-50 to-blue-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-6">
                        <a
                            href="https://www.facebook.com/ieeruetsb"
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
                            href="https://www.linkedin.com/company/ieee-ruet-sb"
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
                            href="https://www.instagram.com/ieeruetsb"
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
            </section>

            {/* Chair Message Section */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        What does the{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
                            chair
                        </span>{" "}
                        think?
                    </h2>

                    <div className="bg-linear-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
                        <p className="text-gray-700 text-lg leading-relaxed text-center italic mb-8">
                            &quot;I&apos;ll make an effort to maintain and
                            uphold the standard of IEEE RUET Student Branch.
                            Organizing national technological competitions,
                            seminars, workshops, and industrial visits to
                            involve the members more and keep them updated on
                            current innovations. I believe united We, the
                            members of IEEE RUET SB, will flourish
                            together.&quot;
                        </p>

                        <div className="flex flex-col items-center">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-400 shadow-xl mb-4">
                                <Image
                                    src="/team/Chair1 - Adib Hassan.jpg"
                                    alt="Adib Hassan"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">
                                Adib Hassan
                            </h3>
                            <p className="text-blue-600 font-semibold">
                                Chair, IEEE RUET Student Branch
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Executive Committee Section */}
            <section className="py-16 bg-linear-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Meet the{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
                                executive committee
                            </span>
                        </h2>
                        <div className="w-32 h-1 bg-linear-to-r from-blue-600 to-cyan-500 mx-auto mb-4"></div>
                    </div>

                    {/* Featured Members Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {featuredMembers.map((member) => (
                            <div
                                key={member.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-105"
                            >
                                {/* Rounded Image */}
                                <div className="flex justify-center pt-8 pb-6">
                                    <div className="relative w-48 h-48 rounded-full overflow-hidden ring-4 ring-blue-100 shadow-xl">
                                        {member.image ? (
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-500 to-cyan-500">
                                                <div className="text-6xl font-bold text-white">
                                                    {member.name.charAt(0)}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="px-6 pb-8 text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-14">
                                        {member.name}
                                    </h3>
                                    <p className="text-base text-blue-600 font-semibold line-clamp-1">
                                        {member.position}
                                    </p>
                                    <p className="text-sm text-gray-600 line-clamp-1">
                                        {member.organization}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link
                            href="/executive-committee"
                            className="inline-block px-10 py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
                        >
                            Full Executive Committee
                        </Link>
                        <Link
                            href="/hall-of-fame"
                            className="inline-block px-10 py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
                        >
                            Hall of Fame
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
