'use client'

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AMButton from "@/app/_components/button";
import {IoArrowDownSharp} from "react-icons/io5";
import {Link} from "@heroui/react";

const experience = [
    {
        org: "Georgia Institute of Technology",
        location: "Atlanta, GA",
        role: "Intro to Linear Algebra Undergraduate Teaching Assistant",
        date: "August 2026–Present",
        bullets: [
            "Independently taught 71 students across 2 studio sections in Linear Algebra; worked problems and administered quizzes.",
            "Held office hours students attended for one-on-one support in Linear Algebra, Calculus I–III, and Differential Equations.",
            "Collaborated closely with the Course Coordinator and my section’s instructor for content coverage, course materials, and exam grading. Additionally communicated with an instructional team of 31 other undergraduate and graduate TAs.",
        ],
    },
    {
        org: "Dance Canvas",
        location: "Atlanta, GA",
        role: "Lighting Designer – DC Next Program",
        date: "June 2026",
        bullets: [
            "Implemented a lighting plot to meet the program’s performance needs, including ETC and Chauvet professional fixtures.",
            "Communicated with 8 different choreographers about preferred lighting design and programmed the show on the theatre’s ETC Ion lightboard. Additionally operated the lightboard for one hour-long showcase performance.",
        ],
    },
    {
        org: "Georgia Institute of Technology",
        location: "Atlanta, GA",
        role: "Digital Design Laboratory Undergraduate Teaching Assistant",
        date: "May–July 2026",
        bullets: [
            "Guided CS and ECE students through the completion of Digital Design laboratories, covering concepts including logic and state machine design, block and wiring diagrams, breadboard prototyping, FPGA programming, VHDL programming, and assembly programming for a proprietary computer architecture.",
            "Supported over 40 students across 3 lab sections during a summer semester course, staffing the lab 16 hours per week.",
            "Collaborated with an instructional team of 8 other undergraduate TAs and 3 graduate TAs.",
        ],
    },
    {
        org: "Primoris Academy",
        location: "Westwood, NJ",
        role: "First Lego League Robotics Coach",
        date: "July–August 2024",
        bullets: [
            "Individually created, planned, and taught a 2-week summer robotics workshop for middle school students, covering robot and attachment design, navigation and strategy, and sensing and proportional control.",
        ],
    },
    {
        org: "Kulite Semiconductor Products",
        location: "Leonia, NJ",
        description: "Medium-sized company designing and producing semiconductor products, such as pressure transducers for aircraft and automobiles",
        date: "May–July 2024",
        bullets: [
            "Developed and carried out a method for accounting the company’s scope 3 greenhouse gas emissions, allowing the company to apply for 2 environmental certifications, and provide precise emissions data to clients.",
            "Improved the company’s photolithography database, reworking the user interface and cleaning the existing data, removing over 100 duplicate entries and mitigating the causes of future duplicates.",
        ],
    },
];

const leadership = [
    {
        org: "DramaTech Theatre",
        location: "Atlanta, GA",
        role: "Secretary – Executive Council, Technical Services Council",
        date: "January 2025–Present",
        bullets: [
            "Elected to the organization’s Executive Council for the 2025–2026 academic year.",
            "Created a program to automatically count ranked choice votes, saving myself and future secretaries the work of manually tabulating ranked choice ballots for 5 major elections per academic year.",
            "Appointed member of the Technical Services Council responsible for general maintenance and upkeep, as well as non-production related purchasing of equipment and materials.",
            "Led a team in the design and implementation of a lighting rep-plot, resulting in the removal and returning to stock of 22 lighting fixtures, and a re-usable base lighting plot for 4 upcoming productions that year.",
        ],
    },
];

const skills = [
    { label: "Programming", value: "Java, Python, C, C++, C#, JavaScript, PHP, SQL, PostgreSQL, Node.js, React, JUCE, MATLAB" },
    { label: "Platforms", value: "Linux (Ubuntu), Google Cloud Platform, Firebase, Amazon AWS, MongoDB, Supabase" },
    { label: "Hardware", value: "Raspberry Pi, Arduino, ESP32 microcontrollers, FPGAs, oscilloscope, logic analyzer" },
    { label: "Software", value: "Altera Quartus II, GitHub, Ableton Live, Logic Pro X, Max MSP, IntelliJ, PyCharm, Visual Studio, Visual Studio Code" },
    { label: "Communication", value: "Lecture, leadership reports, technical reports, research papers, presentations, performance" },
    { label: "Languages", value: "English (first), Chinese (beginner)" },
];

