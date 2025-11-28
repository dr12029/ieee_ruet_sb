/**
 * Events Data
 * Mock data for all IEEE RUET SB events from 2014-2025
 * Structure ready for backend integration
 */

export const eventsData = {
    2025: [
        {
            id: "agm_2025",
            name: "Annual General Meeting 2025",
            date: "2025-03-15",
            image: "/events/2025/2025_agm.jpg",
            featured: true,
            upcoming: false,
            description: `Join us for the Annual General Meeting 2025 where we'll review our accomplishments, discuss future initiatives, and elect new committee members.

This is a great opportunity to network with fellow IEEE members, learn about upcoming projects, and contribute your ideas to shape the future of IEEE RUET Student Branch.

All IEEE members are encouraged to attend and participate in this important event.

Venue: ECE Seminar Hall, RUET

Time: 10:00 AM - 1:00 PM

Registration: Free for IEEE Members`,
            details: {
                venue: "ECE Seminar Hall, RUET",
                time: "10:00 AM - 1:00 PM"
            }
        },
        {
            id: "membership_drive_2025",
            name: "IEEE Membership Drive 2025",
            date: "2025-02-01",
            image: "/events/2025/membership_2025.jpg",
            featured: false,
            upcoming: false,
            description: `IEEE RUET Student Branch is launching its annual membership drive for 2025! 

Join the world's largest technical professional organization and unlock exclusive benefits including access to IEEE Xplore Digital Library, networking opportunities with professionals worldwide, and participation in cutting-edge technical events.

Early bird registration benefits available for students who join before the deadline.

Venue: Online & Campus Booths

Duration: Throughout February 2025

Membership Fee: Standard IEEE Student Membership Rates Apply

Benefits: Access to IEEE Resources, Global Network, Technical Publications`,
            details: {
                venue: "Online & Campus Booths"
            }
        },
        {
            id: "volunteer_call_2025",
            name: "Call for Volunteer",
            date: "2025-12-31",
            image: "/events/2025/volunteer_2025.jpg",
            featured: false,
            upcoming: true,
            description: `IEEE RUET Student Branch is looking for passionate volunteers to join our team!

If you're enthusiastic about technology, community service, and leadership development, this is your chance to make a difference. We're recruiting volunteers for various committees including technical, media, event management, and more.

Be part of something bigger and develop valuable skills while contributing to the IEEE community.

Application Deadline: December 31, 2025

Positions Available: Various Committee Positions

Requirements: IEEE Membership Preferred

Perks: Certificates, Leadership Experience, Networking Opportunities`,
            details: {
                venue: "Online Application",
                deadline: "December 31, 2025"
            }
        },
    ],
    2024: [
        {
            id: "agm_2024",
            name: "Annual General Meeting 2024",
            date: "2024-03-10",
            image: "/events/2024/agm2024.jpg",
            featured: true,
            upcoming: false,
            description: `The Annual General Meeting 2024 brought together IEEE RUET members to celebrate achievements, discuss strategic initiatives, and plan for the future.

The meeting featured presentations from all chapters and affinity groups, showcasing their accomplishments throughout the year. Members voted on important proposals and elected new executive committee members.

This event strengthened our community bonds and set the direction for continued growth and excellence.

Venue: ECE Seminar Hall, RUET

Time: 10:00 AM - 2:00 PM

Attendance: 150+ Members

Highlights: Chapter Reports, Elections, Strategic Planning`,
            details: {
                venue: "ECE Seminar Hall, RUET",
                time: "10:00 AM - 2:00 PM"
            }
        },
        {
            id: "aps_seminar_2024",
            name: "Antennas and Propagation Society Seminar",
            date: "2024-11-15",
            image: "/events/2024/APsociety_seminar.jpg",
            featured: true,
            upcoming: false,
            description: `An engaging seminar on modern antenna design and electromagnetic wave propagation technologies.

Industry experts and academic researchers shared insights on the latest developments in wireless communication systems, 5G antenna design, and RF engineering. Participants gained hands-on knowledge through interactive sessions and practical demonstrations.

This event bridged the gap between theoretical concepts and real-world applications in the field of antennas and propagation.

Guest Speaker: Dr. Mohammad Rahman, RF Engineer

Venue: EEE Seminar Hall, RUET

Time: 2:00 PM - 5:00 PM

Topics: 5G Antennas, RF Design, EM Wave Propagation

Registration Fee: Free for IEEE Members, BDT 50 for Non-members`,
            details: {
                venue: "EEE Seminar Hall, RUET",
                time: "2:00 PM - 5:00 PM"
            }
        },
        {
            id: "iftar_2024",
            name: "IEEE RUET Iftar Mahfil 2024",
            date: "2024-04-05",
            image: "/events/2024/ifter.jpg",
            featured: false,
            upcoming: false,
            description: `A heartwarming iftar gathering celebrating the spirit of Ramadan with the IEEE RUET family.

Members came together to break their fast, share stories, and strengthen bonds of brotherhood and friendship. The event featured traditional iftar items, prayers, and moments of reflection.

This annual tradition exemplifies our commitment to building a strong, caring community beyond just technical pursuits.

Venue: RUET Campus Central Field

Time: Iftar Time

Participants: 100+ Members and Guests

Menu: Traditional Iftar Items`,
            details: {
                venue: "RUET Campus Central Field",
                time: "Iftar Time"
            }
        },
        {
            id: "pes_day_2024",
            name: "Power and Energy Society Day 2024",
            date: "2024-09-20",
            image: "/events/2024/pesday2024.jpg",
            featured: false,
            upcoming: false,
            description: `PES Day 2024 celebrated innovations in power systems and renewable energy technologies.

The event featured technical presentations on smart grids, renewable energy integration, and sustainable power solutions. Students participated in poster presentations showcasing their research projects in power electronics and energy systems.

Industry professionals shared career insights and future trends in the power and energy sector.

Venue: EEE Department, RUET

Time: 9:00 AM - 4:00 PM

Activities: Technical Talks, Poster Sessions, Industry Panel

Topics: Smart Grids, Renewable Energy, Power Electronics`,
            details: {
                venue: "EEE Department, RUET",
                time: "9:00 AM - 4:00 PM"
            }
        }
    ],
    2023: [
        {
            id: "ieee_day_2023",
            name: "IEEE Day 2023",
            date: "2023-10-03",
            image: "/events/2023/ieee_day_2023.jpg",
            featured: true,
            upcoming: false,
            description: `Celebrating IEEE Day 2023 with a grand festival of technology, innovation, and community spirit.

The day-long celebration included technical competitions, guest lectures, cultural performances, and networking sessions. Students showcased innovative projects and participated in various technical and non-technical events.

IEEE Day commemorates the first time in history when engineers worldwide gathered to share their technical ideas in 1884.`,
            details: {
                venue: "RUET Campus",
                time: "Full Day Event (9:00 AM - 6:00 PM)",
                activities: "Competitions, Lectures, Exhibitions, Cultural Programs",
                participation: "200+ Students and Faculty",
                theme: "Leveraging Technology for a Better Tomorrow"
            }
        },
        {
            id: "campus_to_industry_2023",
            name: "Campus to Industry Seminar",
            date: "2023-08-12",
            image: "/events/2023/campus_to_industry.jpg",
            featured: true,
            upcoming: false,
            description: `A comprehensive seminar bridging the gap between academic learning and industry expectations.

Industry professionals from leading tech companies shared insights on career preparation, essential skills, and job market trends. The seminar featured panel discussions, resume workshops, and mock interview sessions.

Students received valuable guidance on transitioning from campus life to professional careers in engineering and technology.`,
            details: {
                guests: "Industry Experts from BJIT, Samsung R&D, Brain Station 23",
                venue: "ECE Auditorium, RUET",
                time: "10:00 AM - 3:00 PM",
                topics: "Career Guidance, Industry Skills, Interview Preparation",
                registration: "Free for All Students"
            }
        }
    ],
    2022: [
        {
            id: "agm_2022",
            name: "Annual General Meeting 2022",
            date: "2022-03-05",
            image: "/events/2022/agm_2022.jpg",
            featured: false,
            upcoming: false,
            description: `The AGM 2022 reviewed the year's achievements and set strategic goals for future growth.

Members participated in committee elections, budget approvals, and strategic planning sessions. The meeting highlighted successful events, membership growth, and chapter activities throughout 2021-2022.

This democratic gathering ensured every member's voice was heard in shaping our organization's future.`,
            details: {
                venue: "ECE Seminar Hall, RUET",
                time: "11:00 AM - 2:00 PM",
                agenda: "Annual Report, Elections, Budget Approval, Strategic Planning",
                attendance: "120+ Members"
            }
        },
        {
            id: "ras_project_showcase_2022",
            name: "RAS Project Showcase 2022",
            date: "2022-11-18",
            image: "/events/2022/ras_showcase.jpg",
            featured: true,
            upcoming: false,
            description: `RAS Chapter's annual project showcase featuring cutting-edge robotics and automation projects.

Students demonstrated autonomous robots, AI-powered systems, IoT applications, and innovative automation solutions. The showcase attracted participants from multiple departments and universities.

Industry judges evaluated projects and provided feedback, with awards given for innovation, technical execution, and practical applications.`,
            details: {
                venue: "RUET Central Field",
                time: "9:00 AM - 5:00 PM",
                projects: "30+ Robotics and Automation Projects",
                judges: "Industry Professionals and Faculty",
                prizes: "Cash Prizes and Certificates for Winners"
            }
        },
        {
            id: "wie_career_workshop_2022",
            name: "WIE Career Development Workshop",
            date: "2022-09-25",
            image: "/events/2022/wie_workshop.jpg",
            featured: false,
            upcoming: false,
            description: `Women in Engineering hosted an empowering career development workshop for aspiring female engineers.

The workshop covered leadership skills, professional networking, work-life balance, and breaking barriers in male-dominated fields. Successful women engineers shared their journeys and inspired participants.

Interactive sessions included resume building, LinkedIn optimization, and personal branding strategies.`,
            details: {
                speakers: "Successful Women Engineers from Industry and Academia",
                venue: "ECE Seminar Hall, RUET",
                time: "2:00 PM - 6:00 PM",
                topics: "Leadership, Networking, Career Planning, Personal Branding",
                targetAudience: "Female Engineering Students"
            }
        }
    ],
    2021: [
        {
            id: "inspira_2021",
            name: "INSPIRA 2021",
            date: "2021-12-10",
            image: "/events/2021/inspira_2021.jpg",
            featured: true,
            upcoming: false,
            description: `INSPIRA 2021 was a grand technical and cultural fest celebrating innovation, creativity, and talent.

The three-day event featured technical competitions including coding contests, hardware challenges, circuit debugging, and project exhibitions. Cultural segments showcased music, dance, and drama performances.

This flagship event brought together students from multiple universities for a celebration of engineering excellence and cultural diversity.`,
            details: {
                duration: "3 Days (Dec 10-12, 2021)",
                venue: "RUET Campus",
                events: "10+ Technical and Cultural Competitions",
                participation: "500+ Students from 15+ Universities",
                prizes: "Total Prize Pool: BDT 50,000",
                sponsors: "Multiple Tech Companies and Sponsors"
            }
        },
        {
            id: "ras_iot_workshop_2021",
            name: "RAS IoT Workshop 2021",
            date: "2021-08-15",
            image: "/events/2021/ras_iot.jpg",
            featured: true,
            upcoming: false,
            description: `A comprehensive hands-on workshop on Internet of Things and its applications in robotics and automation.

Participants learned about IoT protocols, sensor integration, cloud platforms, and building connected devices. The workshop included practical sessions where students built their own IoT projects using Arduino, ESP32, and cloud services.

Industry experts shared real-world IoT applications in smart cities, industrial automation, and healthcare.`,
            details: {
                trainer: "Engr. Sadman Rahman, IoT Specialist",
                venue: "EEE Lab, RUET",
                duration: "2 Days Workshop",
                topics: "IoT Fundamentals, Sensor Networks, Cloud Integration, Hands-on Projects",
                kit: "Arduino and Sensor Kit Provided",
                registrationFee: "BDT 200 (IEEE Members), BDT 300 (Non-members)"
            }
        },
        {
            id: "reception_programme_2021",
            name: "Fresher's Reception 2021",
            date: "2021-02-20",
            image: "/events/2021/reception_programme.jpg",
            featured: false,
            upcoming: false,
            description: `A warm welcome ceremony for new IEEE RUET Student Branch members joining the family.

Senior members shared experiences, explained IEEE benefits, and guided freshers on how to make the most of their membership. The program included ice-breaking sessions, team-building activities, and an overview of upcoming events and opportunities.

This reception marked the beginning of an exciting journey for new members in the IEEE community.`,
            details: {
                venue: "ECE Auditorium, RUET",
                time: "3:00 PM - 6:00 PM",
                newMembers: "80+ Freshers Welcomed",
                activities: "Ice Breaking, Team Building, IEEE Overview, Q&A Session",
                refreshments: "Light Snacks and Beverages"
            }
        }
    ],
    2020: [
        {
            id: "thesis_presentation_wie_2020",
            name: "WIE Thesis Presentation Workshop",
            date: "2020-11-22",
            image: "/events/2020/thesis_wie.jpg",
            featured: false,
            upcoming: false,
            description: `Women in Engineering organized a specialized workshop on effective thesis presentation skills.

The workshop covered research methodology, presentation design, public speaking techniques, and handling questions during thesis defense. Participants received personalized feedback on their presentation skills.

Senior researchers and faculty members shared tips on creating impactful academic presentations and communicating complex technical concepts effectively.`,
            details: {
                mentors: "Senior Faculty and PhD Candidates",
                venue: "Online via Zoom",
                time: "4:00 PM - 7:00 PM",
                topics: "Presentation Skills, Slide Design, Public Speaking, Q&A Handling",
                participants: "50+ Final Year Students"
            }
        },
        {
            id: "matlab_workshop_2020",
            name: "MATLAB Programming Workshop",
            date: "2020-09-15",
            image: "/events/2020/matlab.jpg",
            featured: true,
            upcoming: false,
            description: `An intensive workshop on MATLAB programming for engineering applications and research.

The workshop covered MATLAB fundamentals, data visualization, signal processing, control systems simulation, and image processing. Participants worked on real-world engineering problems and learned best practices for scientific computing.

This hands-on training equipped students with essential computational skills for academic projects and research.`,
            details: {
                trainer: "Dr. Khondaker Abdullah Al Mamun, Associate Professor, RUET",
                venue: "Computer Lab, RUET",
                duration: "3 Days Workshop",
                topics: "MATLAB Basics, Data Analysis, Simulation, Signal Processing",
                registrationFee: "BDT 150 (IEEE Members), BDT 250 (Non-members)",
                certificate: "Participation Certificate Provided"
            }
        },
        {
            id: "industrial_tour_2020",
            name: "Industrial Tour 2020",
            date: "2020-02-28",
            image: "/events/2020/industrial_tour.jpg",
            featured: false,
            upcoming: false,
            description: `An educational industrial tour to leading manufacturing and technology facilities in Bangladesh.

Students visited power plants, telecommunications facilities, and manufacturing industries to observe real-world applications of engineering principles. Industry professionals explained operational processes, safety protocols, and career opportunities.

This exposure helped students connect theoretical knowledge with practical industrial implementations.`,
            details: {
                destinations: "Ashuganj Power Station, Grameenphone Data Center",
                duration: "2 Days",
                transportation: "Bus Arranged by IEEE RUET SB",
                participants: "45 Students",
                fee: "BDT 500 per Student (Covering Transportation and Meals)"
            }
        },
        {
            id: "techshield_2020",
            name: "TechShield 2020: Cybersecurity Workshop",
            date: "2020-01-18",
            image: "/events/2020/techshield_2020.jpg",
            featured: true,
            upcoming: false,
            description: `A comprehensive cybersecurity workshop addressing the growing importance of information security.

Participants learned about network security, ethical hacking, encryption techniques, and secure coding practices. The workshop included live demonstrations of common vulnerabilities and defensive strategies.

Industry cybersecurity experts shared insights on current threats, career paths in cybersecurity, and best practices for protecting systems and data.`,
            details: {
                trainer: "Md. Sadiq Hussain, Cybersecurity Consultant",
                venue: "CSE Lab, RUET",
                time: "10:00 AM - 5:00 PM",
                topics: "Network Security, Ethical Hacking, Cryptography, Secure Coding",
                registrationFee: "BDT 300 (IEEE Members), BDT 500 (Non-members)",
                tools: "Kali Linux, Wireshark, Metasploit"
            }
        },
        {
            id: "humor_2020",
            name: "Humor in Engineering: Stress Relief Program",
            date: "2020-12-05",
            image: "/events/2020/humor.jpg",
            featured: false,
            upcoming: false,
            description: `A lighthearted event designed to relieve academic stress through comedy and entertainment.

The program featured stand-up comedy performances, funny skits related to engineering student life, and interactive games. Students shared humorous experiences and enjoyed a break from rigorous academic schedules.

This wellness initiative emphasized the importance of mental health and work-life balance in engineering education.`,
            details: {
                venue: "RUET Auditorium",
                time: "6:00 PM - 9:00 PM",
                performances: "Stand-up Comedy, Skits, Improv Games",
                attendance: "300+ Students",
                entry: "Free for All Students"
            }
        },
        {
            id: "vehicle_dynamics_2020",
            name: "Vehicle Dynamics and Control Workshop",
            date: "2020-10-10",
            image: "/events/2020/vehicle.jpg",
            featured: false,
            upcoming: false,
            description: `A specialized workshop on automotive engineering, vehicle dynamics, and control systems.

The workshop explored suspension systems, steering mechanisms, brake systems, and electronic stability control. Participants studied the physics of vehicle motion and modern automotive technologies.

Industry engineers from automotive companies shared insights on electric vehicles, autonomous driving systems, and future trends in transportation.`,
            details: {
                trainer: "Engr. Tanvir Hossain, Automotive Engineer",
                venue: "ME Department, RUET",
                duration: "2 Days",
                topics: "Vehicle Dynamics, Control Systems, Automotive Electronics, EV Technology",
                registrationFee: "BDT 250 (IEEE Members), BDT 400 (Non-members)"
            }
        }
    ],
    2019: [
        {
            id: "agm_2019",
            name: "Annual General Meeting 2019",
            date: "2019-03-15",
            image: "/events/2019/agm_2019.jpg",
            featured: false,
            upcoming: false,
            description: `The 2019 Annual General Meeting brought members together to review accomplishments and plan ahead.

The meeting featured detailed reports from all technical chapters, financial statements, and membership statistics. Members voted on constitutional amendments and elected new leadership for the upcoming term.

Strategic initiatives for expanding IEEE RUET's impact and membership were discussed and approved.`,
            details: {
                venue: "ECE Seminar Hall, RUET",
                time: "10:00 AM - 1:00 PM",
                decisions: "Constitutional Amendments, Budget Approval, Elections",
                newMembers: "Executive Committee Elected for 2019-2020"
            }
        },
        {
            id: "ieee_day_2019",
            name: "IEEE Day 2019",
            date: "2019-10-01",
            image: "/events/2019/ieee_day_2019.jpg",
            featured: true,
            upcoming: false,
            description: `IEEE Day 2019 celebrated with technical exhibitions, competitions, and cultural programs.

The event showcased student innovations, hosted coding competitions, and featured guest lectures from industry leaders. Cultural performances added vibrancy to the technical celebrations.

This annual tradition strengthened IEEE RUET's community while promoting technological excellence and creativity.`,
            details: {
                venue: "RUET Campus",
                time: "Full Day Celebration",
                highlights: "Project Exhibition, Coding Contest, Guest Lectures, Cultural Night",
                attendance: "250+ Participants",
                theme: "Empowering Humanity Through Technology"
            }
        },
        {
            id: "ai_japan_2019",
            name: "AI and Machine Learning Seminar (Japan Collaboration)",
            date: "2019-07-20",
            image: "/events/2019/ai_japan.jpg",
            featured: true,
            upcoming: false,
            description: `An international collaboration seminar featuring AI researchers from Japan sharing cutting-edge developments.

The seminar covered machine learning algorithms, deep learning frameworks, computer vision, and natural language processing. Japanese researchers presented their work on robotics and AI applications in industry.

This collaboration opened opportunities for research partnerships and international academic exchange.`,
            details: {
                guests: "Prof. Hiroshi Tanaka and team from Tokyo Institute of Technology",
                venue: "ECE Auditorium, RUET",
                time: "2:00 PM - 6:00 PM",
                topics: "Machine Learning, Deep Learning, Computer Vision, AI in Robotics",
                specialSession: "Q&A and Research Collaboration Discussion"
            }
        },
        {
            id: "plasmonic_sensors_2019",
            name: "Plasmonic Sensors Workshop",
            date: "2019-09-14",
            image: "/events/2019/plasmonic.jpg",
            featured: false,
            upcoming: false,
            description: `An advanced workshop on plasmonic sensors and their applications in detection and sensing.

Participants explored surface plasmon resonance, nanophotonics, and biosensing applications. The workshop included demonstrations of sensor fabrication and characterization techniques.

This specialized event catered to students interested in nanotechnology, optics, and advanced sensing systems.`,
            details: {
                trainer: "Dr. Farhana Rahman, Nanotechnology Researcher",
                venue: "Physics Lab, RUET",
                duration: "1 Day Intensive Workshop",
                topics: "Surface Plasmon Resonance, Nanophotonics, Biosensors, Applications",
                targetAudience: "Graduate Students and Researchers"
            }
        },
        {
            id: "power_electronics_2019",
            name: "Power Electronics Seminar",
            date: "2019-05-18",
            image: "/events/2019/power_electronics.jpg",
            featured: false,
            upcoming: false,
            description: `A comprehensive seminar on modern power electronics devices, circuits, and applications.

Topics included DC-DC converters, inverters, motor drives, and renewable energy power systems. Industry experts demonstrated practical designs and troubleshooting techniques.

Students gained insights into power semiconductor devices, control strategies, and emerging trends in power electronics.`,
            details: {
                speaker: "Engr. Rakibul Hasan, Power Systems Engineer",
                venue: "EEE Seminar Hall, RUET",
                time: "3:00 PM - 6:00 PM",
                topics: "Power Converters, Motor Drives, Renewable Energy Systems",
                handouts: "Circuit Diagrams and Reference Materials Provided"
            }
        },
        {
            id: "thesis_presentation_workshop_2019",
            name: "Thesis and Paper Presentation Workshop",
            date: "2019-11-30",
            image: "/events/2019/thesis_paper_taz.jpg",
            featured: false,
            upcoming: false,
            description: `A specialized workshop helping students develop effective thesis and research paper presentation skills.

Senior researchers guided participants on structuring presentations, designing slides, articulating research contributions, and handling critical questions during defense.

Mock presentation sessions provided hands-on practice with constructive feedback from experienced mentors.`,
            details: {
                mentors: "Faculty Members and PhD Scholars",
                venue: "ECE Seminar Hall, RUET",
                time: "2:00 PM - 6:00 PM",
                activities: "Presentation Tips, Mock Defense, Peer Review, Feedback Session",
                participants: "60+ Final Year and Graduate Students"
            }
        }
    ],
    2018: [
        {
            id: "ultimate_2018",
            name: "Ultimate Tech Fest 2018",
            date: "2018-12-15",
            image: "/events/2018/ultimate.jpg",
            featured: true,
            upcoming: false,
            description: `Ultimate 2018 was IEEE RUET's grandest tech festival featuring innovation, competition, and celebration.

The multi-day event hosted technical competitions including robotics challenges, coding marathons, hardware design contests, and project showcases. Keynote speakers from leading tech companies inspired students with talks on emerging technologies.

Cultural nights, gaming tournaments, and networking sessions complemented the technical activities, making it a memorable celebration of engineering and technology.`,
            details: {
                duration: "4 Days (Dec 15-18, 2018)",
                venue: "RUET Campus",
                competitions: "15+ Technical and Gaming Competitions",
                participants: "800+ from 20+ Universities",
                prizes: "Total Prize Pool: BDT 100,000",
                guests: "Industry Leaders from bKash, Brain Station 23, Samsung R&D",
                sponsors: "Major Tech Companies and Corporate Partners",
                highlights: "Tech Talks, Project Expo, Cultural Night, Award Ceremony"
            }
        }
    ],
    2017: [
        {
            id: "endnote_workshop_2017",
            name: "EndNote Reference Management Workshop",
            date: "2017-10-25",
            image: "/events/2017/endnote.jpg",
            featured: false,
            upcoming: false,
            description: `A practical workshop on using EndNote for efficient reference management in academic writing.

Participants learned to organize research papers, create citations, manage bibliographies, and integrate EndNote with Microsoft Word. The workshop emphasized best practices for academic writing and avoiding plagiarism.

This essential skill training helped students streamline their research workflow and maintain organized reference libraries.`,
            details: {
                trainer: "Librarian and Research Coordinator, RUET",
                venue: "Computer Lab, RUET",
                duration: "Half Day Workshop",
                topics: "EndNote Basics, Citation Management, Bibliography Creation, Word Integration",
                software: "EndNote X9 Installed on Lab Computers",
                registration: "Free for All Students"
            }
        },
        {
            id: "ieeextreme_2017",
            name: "IEEEXtreme 11.0 Programming Competition",
            date: "2017-10-14",
            image: "/events/2017/extreme.jpg",
            featured: true,
            upcoming: false,
            description: `IEEEXtreme 11.0 - the global 24-hour programming competition organized by IEEE.

Teams of up to three students competed to solve algorithmic problems and programming challenges. The competition tested skills in data structures, algorithms, mathematics, and creative problem-solving.

IEEE RUET SB served as a local hub, providing facilities and support for participating teams to compete against students worldwide.`,
            details: {
                format: "24-Hour Online Competition",
                venue: "CSE Lab, RUET",
                teams: "15 Teams (45 Students) from RUET",
                global: "Part of Worldwide IEEEXtreme Competition",
                support: "Proctors, Internet, Meals Provided Throughout 24 Hours",
                prizes: "Certificates for All Participants, Special Recognition for Top Performers"
            }
        },
        {
            id: "ielts_preparation_2017",
            name: "IELTS Preparation Workshop",
            date: "2017-08-12",
            image: "/events/2017/ielts.jpg",
            featured: false,
            upcoming: false,
            description: `A comprehensive IELTS preparation workshop for students planning higher studies abroad.

Expert trainers covered all four IELTS components: Listening, Reading, Writing, and Speaking. Mock tests, practice materials, and personalized feedback helped students improve their scores.

Tips on test-taking strategies, time management, and common pitfalls were shared to boost confidence and performance.`,
            details: {
                trainer: "Certified IELTS Instructor",
                venue: "ECE Seminar Hall, RUET",
                duration: "3 Days Intensive Workshop",
                topics: "Listening, Reading, Writing, Speaking, Mock Tests",
                materials: "Practice Books and Sample Tests Provided",
                registrationFee: "BDT 500"
            }
        },
        {
            id: "latex_pcb_workshop_2017",
            name: "LaTeX and PCB Design Workshop",
            date: "2017-06-10",
            image: "/events/2017/latex_pcb.jpg",
            featured: true,
            upcoming: false,
            description: `A dual-topic workshop covering LaTeX for academic writing and PCB design for hardware projects.

The LaTeX session taught document preparation, mathematical typesetting, and creating professional academic papers. The PCB design section covered circuit schematic creation, PCB layout, and design for manufacturing.

This comprehensive workshop equipped students with essential tools for both academic research and hardware development.`,
            details: {
                trainers: "Faculty and Senior Students",
                venue: "Computer and Electronics Labs, RUET",
                duration: "2 Days",
                latexTopics: "Document Structure, Math Typesetting, Bibliography Management",
                pcbTopics: "Schematic Capture, PCB Layout, Proteus/Eagle Software",
                software: "Overleaf (LaTeX), Proteus (PCB Design)",
                registrationFee: "BDT 200"
            }
        },
        {
            id: "mobile_app_dev_2017",
            name: "Mobile App Development Bootcamp",
            date: "2017-04-15",
            image: "/events/2017/mobile_app_development.jpg",
            featured: true,
            upcoming: false,
            description: `An intensive bootcamp on Android and iOS mobile application development.

Participants learned mobile UI/UX design principles, programming in Java/Kotlin for Android, and Swift for iOS. The bootcamp included hands-on projects where students built and deployed their own mobile applications.

Industry developers shared insights on app monetization, user acquisition, and publishing apps on Google Play and App Store.`,
            details: {
                trainers: "Professional Mobile App Developers",
                venue: "CSE Lab, RUET",
                duration: "5 Days Intensive Bootcamp",
                platforms: "Android (Java/Kotlin), iOS (Swift)",
                projects: "Students Built and Launched Their Own Apps",
                tools: "Android Studio, Xcode, Firebase",
                registrationFee: "BDT 800 (IEEE Members), BDT 1200 (Non-members)"
            }
        },
        {
            id: "refresh_2017",
            name: "REFRESH 2017: Mental Wellness Program",
            date: "2017-11-18",
            image: "/events/2017/refresh.jpg",
            featured: false,
            upcoming: false,
            description: `A holistic wellness program focused on mental health, stress management, and personal development.

The program featured talks by psychologists on managing academic stress, maintaining work-life balance, and building resilience. Interactive sessions included meditation, mindfulness exercises, and group discussions.

REFRESH aimed to create awareness about mental health and provide students with coping strategies for academic and personal challenges.`,
            details: {
                speakers: "Clinical Psychologists and Wellness Coaches",
                venue: "RUET Auditorium",
                time: "10:00 AM - 4:00 PM",
                topics: "Stress Management, Mindfulness, Emotional Intelligence, Self-Care",
                activities: "Meditation, Group Therapy, Personal Development Sessions",
                entry: "Free for All Students"
            }
        }
    ],
    2016: [
        {
            id: "agm_2016",
            name: "Annual General Meeting 2016",
            date: "2016-03-20",
            image: "/events/2016/agm_16.jpg",
            featured: false,
            upcoming: false,
            description: `AGM 2016 marked another year of growth and achievement for IEEE RUET Student Branch.

Members reviewed annual accomplishments, approved budgets, and elected new executive committee members. Strategic plans for expanding technical activities and increasing membership were discussed.

The meeting reinforced democratic governance and member participation in decision-making processes.`,
            details: {
                venue: "ECE Seminar Hall, RUET",
                time: "11:00 AM - 2:00 PM",
                activities: "Annual Report, Financial Review, Elections, Strategic Planning",
                decisions: "New Committee Elected, Budget Approved, Event Calendar Finalized"
            }
        },
        {
            id: "ieee_day_2016",
            name: "IEEE Day 2016",
            date: "2016-10-04",
            image: "/events/2016/ieee_day_16.jpg",
            featured: true,
            upcoming: false,
            description: `IEEE Day 2016 celebrated with enthusiasm through technical and cultural activities.

The celebration included poster presentations, guest lectures on emerging technologies, and interactive sessions with industry professionals. Cultural performances and team-building activities fostered community spirit.

This global celebration connected IEEE RUET members with the worldwide IEEE community.`,
            details: {
                venue: "RUET Campus",
                time: "Full Day Event",
                activities: "Poster Session, Tech Talks, Cultural Programs, Networking",
                theme: "Connecting the Unconnected",
                attendance: "180+ Members and Guests"
            }
        },
        {
            id: "app_dev_workshop_2016",
            name: "Application Development Workshop",
            date: "2016-07-16",
            image: "/events/2016/app_dev.jpg",
            featured: false,
            upcoming: false,
            description: `A comprehensive workshop covering web and desktop application development fundamentals.

Participants learned HTML, CSS, JavaScript for web development, and frameworks like React and Node.js. Desktop application development using Python and Electron was also covered.

The hands-on approach ensured students built real applications during the workshop, gaining practical development experience.`,
            details: {
                trainer: "Software Engineers from Local Tech Companies",
                venue: "CSE Lab, RUET",
                duration: "4 Days",
                technologies: "HTML/CSS/JS, React, Node.js, Python, Electron",
                projects: "Students Built Portfolio Websites and Desktop Apps",
                registrationFee: "BDT 300"
            }
        },
        {
            id: "line_follower_maze_solver_2016",
            name: "Line Follower and Maze Solver Robot Competition",
            date: "2016-11-05",
            image: "/events/2016/line_follower_maze_solver.jpg",
            featured: true,
            upcoming: false,
            description: `An exciting robotics competition challenging students to build autonomous line-following and maze-solving robots.

Teams designed, built, and programmed robots to navigate complex tracks and solve mazes using sensors and microcontrollers. The competition tested mechanical design, circuit implementation, and programming skills.

This popular event inspired interest in robotics and hands-on engineering among participants.`,
            details: {
                venue: "RUET Central Field",
                categories: "Line Follower Race, Maze Solver Challenge",
                teams: "25+ Teams from Various Departments",
                prizes: "Winners Received Cash Prizes and Certificates",
                judges: "Faculty and Industry Robotics Experts",
                registrationFee: "BDT 500 per Team"
            }
        },
        {
            id: "presentation_skills_2016",
            name: "Effective Presentation Skills Workshop",
            date: "2016-05-22",
            image: "/events/2016/presentation.jpg",
            featured: false,
            upcoming: false,
            description: `A workshop dedicated to developing powerful presentation and public speaking skills.

Participants learned slide design principles, storytelling techniques, body language, voice modulation, and audience engagement strategies. Practice sessions with video feedback helped identify and improve weaknesses.

This essential soft-skills training prepared students for academic presentations, job interviews, and professional communication.`,
            details: {
                trainer: "Communication Skills Expert",
                venue: "ECE Auditorium, RUET",
                duration: "2 Days",
                topics: "Slide Design, Public Speaking, Body Language, Audience Engagement",
                activities: "Practice Presentations, Video Feedback, Peer Review",
                certificate: "Provided to All Participants"
            }
        },
        {
            id: "robo_droid_2016",
            name: "Robo-Droid 2016: Robotics Challenge",
            date: "2016-09-10",
            image: "/events/2016/robo-droid.jpg",
            featured: true,
            upcoming: false,
            description: `Robo-Droid 2016 brought together robotics enthusiasts for an intense multi-challenge competition.

The event featured obstacle courses, object manipulation tasks, and autonomous navigation challenges. Teams showcased advanced robotics incorporating computer vision, machine learning, and complex sensor fusion.

This flagship robotics event pushed the boundaries of student innovation and technical capabilities.`,
            details: {
                duration: "2 Days Competition",
                venue: "RUET Gymnasium",
                challenges: "Obstacle Course, Object Manipulation, Autonomous Navigation, Combat Robots",
                teams: "40+ Teams from 12 Universities",
                prizes: "Total Prize Pool: BDT 30,000",
                sponsors: "Tech Companies and Industrial Partners"
            }
        },
        {
            id: "matlab_seminar_2016",
            name: "MATLAB for Engineers Seminar",
            date: "2016-04-09",
            image: "/events/2016/seminar_matlab.jpg",
            featured: false,
            upcoming: false,
            description: `An introductory seminar on MATLAB programming tailored for engineering students.

The seminar covered MATLAB environment, basic programming constructs, plotting and visualization, and solving engineering problems computationally. Practical examples from various engineering disciplines demonstrated MATLAB's versatility.

This foundation prepared students for advanced coursework and research involving computational tools.`,
            details: {
                speaker: "Faculty Member, EEE Department",
                venue: "Computer Lab, RUET",
                time: "3:00 PM - 6:00 PM",
                topics: "MATLAB Basics, Plotting, Numerical Methods, Engineering Applications",
                materials: "Code Examples and Tutorial PDFs Provided",
                registration: "Free for All Students"
            }
        }
    ],
    2015: [
        {
            id: "ieee_day_2015",
            name: "IEEE Day 2015",
            date: "2015-10-06",
            image: "/events/2015/day_15.jpg",
            featured: false,
            upcoming: false,
            description: `IEEE Day 2015 celebrated the rich heritage and global impact of IEEE organization.

The event featured technical presentations by students, guest lectures on technology trends, and networking opportunities with professionals. Social activities strengthened bonds within the IEEE RUET community.

This annual celebration highlighted IEEE's role in advancing technology for humanity.`,
            details: {
                venue: "RUET Campus",
                time: "Full Day Program",
                activities: "Technical Presentations, Guest Lectures, Networking, Social Events",
                theme: "Advancing Technology for Humanity",
                attendance: "150+ Participants"
            }
        },
        {
            id: "green_brain_2015",
            name: "Green Brain: Environmental Tech Summit",
            date: "2015-08-22",
            image: "/events/2015/green_brain.jpg",
            featured: true,
            upcoming: false,
            description: `Green Brain 2015 focused on sustainable technologies and environmental solutions through engineering.

The summit explored renewable energy systems, waste management technologies, water purification methods, and green building concepts. Students presented innovative projects addressing environmental challenges.

This event emphasized engineers' responsibility in creating sustainable solutions for environmental problems.`,
            details: {
                venue: "ECE Auditorium, RUET",
                time: "10:00 AM - 5:00 PM",
                topics: "Renewable Energy, Waste Management, Water Tech, Sustainable Engineering",
                presentations: "15+ Student Project Presentations",
                guests: "Environmental Engineers and Sustainability Experts",
                theme: "Engineering for a Greener Tomorrow"
            }
        },
        {
            id: "technical_paper_presentation_2015",
            name: "Technical Paper Presentation Competition",
            date: "2015-05-16",
            image: "/events/2015/technical_paper.jpg",
            featured: true,
            upcoming: false,
            description: `A competitive platform for students to present their research and technical papers.

Participants presented original research, literature reviews, and technical analyses across various engineering disciplines. Expert judges evaluated presentations based on technical content, clarity, and presentation skills.

This academic competition encouraged research culture and academic excellence among students.`,
            details: {
                venue: "ECE Seminar Hall, RUET",
                time: "9:00 AM - 4:00 PM",
                categories: "Electronics, Power Systems, Computer Science, Mechanical Engineering",
                participants: "30+ Presenters",
                judges: "Faculty and Industry Researchers",
                prizes: "Best Paper Awards with Cash Prizes and Certificates",
                registrationFee: "BDT 100 per Presenter"
            }
        }
    ],
    2014: []
};

