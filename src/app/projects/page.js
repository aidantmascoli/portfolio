'use client'

import AMButton from "@/app/_components/button";
import Image from "next/image";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import {projects} from "@/app/projects/data";

export default function Projects() {
    gsap.registerPlugin(ScrollTrigger);

    const container = useRef();
    const sections = useRef([]);
    const images = useRef([]);

    useGSAP(() => {
        // Animate sections on scroll
        sections.current.forEach((section, index) => {
            gsap.from(section, {
                scrollTrigger: {
                    // Trigger off the (untransformed) row so start/reset points don't shift with the animation
                    trigger: section.parentElement,
                    start: "top bottom",
                    toggleActions: "play pause resume reset",
                },
                x: (index % 2 === 0) ? -100 : 100,
                opacity: 0,
                ease: "power1.out"
            });
        });

        images.current.forEach((image) => {
            gsap.from(image, {
                scrollTrigger: {
                    trigger: image.parentElement,
                    start: "top bottom",
                    toggleActions: "play pause resume reset",
                },
                y: 100,
                scale: 0.9,
                opacity: 0,
                ease: "power1.out"
            });
        });
    }, { scope: container });

    return <main className="min-h-screen w-full flex flex-col items-center overflow-x-clip" id="smooth-wrapper" ref={container}>
        <div className="w-full max-w-(--breakpoint-xl) px-4 sm:px-8 pt-24" id="smooth-content">
            {projects.map((project, index) => {
                const imageFirst = index % 2 === 1;
                return (
                    <div key={project.slug} className={`flex flex-col gap-8 items-center mb-16 ${imageFirst ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                        <div ref={el => sections.current[index] = el} className="w-full md:w-2/3 flex flex-col gap-3">
                            <div>
                                <h2 className={`text-2xl md:text-3xl text-${project.color}-500`}>{project.title}</h2>
                                <p className={`italic font-semibold text-${project.color}-600`}>{project.role} &middot; {project.date}</p>
                                <p className="text-sm text-default-500">{project.subtitle}</p>
                            </div>
                            <p>{project.summary}</p>
                            <ul className="flex flex-wrap gap-2">
                                {project.tools.map(tool => (
                                    <li key={tool} className={`text-xs px-2 py-1 bg-${project.color}-50 text-${project.color}-700`}>{tool}</li>
                                ))}
                            </ul>
                            <span className="flex justify-center md:justify-start mt-1">
                                <AMButton color={project.color} shade={500} href={`/projects/${project.slug}`}>Learn More</AMButton>
                            </span>
                        </div>
                        {/* Outer div stays put and acts as the scroll trigger; the inner one animates */}
                        <div className="w-full md:w-1/3">
                            <div ref={el => images.current[index] = el} className="w-full aspect-square relative">
                                <Image
                                    src={project.image?.src ?? "/images/placeholder.jpg"}
                                    alt={project.image?.alt ?? `${project.title} placeholder image`}
                                    fill
                                    sizes="(min-width: 768px) 33vw, 100vw"
                                    className="object-cover object-center"
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </main>;
}