const coursework = [
    { name: "Automata and Complexity Theory", description: "Computational machine models and their language classes, automata, regular expressions, computability, undecidability, resource-bounded computations. Central complexity-theoretic concepts such as complexity classes, reducibility and completeness." },
    { name: "Intro to Signal Processing", description: "Introduction to discrete-time signal processing including phasor math, spectra, DFT, sampling, frequency response, and filtering. Laboratory focused on applying course concepts using MATLAB." },
    { name: "Embedded Systems Design", description: "Design and implementation of embedded systems using ESP32 family microcontrollers. Development of software in C for embedded devices, memory mapped I/O and common I/O protocols." },
    { name: "Architecture, Systems, Concurrency and Energy in Computation", description: "Major organizational components of a processor, cycles-per-instruction evaluation, hazard handling in a pipelined datapath, virtual memory, scheduling, basic I/O mechanisms, parallelism. Laboratory focused on applying concepts using Verilog HDL, testbenches, simulation, and waveform analysis." },
    { name: "Design and Analysis of Algorithms", description: "Basics of algorithm design and complexity analysis. Divide and conquer, graphs, dynamic programming, and NP-completeness." },
    { name: "Digital Design Lab", description: "Design and implementation of digital systems, including a team design project. VHDL programming, FPGA programming on the DE10 Standard Development board using Quartus, logic synthesis, and assembly language programming." },
    { name: "Objects and Design", description: "Object-oriented programming methods for dealing with large programs. Focus on collaborative development roles and processes, effective debugging techniques, and testing to assure a quality product." },
    { name: "Programming Hardware/Software Systems", description: "Creation of complex execution and storage mechanisms, based on the RISC-V instruction set architecture. Low-level programming and memory management on the ARM mbed controller using C." },
    { name: "Computer Organization and Programming", description: "An introduction to basic computer hardware, machine language, and assembly language using the LC3 architecture. Coverage of C programming and memory management including an individual game programming project on a Game Boy Advance emulator." },
    { name: "Music Recording and Mixing", description: "Overview of concepts, techniques, hardware, and software used in audio production. Basics of audio hardware and acoustics, microphones and recording setups, and the function and usage of common audio effects." },
    { name: "Intro to Audio Tech I & II", description: "Critical understanding of, and hands-on experience with the fundamentals of analog and digital audio technology. Topics include signals and systems, electro-acoustics, sound effects, synthesis, music protocols, sampling, quantization, and digital effects. Group projects in music information retrieval using Python and real-time audio coding in C++ using the JUCE framework." },
    { name: "Intro to Artificial Intelligence", description: "An introduction to artificial intelligence and machine learning. Topics include intelligent system design methodologies, search and problem solving, supervised and reinforced learning." },
    { name: "Intro to Perception and Robotics", description: "Covers fundamental problems and leading solutions for computer and robot perception and action from the point of view of autonomous robot navigation." },
    { name: "Cloud Computing", description: "How to use AWS cloud computing services with the web console and Python API, such as elastic computing, cloud storage, cloud databases, cloud security, and architecting, developing and deploying apps in the cloud." },
];

// Global h1–h6 styles are sized for hero/landing sections, so this page scales them down locally.
const SECTION = "mb-10 p-6 md:p-8";
const SECTION_TITLE = "text-3xl md:text-4xl mb-4";
const ENTRY_TITLE = "text-xl md:text-2xl";
const LABEL = "font-body font-bold text-base md:text-lg";

function EntryHeader({ title, location, date, className }) {
    return (
        <div className={`flex flex-wrap justify-between items-baseline gap-x-4 ${className}`}>
            <h3 className={ENTRY_TITLE}>{title}{location && <span className="font-body text-base font-normal opacity-80"> | {location}</span>}</h3>
            <p className="text-sm md:text-base">{date}</p>
        </div>
    );
}

