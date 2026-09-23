'use client'

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AMButton from "@/app/_components/button";
import {IoArrowDownSharp} from "react-icons/io5";
import Image from "next/image";
import {Link} from "@heroui/react";

export default function Resume() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const container = useRef();
    const title = useRef();
    const pdf = useRef();
    const sections = useRef([]);

    const {contextSafe} = useGSAP(() => {
        // Initial animation
        gsap.from(title.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });

        gsap.from(pdf.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.5
        })

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
        <main className="min-h-screen w-full flex flex-col items-center" id="smooth-wrapper" ref={container}>
            <div className="w-full max-w-7xl px-4 sm:px-8" id="smooth-content">
                <div className="flex flex-col gap-6 items-center text-center h-screen pt-24 pb-16">
                    <div ref={title} className="text-red-400 flex flex-col gap-4">
                        <h1>Resume</h1>
                        <h5>You can view or download the one page version of my resume here, or see more details below.</h5>
                        <span className="flex justify-center">
                            <AMButton color={'red'} shade={400} onClick={onSeeClick} endContent={<IoArrowDownSharp className={'animate-bounce'}/>}>Learn More</AMButton>
                        </span>
                    </div>
                    <object ref={pdf} className="w-full grow shrink" data="/files/resume.pdf" width="800"></object>
                </div>
                <div
                    ref={el => sections.current[0] = el}
                    className="mb-16 p-8 bg-orange-50"
                    id="sections"
                >
                    <h2 className="text-orange-500 mb-4">Education</h2>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <span className="flex justify-between items-center text-orange-600">
                                <h4 className="">Georgia Institute of Technology</h4>
                                <h5>Expected Graduation 2028</h5>
                            </span>
                            <span>
                                <h6>BS in Computational Media</h6>
                                <p>Concentration in Intelligence and Music Technology</p>
                            </span>
                            <span>
                                <h6>BS in Computer Engineering</h6>
                                <p>Concentration in Distributed Systems & Software Design and Signal & Information Processing</p>
                            </span>
                            <span><strong>GPA:</strong> 4.0 (out of 4.0 unweighted)</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="flex justify-between items-center text-orange-600">
                                <h4 className="">Fairleigh Dickinson University</h4>
                                <h5>2021&ndash;2023</h5>
                            </span>
                            <span><strong>Dual Enrollment</strong> - Visiting Student</span>
                            <span><strong>GPA:</strong> 3.92 (out of 4.0 unweighted)</span>
                        </div>
                    </div>
                </div>
                <div
                    ref={el => sections.current[1] = el}
                    className="mb-16 p-8 bg-yellow-50"
                >
                    <h2 className="text-yellow-500 mb-4">Experience</h2>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <span className="flex justify-between items-center text-yellow-600">
                                <h4 className="">Kulite Semiconductor Products</h4>
                                <h5>May&ndash;July 2024</h5>
                            </span>
                            <ul className="list-disc pl-6">
                                <li>Accounted the company’s greenhouse gas emissions over 1 year by collecting and
                                analyzing purchasing, waste disposal, water, electrical, gas, and spending data</li>
                                <li>Completed a report and documenting the process for future calculations</li>
                                <li>Worked on improvements to the company’s photolithography database, specifically to
                                the data entry methods and procedures</li>
                            </ul>
                            <p><strong>Tools Used:</strong> Microsoft Access, Visual Basic, Excel, and Word</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="flex justify-between items-center text-yellow-600">
                                <h4 className="">Primoris Academy</h4>
                                <h5>July&ndash;August 2024</h5>
                            </span>
                            <ul className="list-disc pl-6">
                                <li>Individually created, planned, and taught a 2-week summer robotics workshop (specifically for the FIRST Lego League competition) for middle school students</li>
                            </ul>
                            <p><strong>Tools Used:</strong> LEGO&reg; Education SPIKE&trade; Prime</p>
                        </div>
                    </div>
                </div>
                <div
                    ref={el => sections.current[2] = el}
                    className="mb-16 p-8 bg-green-50"
                >
                    <h2 className="text-green-600 mb-4">Awards & Honors</h2>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <h5 className="text-green-700">American Mathematics Competitions (AMC)</h5>
                            <span className="pl-6 flex flex-row justify-between">
                                <p>Qualified for AIME</p>
                                <p>2020&ndash;2022</p>
                            </span>
                            <span className="pl-6 flex flex-row justify-between">
                                <p>Scored 6 out of 15 on the AIME</p>
                                <p>2020&ndash;2021</p>
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h5 className="text-green-700">American Computer Science League (ACSL)</h5>
                            <span className="pl-6 flex flex-row justify-between">
                                <p>Bronze Award in National Senior Division Finals</p>
                                <p>2022</p>
                            </span>
                            <span className="pl-6 flex flex-row justify-between">
                                <p>4th Nationally in Intermediate Division Finals</p>
                                <p>2021</p>
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h5 className="text-green-700">USA Computing Olympiad (USACO)</h5>
                            <span className="pl-6 flex flex-row justify-between">
                                <p>Silver Qualifier (Bronze Division perfect score)</p>
                                <p>2022</p>
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h5 className="text-green-700">Cornell University Programming Contest</h5>
                            <span className="pl-6 flex flex-row justify-between">
                                <p>Third Place Team Nationally</p>
                                <p>2023</p>
                            </span>
                            <span className="pl-6 flex flex-row justify-between">
                                <p>Fourth Place Team Nationally</p>
                                <p>2022</p>
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h5 className="text-green-700">CyberStart America</h5>
                            <span className="pl-6 flex flex-row justify-between">
                                <p>Advanced to Bronze Level</p>
                                <p>2022</p>
                            </span>
                            <span className="pl-6 flex flex-row justify-between">
                                <p>National Cyber Scholarship Candidate</p>
                                <p>2022</p>
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h5 className="text-green-700">Scholastic Art and Writing Awards</h5>
                            <span className="pl-6 flex flex-row justify-between">
                                <p>Science Fiction / Fantasy - Honorable Mention</p>
                                <p>2022&ndash;2023</p>
                            </span>
                            <span className="pl-6 flex flex-row justify-between">
                                <p>Short Story - Gold Key</p>
                                <p>2020&ndash;2021</p>
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    ref={el => sections.current[3] = el}
                    className="mb-16 p-8 bg-blue-50"
                >
                    <h2 className="text-blue-500 mb-4">Leadership</h2>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <h4 className="text-blue-600">Student Government - Primoris Academy</h4>
                            <div className="pl-6">
                                <span className="flex justify-between items-center text-blue-700">
                                    <h5>Senior Leadership Committee</h5>
                                    <p>2022&ndash;2023</p>
                                </span>
                                <ul className="list-disc pl-6">
                                    <li>Responsible for planning and executing school events, including social events and fundraisers.</li>
                                    <li>In charge of budgeting and management of student event funds.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-blue-600">DramaTech Theatre - Georgia Tech</h4>
                            <div className="pl-6">
                                <span className="flex justify-between items-center text-blue-700">
                                    <h5>Executive Council - Secretary</h5>
                                    <p>April 2025&ndash;Present</p>
                                </span>
                                <ul className="list-disc pl-6">
                                    <li>Elected to club leadership position for the 2025-2026 academic year.</li>
                                    <li>Responsibilities include attending leadership meetings and providing reports,
                                    taking meeting minutes, running club elections, and managing the organization’s
                                    Slack workspace and website, and replying to or forwarding emails sent to the club.</li>
                                </ul>
                                <span className="flex justify-between items-center text-blue-700">
                                    <h5>Technical Services Council - Member</h5>
                                    <p>January 2025&ndash;Present</p>
                                </span>
                                <ul className="list-disc pl-6">
                                    <li>Initially appointed as an intern, promoted to a full lifetime member in April 2025.</li>
                                    <li>Responsible for general maintenance and upkeep, as well as general non-production
                                    improvements such as purchasing and installing new equipment, and general safety and
                                    emergency response procedures</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    ref={el => sections.current[4] = el}
                    className="mb-16 p-8 bg-violet-50"
                >
                    <h2 className="text-violet-500 mb-4">Skills & Expertise</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-4 gap-y-2 gap-x-6">
                        <div>
                            <h5 className="text-violet-600">Programming</h5>
                            <p>Java, Python, C, C#, C++, HTML, CSS, JavaScript, PHP, SQL, React, Node.js, Django, Unity, DirectX</p>
                        </div>
                        <div>
                            <h5 className="text-violet-600">Platforms</h5>
                            <p>Amazon AWS, Google Cloud Platform, Firebase</p>
                        </div>
                        <div>
                            <h5 className="text-violet-600">Hardware</h5>
                            <p>Arduino, ARM mbed microcontroller, FPGAs, oscilloscope</p>
                        </div>
                        <div>
                            <h5 className="text-violet-600">Software</h5>
                            <p>Altera Quartus II, NI LabVIEW, GitHub, Adobe Creative Cloud (Photoshop, Illustrator, Premiere Pro, After Effects), Ableton Live, Logic Pro X, Microsoft Office (Word, Excel, PowerPoint, Access)</p>
                        </div>
                        <div>
                            <h5 className="text-violet-600">Communication</h5>
                            <p>Leadership reports, production reports, writing research papers/reports, presentations, performance</p>
                        </div>
                        <div>
                            <h5 className="text-violet-600">Languages</h5>
                            <p>English (first), Chinese (beginner)</p>
                        </div>
                    </div>
                </div>
                <div
                    ref={el => sections.current[5] = el}
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