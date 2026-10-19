'use client'

import gsap from "gsap";
import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import Image from "next/image";
import AMButton from "@/app/_components/button";
import {getProject} from "@/app/projects/data";
import {IoArrowBackSharp, IoArrowForwardSharp, IoLinkSharp} from "react-icons/io5";
import {FaGithub, FaFilm, FaGlobe, FaFileAlt} from "react-icons/fa";
import {ProjectColorContext} from "@/app/projects/_components/blocks";
import {projectContent} from "@/app/projects/content";

// Styles plain JSX inside a write-up (lists, links, sub-headings) so the content files can stay simple.
const ARTICLE = [
    "flex flex-col gap-12 empty:hidden",
    "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1",
    "[&_a]:text-(--accent) [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:opacity-75",
    "[&_h3]:text-xl md:[&_h3]:text-2xl [&_h4]:text-lg md:[&_h4]:text-xl [&_h4]:font-semibold",
    "[&_code]:font-mono [&_code]:text-sm",
].join(" ");

const SECTION_TITLE = "text-2xl md:text-3xl mb-3";
const SIDEBAR_TITLE = "text-lg md:text-xl mb-3";

// Icon shown next to each link, picked by the link's `type` in data.js.
const LINK_ICONS = {
    github: FaGithub,
    website: FaGlobe,
    video: FaFilm,
    document: FaFileAlt,
};

export default function ProjectDetail({ slug, nextSlug }) {
    const project = getProject(slug);
    const next = getProject(nextSlug);
    const c = project.color;
    const Content = projectContent[slug];

    const container = useRef();
    const sections = useRef([]);

    useGSAP(() => {
        sections.current.forEach((section, index) => {
            gsap.from(section, {
                y: 60,
                opacity: 0,
                delay: 0.15 * index,
                ease: "power2.out"
            });
        });
    }, { scope: container });

    return <main className="min-h-screen w-full flex flex-col items-center" id="smooth-wrapper" ref={container}>
        <div className="w-full max-w-5xl px-4 sm:px-8 pt-28 pb-16 flex flex-col gap-10" id="smooth-content">
            <header ref={el => sections.current[0] = el} className="flex flex-col gap-2">
                <AMButton color={c} shade={500} href="/projects" size="sm" startContent={<IoArrowBackSharp/>} className="mb-4">All Projects</AMButton>
                <h1 className={`text-4xl md:text-6xl text-${c}-500`}>{project.title}</h1>
                <p className={`italic font-semibold text-${c}-600`}>{project.role} &middot; {project.date}</p>
                <p className="text-default-500">{project.subtitle}</p>
            </header>

            <section ref={el => sections.current[1] = el} className={`p-6 md:p-8 bg-${c}-50 flex flex-col md:flex-row gap-8`}>
                <div className="md:flex-1 flex flex-col gap-6">
                    <div>
                        <h2 className={`${SECTION_TITLE} text-${c}-500`}>Overview</h2>
                        <p>{project.summary}</p>
                    </div>
                    <div>
                        <h2 className={`${SECTION_TITLE} text-${c}-500`}>Highlights</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            {project.highlights.map((h, i) => <li key={i}>{h}</li>)}
                        </ul>
                    </div>
                </div>
                <aside className={`md:w-64 lg:w-72 shrink-0 flex flex-col gap-6 border-t md:border-t-0 md:border-l border-${c}-200 pt-6 md:pt-0 md:pl-8`}>
                    <div>
                        <h2 className={`${SIDEBAR_TITLE} text-${c}-500`}>Tools &amp; Technologies</h2>
                        <ul className="flex flex-wrap gap-2">
                            {project.tools.map(tool => (
                                <li key={tool} className={`text-sm px-2 py-1 bg-white text-${c}-700`}>{tool}</li>
                            ))}
                        </ul>
                    </div>
                    {project.links?.length > 0 && (
                        <div>
                            <h2 className={`${SIDEBAR_TITLE} text-${c}-500`}>Links</h2>
                            <ul className="flex flex-col">
                                {project.links.map(link => {
                                    const Icon = LINK_ICONS[link.type] ?? IoLinkSharp;
                                    return (
                                        <li key={link.href}>
                                            <a href={link.href} target="_blank" rel="noopener noreferrer"
                                               className={`inline-flex items-center gap-2 text-${c}-600 hover:text-${c}-800 underline underline-offset-2 transition-colors break-all`}>
                                                <Icon className="shrink-0" aria-hidden />
                                                {link.label}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </aside>
            </section>

            {project.image && (
                <div ref={el => sections.current[2] = el} className="w-full aspect-video relative">
                    <Image
                        src={project.image.src}
                        alt={project.image.alt}
                        fill
                        sizes="(min-width: 1024px) 1024px, 100vw"
                        className="object-contain object-center"
                    />
                </div>
            )}

            {Content && (
                <ProjectColorContext.Provider value={c}>
                    <article className={ARTICLE} style={{ "--accent": `var(--color-${c}-600)` }}>
                        <Content />
                    </article>
                </ProjectColorContext.Provider>
            )}

            <nav ref={el => sections.current[3] = el} className="flex justify-end">
                <AMButton color={next.color} shade={500} href={`/projects/${next.slug}`} endContent={<IoArrowForwardSharp/>}>
                    Next Project
                </AMButton>
            </nav>
        </div>
    </main>;
}