function Entry({ item, headingClass, roleClass }) {
    return (
        <div className="flex flex-col gap-1">
            <EntryHeader title={item.org} location={item.location} date={item.date} className={headingClass} />
            {item.role && <p className={`italic font-semibold ${roleClass}`}>{item.role}</p>}
            {item.description && <p className="italic text-default-600">{item.description}</p>}
            <ul className="list-disc pl-6 mt-1 space-y-1">
                {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
        </div>
    );
}

export default function Resume() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const container = useRef();
    const title = useRef();
    const sections = useRef([]);

    const {contextSafe} = useGSAP(() => {
        // Initial animation
        gsap.from(title.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });

        // Animate sections on scroll
        sections.current.forEach((section, index) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: 0.5
                },
                x: index % 2 === 0 ? -160 : 160,
                opacity: 0,
                ease: "power2.out"
            });
        });
    }, { scope: container });

    const onSeeClick = contextSafe(() => {
        gsap.to(window, { duration: 1.5, scrollTo: {y: '#sections', offsetY: 96} });
    });

    return (
        <main className="min-h-screen w-full flex flex-col items-center overflow-x-hidden" id="smooth-wrapper" ref={container}>
            <div className="w-full max-w-7xl px-4 sm:px-8" id="smooth-content">
                <div className="flex flex-col gap-6 items-center justify-center text-center h-screen pt-24 pb-16">
                    <div ref={title} className="text-red-400 flex flex-col gap-4">
                        <h1>Resume</h1>
                        <h5>Get the details on my education, experience, skills, and more below.</h5>
                        <span className="flex justify-center">
                            <AMButton color={'red'} shade={400} onClick={onSeeClick} endContent={<IoArrowDownSharp className={'animate-bounce'}/>}>Learn More</AMButton>
                        </span>
                    </div>
                </div>
                <div
                    ref={el => sections.current[0] = el}
                    className="mb-16 p-8 bg-orange-50"
                    id="sections"
                >
                    <h2 className="text-orange-500 mb-4">Education</h2>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <span className="flex flex-wrap justify-between items-center gap-x-4 text-orange-600">
                                <h4>Georgia Institute of Technology<span className="font-normal opacity-80"> | Atlanta, GA</span></h4>
                                <h5>August 2023&ndash;Present</h5>
                            </span>
                            <span>
                                <h6>Bachelor of Science in Computational Media and Computer Engineering</h6>
                                <p>Expected Graduation: May 2028</p>
                            </span>
                            <span>
                                <p>Concentrations in Intelligence and Music Technology, and Distributed Systems and Software Design and Signal Processing</p>
                            </span>
                            <span><strong>GPA:</strong> 4.00</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="flex flex-wrap justify-between items-center gap-x-4 text-orange-600">
                                <h4>Fairleigh Dickinson University<span className="font-normal opacity-80"> | Teaneck, NJ</span></h4>
                                <h5>September 2021&ndash;May 2023</h5>
                            </span>
                            <span>Dual Enrollment with high school &ndash; 12 Credit Hours</span>
                            <span><strong>GPA:</strong> 3.92</span>
                        </div>
                    </div>
                </div>
                <div
                    ref={el => sections.current[1] = el}
                    className="mb-16 p-8 bg-yellow-50"
                >
                    <h2 className="text-yellow-500 mb-4">Experience</h2>
                    <div className="space-y-6">
                        {experience.map((item, i) => (
                            <Entry key={i} item={item} headingClass="text-yellow-600" roleClass="text-yellow-700" />
                        ))}
                    </div>
                </div>
                <div
                    ref={el => sections.current[3] = el}
                    className="mb-16 p-8 bg-blue-50"
                >
                    <h2 className="text-blue-500 mb-4">Leadership</h2>
                    <div className="space-y-6">
                        {leadership.map((item, i) => (
                            <Entry key={i} item={item} headingClass="text-blue-600" roleClass="text-blue-700" />
                        ))}
                    </div>
                </div>
                <div
                    ref={el => sections.current[4] = el}
                    className="mb-16 p-8 bg-violet-50"
                >
                    <h2 className="text-violet-500 mb-4">Skills & Expertise</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-4 gap-y-2 gap-x-6">
                        {skills.map(s => (
                            <div key={s.label}>
                                <h5 className="text-violet-600">{s.label}</h5>
                                <p>{s.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    ref={el => sections.current[5] = el}
                    className="mb-16 p-8 bg-pink-50"
                >
                    <h2 className="text-pink-500 mb-4">Relevant Coursework</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 py-4 gap-y-4 gap-x-6">
                        {coursework.map(c => (
                            <div key={c.name}>
                                <h5 className="text-pink-600">{c.name}</h5>
                                <p>{c.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    ref={el => sections.current[6] = el}
                    className="mb-16 text-center"
                >
                    <h2 className="text-indigo-500 mb-4">Let&apos;s Connect!</h2>
                    <p className="text-default-600 mb-6">I don&apos;t have a Linkedin yet, but you can sure send me an
                        email at <Link href="mailto:aidan.mascoli@gmail.com" color="indigo">aidan.mascoli@gmail.com</Link>, or use
                        this contact form.</p>
                    <div className="flex justify-center gap-4">
                        <AMButton color="indigo" shade={500} href="/inquire">Contact Me</AMButton>
                    </div>
                </div>
            </div>
        </main>
    )
}
