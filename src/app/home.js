'use client'

import Hero from "@/app/hero";
import About from "@/app/about";
import { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Resume from "@/app/resume";
import Music from "@/app/projects";

export default function Home() {
    gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

    const container = useRef();

    useGSAP(() => {
        ScrollSmoother.create({
            smooth: 1,
            effects: true,
            smoothTouch: 0.1
        });
    }, {scope: container});

    return <main className={'min-h-screen w-full flex flex-col items-center'} id={'smooth-wrapper'} ref={container}>
        <div className={'w-full'} id={'smooth-content'}>
            <Hero container={container} />
            <About container={container} />
            <Resume container={container} />
            <Music container={container} />
        </div>
    </main>;
}
