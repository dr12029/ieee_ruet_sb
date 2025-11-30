'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function FAQs() {
    const [openIndices, setOpenIndices] = useState([]);

    const toggleAccordion = (index) => {
        setOpenIndices(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const faqsColumn1 = [
        {
            question: "What is IEEE?",
            answer: (
                <>
                    <p>IEEE is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity. IEEE stands for Institute for Electrical and Electronics Engineers. It organizes multiple conferences and workshops and publishes a variety of Journals. It has more than the total number of 419,000 members around the world, among them 124,000 Student members are there. It sponsors more than 1,900 annual conferences and events worldwide. It publishes almost one-third of the world's technical literature in Electrical Engineering, Computer Science, and Electronics. The Headquarter of IEEE is situated in Piscataway, New Jersey, United States.</p>
                    <a
                        href="https://www.ieee.org/about/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        More About IEEE
                    </a>
                </>
            )
        },
        {
            question: "When was IEEE created?",
            answer: "The AIEE (American Institute of Electrical Engineers) and the IRE (Institute of Radio Engineers) merged to create the IEEE on 1 January 1963. At that time, the combined group had 150,000 members, 93% in the United States. By 1984 there were 250,000 members, 20% of whom were outside the U.S. Today, IEEE has over 420,000 members in 160 countries, with 44.5 percent outside of the U.S."
        },
        {
            question: "What are the benefits of IEEE membership?",
            answer: (
                <>
                    <p className="mb-4">IEEE members can access information on local events and activities by signing in to IEEE Collabratec, an integrated multi-functional platform and a global network of technology-focused professionals, leveraging IEEE's extensive knowledge base and community of thought-leaders. Once signed in, users can:</p>
                    <ul className="list-disc list-inside space-y-2 mb-4">
                        <li>Network with other technology professionals</li>
                        <li>Establish a professional profile highlighting your accomplishments</li>
                        <li>Join and participate in discussions on various technical interests</li>
                        <li>Create a group to share and collaborate on projects</li>
                        <li>Discover IEEE events and activities throughout the world</li>
                    </ul>
                    <a
                        href="https://www.ieee.org/membership/benefits/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        More About Membership
                    </a>
                </>
            )
        },
        {
            question: "How many IEEE regions are there?",
            answer: (
                <>
                    <p>There are 10 IEEE regions. Region 1 (Northeastern US), Region 2 (Eastern US), Region 3 (Southern US), Region 4 (Central US), Region 5 (Southwestern US), Region 6 (Western US), Region 7 (Canada), Region 8 (Africa, Europe, Middle East), Region 9 (Latin America) and Region 10 (Asia and Pacific).</p>
                    <a
                        href="https://www.ieee.org/communities/regional-world-map.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        More Details
                    </a>
                </>
            )
        },
        {
            question: "What is IEEE Region 10?",
            answer: (
                <>
                    <p>In 1st January 1967 the IEEE Region 10, referred to as the Asia Pacific Region was created. It is one of the largest regions in IEEE with a membership of almost 11,000. It covers a geographical area stretching from South Korea and Japan in the north-east to New Zealand in the south, and Bangladesh, Pakistan in the west. At present, it comprises of 57 Sections, 6 Councils, 17 Sub-sections, 515 Chapters, 60 Affinity Groups, and 958 Student Branches. Anyone can locate any Section by rosters.ieee.org and selecting Organizational Units.</p>
                    <a
                        href="https://www.ieeer10.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        R10 Website
                    </a>
                </>
            )
        },
        {
            question: "Which IEEE Region Bangladesh is in?",
            answer: (
                <>
                    <p>The IEEE Bangladesh section is the local branch of IEEE, New Jersey, USA. The IEEE headquarter in New Jersey approved the Bangladesh Section on 20th November 1993 and the GEO code is R00073. From only 54 founding members, IEEE Bangladesh Section has now grown to a family of over 2600 members. It has become one of the most active sections not only in Region 10 but also all over the world, which is proved by numerous accolades and recognition.</p>
                    <a
                        href="https://site.ieee.org/bangladesh-sac/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        More About Bangladesh Section
                    </a>
                </>
            )
        }
    ];

    const faqsColumn2 = [
        {
            question: "What is IEEE Student Branch?",
            answer: (
                <>
                    <p>An IEEE Student Branch is a local organization that helps its members to learn and meet from other members as well as provides opportunities to meet and learn from Graduate Student Members and get engage with professional IEEE members locally. An active IEEE Student Branch organizes different types of programs such as workshops, conferences, seminars, building projects, etc. throughout the year to improve the skills of its members. There are 3,422 Student Branches at colleges and universities in over 100 countries around the world.</p>
                    <a
                        href="https://students.ieee.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        More Details
                    </a>
                </>
            )
        },
        {
            question: "What are the benefits of a Student Branch?",
            answer: (
                <>
                    <p>An IEEE Students Branch helps to build critical skills outside of the classroom. It can give any members funding to do projects or material support or give advice and connection to all the IEEE members around the world. It offers social and technical meetings, outreach programs, conferences, local Section or Regional opportunities, etc. and allows building a network with all the IEEE student members, graduate members and professional members. All IEEE members are given online access to Potentials magazine as part of their basic IEEE membership.</p>
                    <a
                        href="https://students.ieee.org/become-a-member/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        More Details
                    </a>
                </>
            )
        },
        {
            question: "How many sections IEEE has?",
            answer: "IEEE has 342 Sections in ten geographic Regions worldwide and 568 affinity groups; IEEE affinity groups are non-technical sub-units of one or more Sections or a Council."
        },
        {
            question: "How many Student Branches IEEE Bangladesh Section has?",
            answer: (
                <>
                    <p>Any Student Branch falls under its local Section. IEEE Bangladesh Section falls under the Asia Pacific Region or IEEE Region 10. IEEE Bangladesh Section consists of 42 different Student Branches. It has 9 Society Chapters and 2 Affinity Groups.</p>
                    <a
                        href="https://site.ieee.org/bangladesh-sac/more/list-of-student-branches/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        BDC Student Branches
                    </a>
                </>
            )
        },
        {
            question: "What is an IEEE Society?",
            answer: (
                <>
                    <p>IEEE has technical Societies that provide benefits to members within specialized fields of interest. Society memberships enable the members to network with colleagues locally and abroad and collaborate on research and projects with leading experts. IEEE members enjoy deep discounts on Society memberships. Anyone can stay current within his/her chosen technology profession.</p>
                    <a
                        href="https://www.ieee.org/membership-catalog/societies.html?N=4294925302"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        More About Societies
                    </a>
                </>
            )
        },
        {
            question: "What are the names of the IEEE Societies?",
            answer: (
                <>
                    <p>There are 39 IEEE societies. Each society has its particular sector Research & inventional magazine. Many high profile scholars & researchers are involved in all of these societies according to their field of research.</p>
                    <a
                        href="https://www.ieee.org/membership-catalog/societies.html?N=4294925302"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        More About Societies
                    </a>
                </>
            )
        },
        {
            question: "How many chapters IEEE has?",
            answer: (
                <>
                    <p>IEEE has 1,834 Chapters globally and 2,600 Student Branch chapters of IEEE technical societies. These chapters unite local members with similar technical interests around the world. These chapters always give an update about ongoing technological advancements and achievements as well as various conferences, seminars, etc.</p>
                    <a
                        href="https://mga.ieee.org/resources-operations/geographic-unit/chapters"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        More About Chapters
                    </a>
                </>
            )
        }
    ];

    const AccordionItem = ({ question, answer, index, isOpen, toggle }) => (
        <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden hover:shadow-lg transition-shadow">
            <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
            >
                <span className="text-left font-semibold text-gray-900 flex items-start gap-3">
                    <span className="text-blue-600 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                    </span>
                    <span>{question}</span>
                </span>
                <span className="text-blue-600 flex-shrink-0 ml-4">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-6 py-4 bg-gray-50 text-gray-700 leading-relaxed">
                    {typeof answer === 'string' ? <p>{answer}</p> : answer}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="bg-white py-16 mt-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
                        Frequently Asked{' '}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
                            Questions
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
                        Find answers to common questions about IEEE, Student Branches, and IEEE RUET SB
                    </p>
                </div>
            </div>

            {/* FAQs Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div>
                        {[...faqsColumn1, ...faqsColumn2].map((faq, index) => (
                            <AccordionItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                index={index}
                                isOpen={openIndices.includes(index)}
                                toggle={toggleAccordion}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Additional Info Section */}
            <div className="py-16 bg-linear-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Still Have Questions?</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Can't find the answer you're looking for? Feel free to reach out to us.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-xl"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
}
