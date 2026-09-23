import {useRef} from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import AMButton from "@/app/_components/button";

export default function Resume({ container }) {
    const title = useRef();

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const { contextSafe } = useGSAP(() => {
        const text = new SplitText(title.current, {type: 'chars'})

        const music = gsap.timeline({
            scrollTrigger: {
                trigger: title.current,
                start: 'top bottom',
                end: 'top 5rem',
                toggleActions: 'restart pause resume reset',
            }
        });

        music.from(text.chars, {
            x: "500",
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        })
    }, {scope: container});

    return <section id={'resume'} className={'w-full py-36 flex flex-col justify-center items-center px-4 sm:px-8 pt-20 text-yellow-600 gap-4'}>
        <h1 className={'text-center text-[10vw]'} ref={title}>RESUME</h1>
        <div className={'w-full text-center flex flex-col gap-4'}>
            <h5>Get details about by education, experience, skills, and more.</h5>
            <div className={'flex w-full justify-center gap-2'}>
                <AMButton color="yellow" shade={600} href="/resume">Learn More</AMButton>
            </div>
        </div>
    </section>
}