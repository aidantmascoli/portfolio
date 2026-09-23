'use client'

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AMButton from "@/app/_components/button";
import Image from "next/image";
import {Divider, Link} from "@heroui/react";
import {IoArrowDownSharp} from "react-icons/io5";

export default function About() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const container = useRef();
    const title = useRef();
    const mainImage = useRef();
    const sections = useRef([]);

    const {contextSafe} = useGSAP(() => {
        // Initial animation
        gsap.from(title.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });

        gsap.from(mainImage.current, {
            x: 100,
            opacity: 0,
            duration: 1,
            delay: 0.3,
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
                x: -200,
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
                <div className="flex flex-col md:flex-row gap-8 items-center min-h-screen pt-16">
                    <div ref={title} className="w-full md:w-1/2 flex flex-col gap-4">
                        <h1 className="text-red-400">About Me</h1>
                        <p>Hi, I&apos;m Aidan, a multi-talented creator and engineer specializing in software and
                        hardware design. Driven by a deep passion for creating  and applying my skills, I thrive on
                        bringing ideas to life and delivering tangible results.</p>
                        <p>With expertise across multiple fields, I pride myself on
                        understanding the big picture and contributing cohesively to projects. Whether leading the
                        charge or collaborating as part of a team, I love making meaningful, impactful work.</p>
                        <span className="flex justify-center">
                            <AMButton color={'red'} shade={400} onClick={onSeeClick} endContent={<IoArrowDownSharp className={'animate-bounce'}/>}>Learn More</AMButton>
                        </span>
                    </div>
                    <div ref={mainImage} className="w-full md:w-1/2 aspect-square relative">
                        <Image
                            src="/images/coverPhoto.jpg"
                            alt="About Me"
                            fill
                            className="object-cover object-bottom"
                        />
                    </div>
                </div>

                <div
                    ref={el => sections.current[0] = el}
                    className="mb-16"
                    id="sections"
                >
                    <h2 className="text-orange-500 mb-4">Biography</h2>
                    <div className="px-2 flex flex-col gap-2">
                        <p>My name is Aidan Mascoli, and I am originally from Fair Lawn, New Jersey. I am currently
                        residing in Atlanta, Georgia as I study Computational Media and Computer Engineering at the
                        Georgia Institute of Technology. This fall, I will be a junior, and I am currently expecting
                        to graduate in the Spring of 2028.</p>
                        <p>I started my career at Georgia Tech as a computational media major. As I pursued my
                        coursework and discussed the direction of technology with my peers, I developed an interest in
                        the hardware platforms that the software and algorithms I studied operated on. I have taken on
                        hardware projects in the past, including robotics competitions in high school, and embedded
                        systems projects using arduino platforms. Hardware technology both facilitates and limits the
                        capability of the software that runs on it. Having an interest and experience in both can
                        enhance the capability of the combined final product.</p>
                        <p>Thus, I decided to add computer engineering as a second major. Having completed the first
                        year of the computer engineering program, I can confidently say that despite the increased
                        course load and overall difficulty of completing two majors, I am very happy with my decision to
                        enroll in the ECE program. Learning more about hardware has felt like the most rewarding
                        experience of my college career. I always enjoyed getting to the end of a software project
                        and seeing the results, but now, with hardware projects, I enjoy the final product even
                        more, looking at something tangible that I built.</p>
                    </div>
                </div>

                <div
                    ref={el => sections.current[1] = el}
                    className="mb-16"
                >
                    <h2 className="text-yellow-500 mb-4">Carreer Goals</h2>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
                        <div className="col-span-1 flex flex-col gap-2">
                            <h5 className="text-yellow-600 mb-3">5-Year Plan</h5>
                            <p>Five years from now, I would like to be working full time at an audio technology company.
                            I am also interested in furthering my education by going to graduate school, so I would like
                            to be working at a company that can accommodate and support employees in doing this.</p>
                        </div>
                        <div className="col-span-1 flex flex-col gap-2">
                            <h5 className="text-yellow-600 mb-3">10-Year Plan</h5>
                            <p>Ten years from now, I hope to have completed a masters and PhD. After which I would like
                            to hold in a research position, either at a private company, or at a university&mdash;possibly
                            supplemented by teaching.</p>
                        </div>
                    </div>
                </div>

                <div
                    ref={el => sections.current[2] = el}
                    className="mb-16"
                >
                    <h2 className="text-green-600 mb-4">Interests & Hobbies</h2>
                    <p className="text-default-600 mb-4">In my free time, I like to either work on personal coding
                    projects, create and edit video content, play guitar, create beats, remix songs, or just play
                    around with samples on Ableton Live. When I can I love going to concerts, and travelling.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-[repeat(4,auto)] md:grid-rows-[repeat(2,auto)] gap-x-8 gap-y-2">
                        <i className="text-small row-start-2">
                            A website I created for a student government campaign this past year.
                        </i>
                        <i className="text-small row-start-4 md:row-start-2">A song I composed in Ableton Live.</i>
                        <div className="aspect-video relative">
                            <Image
                                src="/images/dhruvandkyra.png"
                                alt="Dhruv and Kyra Campaign Website"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="aspect-video relative">
                            <Image
                                src="/images/ableton.jpg"
                                alt="Ableton Live"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div
                    ref={el => sections.current[3] = el}
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
    );
}