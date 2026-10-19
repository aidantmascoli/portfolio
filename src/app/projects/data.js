// Single source of truth for the projects page and each /projects/[slug] page.
// `color` must be one of the colors safelisted in globals.css.
// `image` is optional; without one, the projects page shows /images/placeholder.jpg
// and the project page skips the image.
// `links` is optional: [{ type, label, href }], where `type` picks the icon:
// "github", "website", "video", "document" (anything else gets a generic link icon).

export const projects = [
    {
        slug: "retcom87",
        title: "RetCom87",
        subtitle: "Georgia Tech Vertically Integrated Projects – Retrofuturistic Hardware Team",
        role: "RetCom87 Sub-Team Member",
        date: "August 2025–May 2026",
        color: "red",
        image: { src: "/images/retcom87/retCom87.jpg", alt: "The RetCom87 board stack: a yellow TMS9118 video board mounted on top of the W65C265SXB and expansion boards" },
        summary: "A custom, 80s-inspired computer built around the W65C265SXB, with sound, video, and keyboard and controller input. I wrote 65816 assembly for the machine, including a command line debugger and reusable code for driving the TMS9118 video chip.",
        highlights: [
            "Learned 6502/65816 assembly code to write programs for the custom computer.",
            "Implemented a command line debugger for 65816 assembly, which led to quicker and easier learning and debugging for 4 sub-team members.",
            "Developed reusable assembly code for interfacing with the TMS9118 video chip by analyzing video board hardware, enabling text and sprite mode display output from the computer.",
        ],
        tools: ["65816 Assembly", "6502 Assembly", "W65C265SXB", "TMS9118 Video Chip"],
        links: [
            { type: "video", label: "65816 Debugger Demo", href: "https://youtu.be/2fuJJ3oru5s?si=c04rMH6p5j86r9ME" },
            { type: "github", label: "65816 Debugger Source Code", href: "https://github.com/denayeisnotokay/db65816" }
        ]
    },
    {
        slug: "dramatech-banquet",
        title: "DramaTech Banquet Website",
        subtitle: "DramaTech Theatre – Banquet Committee",
        role: "Website Lead",
        date: "April 2026",
        color: "orange",
        image: { src: "/images/banquet/banquet.png", alt: "Title screen of the banquet website: The White Rabbit’s Speakeasy over a dark spiral background, with RSVP and Info buttons" },
        summary: "A themed, interactive choose-your-own-adventure story built as the invitation website for DramaTech Theatre’s yearly award show, sent to over 100 recipients alongside their invitations.",
        highlights: [
            "Individually designed and implemented a themed, interactive, choose your own adventure story as a React app, using the Vite framework, tailwindcss, and GSAP for animations.",
            "Hosted the website on a subdomain of the theatre’s website at banquet.dramatech.org using GitHub Pages.",
            "Worked with the invitations team to distribute the website alongside invitations to the theatre’s yearly award show to over 100 recipients using Mailchimp.",
        ],
        tools: ["React", "Vite", "Tailwind CSS", "GSAP", "GitHub Pages", "Mailchimp"],
        links: [
            { type: "website", label: "banquet.dramatech.org", href: "https://banquet.dramatech.org" },
            { type: "github", label: "Source Code", href: "https://github.com/DramaTechTSC/banquet-website-2026" },
        ],
    },
    {
        slug: "spotify-wrapper",
        title: "Spotify Wrapper",
        subtitle: "Objects and Design",
        role: "Full Stack Developer",
        date: "Fall 2025",
        color: "yellow",
        image: { src: "/images/spotifyWrapper.png", alt: "Spotify Wrapper web app" },
        summary: "A team web app that creates custom Spotify Wrapped-style reviews using the Spotify API, built with Django by a team of five over three scrum sprints.",
        highlights: [
            "Collaborated with a team of 4 other Computer Science and Computational Media students to develop a web app using the Django framework, writing backend code in Python and frontend code with HTML, JavaScript, and tailwindcss.",
            "Completed the project using the scrum development process in 3 two-week sprints, creating in-depth plans and retrospectives for each sprint.",
            "Communicated with TAs (posing as clients) for design requirements and project updates, managed and assigned project tasks using Notion.",
            "Designed a storage scheme for user data allowing for efficient management of user profiles, songs, artists, and stats.",
            "Maintained the codebase using GitHub for version control.",
        ],
        tools: ["Python", "Django", "JavaScript", "HTML", "Tailwind CSS", "Spotify API", "Notion", "GitHub"],
    },
    {
        slug: "gba-snake",
        title: "Game Boy Advance Snake Game",
        subtitle: "Computer Organization and Programming",
        role: "Individual Project",
        date: "March 2025",
        color: "green",
        summary: "A fully functional snake game written in C for the Game Boy Advance, running on an emulator and talking directly to the hardware through memory-mapped registers.",
        highlights: [
            "Individually designed and implemented software for a fully functional snake game to run on a Game Boy Advance emulator.",
            "Wrote and tested over 500 lines of C code, including game state management, display interface, and other memory register mapped functionality.",
            "Debugged and solved many issues within the code, including tracing memory-related issues using gdb.",
        ],
        tools: ["C", "gdb", "Game Boy Advance Emulator"],
    },
    {
        slug: "onset-detection",
        title: "Music Information Retrieval – Onset Detection",
        subtitle: "Intro to Audio Tech II",
        role: "Pair Project",
        date: "March 2026",
        color: "blue",
        summary: "A Python model that detects onsets (beats) in musical audio, built with one other student and evaluated with precision, recall, and F1 score.",
        highlights: [
            "Worked with one other student to develop a model to detect onsets (beats) in musical audio data.",
            "Developed model in Python, with documentation using Jupyter Notebooks.",
            "Performed signal processing operations using numpy, scipy, and librosa.",
            "Evaluated model performance using statistical metrics, including Precision, Recall, and F1 Score.",
        ],
        tools: ["Python", "Jupyter Notebooks", "NumPy", "SciPy", "librosa"],
    },
    {
        slug: "traverse-cs",
        title: "traverse[cs]",
        subtitle: "A computer science competition founded to encourage students to learn all aspects of CS",
        role: "Co-Founder, Technical Lead",
        date: "January–July 2022",
        color: "violet",
        summary: "A computer science competition I co-founded that attracted over 100 students worldwide, with sponsorships from Art of Problem Solving, Wolfram Alpha, and repl.it.",
        highlights: [
            "Organized, planned, and executed a computer science competition that attracted over 100 students worldwide.",
            "Received sponsorships from 3 large organizations: Art of Problem Solving, Wolfram Alpha, and repl.it.",
            "Partnered with 3 other computer science organizations, including the Competitive Programming Initiative.",
            "Designed and implemented the organization’s website, as well as a custom registration portal.",
        ],
        tools: ["Web Development", "Event Planning", "Sponsorship Outreach"],
    },
];

export function getProject(slug) {
    return projects.find(p => p.slug === slug);
}
