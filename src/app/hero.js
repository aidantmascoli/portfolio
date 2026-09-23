'use client'

import AMButton from "@/app/_components/button";
import { IoArrowDownSharp } from "react-icons/io5";
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {useRef} from "react";

export default function Hero({ container }) {
    gsap.registerPlugin(useGSAP, ScrollToPlugin);

    const hero = useRef();
    const heroImg = useRef();
    const title = useRef();
    const subtitle = useRef();
    const paragraph = useRef();
    const button = useRef();

    const { contextSafe } = useGSAP(() => {
        const load = gsap.timeline();

        load.to(heroImg.current, {opacity: 1, ease: 'power2.out'});
        load.from(title.current, {opacity: 0, ease: 'power2.out'}, 0.25);
        load.from(subtitle.current, {opacity: 0, ease: 'power2.out'}, 0.5);
        load.from(paragraph.current, {opacity: 0, ease: 'power2.out'}, 0.75);
        load.from(button.current, {opacity: 0, ease: 'power2.out'}, 1);

        const scroll = gsap.timeline({
            scrollTrigger: {
                trigger: hero.current,
                start: 'top top',
                end: 'bottom top',
                pin: true,
                scrub: 1
            }
        });

        scroll.to(heroImg.current, {xPercent: 110, ease: 'power2.in'});
        scroll.to(title.current, {xPercent: -110, ease: 'power2.in'}, 0.15);
        scroll.to(subtitle.current, {xPercent: -110, ease: 'power2.in'}, 0.3);
        scroll.to(paragraph.current, {xPercent: -110, ease: 'power2.in'}, 0.45);
        scroll.to(button.current, {xPercent: -110, ease: 'power2.in'}, 0.6);
    }, {scope: container});

    const onSeeClick = contextSafe(() => {
        gsap.to(window, { duration: 3.5, scrollTo: '#about' });
    });

    return <section ref={hero}  className={
        'h-screen w-full grid grid-rows-hero md:grid-rows-1 grid-cols-1 md:grid-cols-2 '
        + 'gap-0 justify-stretch align-stretch pt-16'
    }>
        <div className={'p-16 row-start-2 md:row-start-1 flex flex-col gap-2 justify-center text-red-400'}>
            <h1 ref={title}>Hello!</h1>
            <h3 ref={subtitle}>My name is Aidan.</h3>
            <p ref={paragraph} className={'text-large my-4'}>
                Welcome to my portfolio website. Here you can learn about me, peruse my resume, and take a look at some
                different projects I have done.
            </p>
            <span ref={button} className={'w-full flex flex-row justify-center'}>
                    <AMButton color={'red'} shade={400} onClick={onSeeClick} endContent={<IoArrowDownSharp className={'animate-bounce'}/>}>
                        Let&apos;s See
                    </AMButton>
                </span>
        </div>
        <div ref={heroImg} className={'relative opacity-0'}>
            <Image src={'/images/headshot.jpg'} alt={'Headshot'} fill objectFit={'cover'} objectPosition={'center bottom'}/>
        </div>
    </section>
}