/**
 * Get all events for a specific year
 */
export function getEventsByYear(year) {
    return eventsData[year] || [];
}

/**
 * Get all available years with events
 */
export function getEventYears() {
    return Object.keys(eventsData)
        .filter(year => eventsData[year].length > 0)
        .sort((a, b) => b.localeCompare(a));
}

/**
 * Get all years that have past events
 */
export function getPastEventYears() {
    const years = new Set();
    for (const year in eventsData) {
        const hasPastEvents = eventsData[year].some(event => event.upcoming === false);
        if (hasPastEvents) {
            years.add(year);
        }
    }
    return Array.from(years).sort((a, b) => b.localeCompare(a));
}

/**
 * Get a single event by ID
 */
export function getEventById(eventId) {
    for (const year in eventsData) {
        const event = eventsData[year].find(e => e.id === eventId);
        if (event) {
            return { ...event, year };
        }
    }
    return null;
}

/**
 * Get upcoming events (events marked as upcoming)
 */
export function getUpcomingEvents() {
    const upcoming = [];
    for (const year in eventsData) {
        eventsData[year].forEach(event => {
            if (event.upcoming) {
                upcoming.push({ ...event, year });
            }
        });
    }

    return upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
}

/**
 * Get past events (events marked as past)
 */
export function getPastEvents() {
    const past = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const year in eventsData) {
        eventsData[year].forEach(event => {
            const eventDate = new Date(event.date);
            if (event.upcoming === false || eventDate < today) {
                past.push({ ...event, year });
            }
        });
    }

    return past.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get featured events
 */
export function getFeaturedEvents() {
    const featured = [];
    for (const year in eventsData) {
        eventsData[year].forEach(event => {
            if (event.featured) {
                featured.push({ ...event, year });
            }
        });
    }

    return featured.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Format event date for display
 */
export function formatEventDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export default eventsData;

