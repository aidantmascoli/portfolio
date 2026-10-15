'use client'

import {useEffect, useRef, useState} from "react";

import gsap from "gsap";
import {useGSAP} from "@gsap/react";

import {ScrollTrigger} from "gsap/ScrollTrigger";
import {DrawSVGPlugin} from "gsap/DrawSVGPlugin";
import Image from "next/image";
import AMButton from "@/app/_components/button";
import InstagramEmbed from "@/app/_components/instagram";

export default function About({ container }) {
    const paths = useRef([]);
    const title = useRef();

    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

    useGSAP(() => {
        paths.current.forEach(path => {
            gsap.fromTo(path, {drawSVG: '0% 0%'}, {
                drawSVG: '0% 100%',
                scrollTrigger: {
                    trigger: title.current,
                    start: 'center bottom',
                    end: 'center 50%',
                    scrub: 1,
                }
            })
        });
    }, { scope: container });

    const [width, setWidth] = useState(1920);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Crop the cursive's lead-in/out swashes on wide screens, but always keep the
    // letters themselves (~x 470-1700) in frame so it never overflows on phones.
    const t = Math.min(Math.max((width - 390) / (1920 - 390), 0), 1);
    const viewBoxX = 330 + (150 - 330) * t;
    const viewBoxWidth = 1500 + (1837 - 1500) * t;

    return <section id={'about'} className={'w-full py-36 flex flex-col justify-center items-center text-orange-500'}>
        <div ref={title} className={'w-full overflow-hidden flex flex-row justify-center col-span-3 row-start-1'}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox={`${viewBoxX} 0 ${viewBoxWidth} 320`}>
                <path ref={el => paths.current[0] = el} className="draw"
                      d="M10,285.081c44.615,11.573,92.025,12.213,136.936,1.848,58.268-13.447,112.554-45.042,172.28-48.019,27.916-1.392,55.579,5.097,81.802,14.772,40.855,15.074,71.542-16.356,91.631-39.39,31.149-35.715,49.172-89.804,97.826-110.677,23.021-9.352,55.693,4.435,62.304,28.388,2.581-18.211-17.611-32.198-35.966-33.376-77.776-9.181-150.109,158.76-43.629,162.572,34.338-1.386,50.054-14.415,63.83-35.914,24.916-41.933,33.467-73.825,36.75-125.588-17.29,36.597-26.91,76.795-28.062,117.254-.37,12.985,1.054,27.887,11.511,35.594,11.259,8.298,28.187,3.559,37.781-6.619,9.594-10.178,13.671-24.219,17.435-37.69,10.451-37.401,20.902-74.802,31.353-112.203-13.528,36.217-20.942,74.708-21.835,113.359-.321,13.881.413,28.542,7.824,40.284s23.6,18.998,35.716,12.216c8.808-4.931,12.904-15.486,14.17-25.501,3.031-23.983-11.888-52.565-36.05-53.312-4.528-.14-9.424.899-12.439,4.28s-3.023,9.531.853,11.875c1.069.647,2.303.954,3.517,1.249,20.124,4.903,41.132,9.056,61.416,4.864,17.21-3.557,32.861-12.942,50.184-15.895s38.766,3.708,43.285,20.69c5.432-17.333-16.286-33.635-33.941-29.363-17.655,4.272-29.33,21.12-36.211,37.931-4.563,11.149-7.452,24.905-.125,34.467,4.98,6.499,13.58,9.256,21.762,9.565,31.628,1.195,58.318-35.14,48.42-63.554,28.076,12.993,65.275.437,79.733-26.913-6.734,14.212-13.469,28.423-20.203,42.635-3.085,6.511-6.037,14.696-1.652,20.413,2.568,3.348,6.992,4.701,11.193,5.084,16.739,1.525,32.595-9.595,41.6-23.787,9.005-14.193,12.508-31.082,15.847-47.556,1.376,13.479-6.741,25.842-10.968,38.715s-2.065,30.785,10.903,34.712c5.901,1.787,12.326-.059,17.792-2.912,17.68-9.226,28.207-27.821,36.634-45.896,24.135-51.766,39.207-107.743,44.326-164.629-7.496,40.1-14.991,80.2-22.487,120.3-3.95,21.133-7.415,44.818,4.7,62.579,7.573,11.101,20.302,17.913,33.444,20.72,28.226,6.028,58.156-5.237,79.94-24.171,21.784-18.934,36.464-44.729,48.1-71.142,17.795-40.391,29.443-83.484,34.42-127.34-14.507,72.492-22.273,146.331-23.165,220.254,4.7-34.46-1.794-69.645,2.156-104.199,3.95-34.554,22.995-71.646,56.851-79.605,8.375-1.969,17.652-1.868,25.05,2.523,10.488,6.226,14.623,19.149,17.274,31.054,6.035,27.099,8.748,54.935,8.06,82.689-1.715-28.592-3.101-58.822,10.183-84.198s46.922-42.408,71.519-27.732c24.118,14.391,26.089,47.948,25.235,76.02-.668,21.943-1.335,43.886-2.003,65.829-.125,4.105-.227,8.346,1.292,12.162,4.32,10.851,18.719,12.883,30.36,11.937,40.243-3.271,77.553-21.452,113.761-39.318,12.546-6.19,27.362-17.287,23.036-30.591-2.412-7.419-10.349-11.751-18.056-12.961-25.975-4.076-50.75,25.454-42.223,50.326,6.954,20.281,30.168,31.282,51.603,30.831,21.435-.45,41.545-9.845,60.839-19.194,44.539-21.582,90.773-44.419,140.265-44.383,78.674.057,155.759,57.939,230.499,33.374"/>
                <path ref={el => paths.current[1] = el} className="draw"
                      d="M1046.316,120.67c36.379-1.165,72.681-4.735,108.59-10.681"/>
            </svg>
        </div>
        <div className={'px-4 sm:px-8 gap-4'}>
            <div className={'w-full text-center flex flex-col gap-4'}>
                <h5>Get to know more about me, and some of my interests.</h5>
                <div className={'flex w-full justify-center gap-2'}>
                    <AMButton color="orange" shade={500} href="/about">Learn More</AMButton>
                </div>
            </div>
        </div>
    </section>
}