'use client'

// Building blocks for the freeform write-ups in src/app/projects/content/*.js.
// They pick up the current project's color automatically.

import {createContext, useContext} from "react";
import Image from "next/image";

export const ProjectColorContext = createContext("red");

const useColor = () => useContext(ProjectColorContext);

/** A titled block of content. Children stack with consistent spacing. */
export function Section({ title, children }) {
    const c = useColor();
    return (
        <section className="flex flex-col gap-4">
            {title && <h2 className={`text-2xl md:text-3xl text-${c}-500`}>{title}</h2>}
            {children}
        </section>
    );
}

/** Side-by-side layout that stacks on small screens. `cols` is 2 or 3. */
export function Columns({ cols = 2, align = "center", children }) {
    const colClass = cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
    const alignClass = align === "start" ? "items-start" : "items-center";
    return <div className={`grid grid-cols-1 ${colClass} gap-6 ${alignClass}`}>{children}</div>;
}

/** Wraps children in a stacked column; handy inside <Columns>. */
export function Stack({ children }) {
    return <div className="flex flex-col gap-4">{children}</div>;
}

/**
 * An image with an optional caption. Put the file in /public/images and pass "/images/name.jpg".
 * width/height are the image's real pixel size (used for its aspect ratio); `size` limits how wide it displays.
 */
export function Figure({ src, alt, caption, width = 1600, height = 900, size = "full" }) {
    const sizeClass = { sm: "max-w-sm", md: "max-w-xl", lg: "max-w-3xl", full: "max-w-full" }[size];
    return (
        <figure className={`w-full ${sizeClass} mx-auto flex flex-col gap-2`}>
            <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto" sizes="(min-width: 1024px) 1024px, 100vw" />
            {caption && <figcaption className="text-sm text-default-500 text-center">{caption}</figcaption>}
        </figure>
    );
}

/** A grid of square-cropped images. `images` is [{ src, alt }]. */
export function Gallery({ images, cols = 3 }) {
    const colClass = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4" }[cols];
    return (
        <div className={`grid grid-cols-2 ${colClass} gap-4`}>
            {images.map(img => (
                <div key={img.src} className="relative aspect-square">
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(min-width: 768px) 33vw, 50vw" />
                </div>
            ))}
        </div>
    );
}

/** A video file you host yourself (put it in /public/files). */
export function Video({ src, poster, caption, portrait = false }) {
    return (
        <figure className={`w-full ${portrait ? "max-w-sm" : ""} mx-auto flex flex-col gap-2`}>
            <video src={src} poster={poster} controls playsInline preload="metadata" className="w-full h-auto" />
            {caption && <figcaption className="text-sm text-default-500 text-center">{caption}</figcaption>}
        </figure>
    );
}

/** An embedded player from YouTube, Vimeo, Jumpshare, etc. Use the site's *embed* URL. */
export function Embed({ src, title, caption, portrait = false }) {
    return (
        <figure className={`w-full ${portrait ? "max-w-sm" : ""} mx-auto flex flex-col gap-2`}>
            <iframe
                src={src}
                title={title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className={`w-full ${portrait ? "aspect-[9/16]" : "aspect-video"}`}
            />
            {caption && <figcaption className="text-sm text-default-500 text-center">{caption}</figcaption>}
        </figure>
    );
}

/** A scrollable code listing. Pass the code as a template string: <Code caption="file.asm">{`...`}</Code> */
export function Code({ children, caption }) {
    return (
        <figure className="w-full flex flex-col gap-2">
            <pre className="w-full overflow-x-auto p-4 bg-default-100 text-default-800 leading-relaxed"><code>{children}</code></pre>
            {caption && <figcaption className="text-sm text-default-500 text-center">{caption}</figcaption>}
        </figure>
    );
}

/** A highlighted aside in the project's color. */
export function Callout({ title, children }) {
    const c = useColor();
    return (
        <aside className={`p-6 bg-${c}-50 flex flex-col gap-2`}>
            {title && <p className={`font-bold text-${c}-600`}>{title}</p>}
            {children}
        </aside>
    );
}
