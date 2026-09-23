'use client'

import AMButton from "@/app/_components/button";
import {IoArrowDownSharp} from "react-icons/io5";
import Image from "next/image";
import {Link} from "@heroui/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useRef} from "react";
import {useGSAP} from "@gsap/react";

export default function Projects() {
    gsap.registerPlugin(ScrollTrigger);

    const container = useRef();
    const sections = useRef([]);
    const images = useRef([]);

    const {contextSafe} = useGSAP(() => {

        // Animate sections on scroll
        sections.current.forEach((section, index) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    toggleActions: "play pause resume reset",
                },
                x: (index % 2 == 0) ? -100 : 100,
                opacity: 0,
                ease: "power1.out"
            });
        });

        images.current.forEach((section) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
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

    const onSeeClick = contextSafe(() => {
        gsap.to(window, { duration: 1.5, scrollTo: {y: '#sections', offsetY: 96} });
    });

    return <main className="min-h-screen w-full flex flex-col items-center" id="smooth-wrapper" ref={container}>
        <div className="w-full max-w-screen-xl px-4 sm:px-8 pt-24" id="smooth-content">
            <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                <div ref={el => sections.current[0] = el} className="w-full md:w-2/3 flex flex-col gap-4">
                    <h4 className="text-red-400">Physical LED Controls</h4>
                    <p>This project is a custom-built USB control interface featuring sliders and mechanical switches that manipulate colors and effects on addressable LED strips. Designed from the ground up—including soldered hardware, embedded software, and computer-side integration using OpenRGB—the device showcases a hands-on blend of electrical engineering and interaction design. With a focus on configurability and broad applicability, it’s both a functional tool and a proof of concept for intuitive lighting control systems.</p>
                    <span className="flex justify-center">
                        <AMButton color={'red'} shade={400} href={'/projects/led-board'}>Learn More</AMButton>
                    </span>
                </div>
                <div ref={el => images.current[0] = el} className="w-full md:w-1/3 aspect-square relative">
                    <Image
                        src="/images/thumbnail.jpg"
                        alt="Placeholder"
                        fill
                        className="object-cover object-center"
                    />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                <div ref={el => images.current[1] = el} className="w-full md:w-1/3 aspect-square relative">
                    <Image
                        src="/images/placeholder.jpg"
                        alt="Placeholder"
                        fill
                        className="object-cover object-bottom"
                    />
                </div>
                <div ref={el => sections.current[1] = el} className="w-full md:w-2/3 flex flex-col gap-4">
                    <h4 className="text-orange-400">GameBoy Advance Snake Game</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
                    <span className="flex justify-center">
                        <AMButton color={'orange'} shade={400} href={'/'}>Learn More</AMButton>
                    </span>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                <div ref={el => sections.current[2] = el} className="w-full md:w-2/3 flex flex-col gap-4">
                    <h4 className="text-yellow-400">UBound</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
                    <span className="flex justify-center">
                        <AMButton color={'yellow'} shade={400} href={'/'}>Learn More</AMButton>
                    </span>
                </div>
                <div ref={el => images.current[2] = el} className="w-full md:w-1/3 aspect-square relative">
                    <Image
                        src="/images/placeholder.jpg"
                        alt="Placeholder"
                        fill
                        className="object-cover object-bottom"
                    />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                <div ref={el => images.current[3] = el} className="w-full md:w-1/3 aspect-square relative">
                    <Image
                        src="/images/placeholder.jpg"
                        alt="Placeholder"
                        fill
                        className="object-cover object-bottom"
                    />
                </div>
                <div ref={el => sections.current[3] = el} className="w-full md:w-2/3 flex flex-col gap-4">
                    <h4 className="text-green-400">Lighting Design/Engineering</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
                    <span className="flex justify-center">
                        <AMButton color={'green'} shade={400} href={'/'}>Learn More</AMButton>
                    </span>
                </div>
            </div>
        </div>
    </main>;
}