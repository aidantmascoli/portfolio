// Freeform write-up for Spotify Wrapper, shown below the summary card on /projects/spotify-wrapper.
// See ./_example.js for every building block (images, videos, columns, galleries...).
// Sources: the CS 2340 Project 2 spec, our team's Notion requirement/task tracker, sprint
// plans and retrospectives, and the team website (sites.google.com/view/2340-group-13).

import {Section, Columns, Stack, Figure, Callout} from "@/app/projects/_components/blocks";

export default function Content() {
    return <>
        <Section title="The Project">
            <p>
                Spotify Wrapper was the second team project in Georgia Tech&rsquo;s CS 2340, Objects and Design.
                The brief was to build a Spotify Wrapped-style website with Django and the Spotify Web API. One
                rule shaped a lot of the work: wrapper libraries like Spotipy weren&rsquo;t allowed, so every
                request to Spotify, including the OAuth login flow, had to be written by hand.
            </p>
            <p>
                Every team had to complete four base user stories: a slideshow summary of the user&rsquo;s listening
                taste, accounts that save past wraps, an aesthetic and responsive UI, and no secrets committed to
                GitHub. On top of those, we picked at least 21 story points from a menu of optional features.
                A mentor TA acted as our client and graded the result.
            </p>
            <Figure src="/images/spotifyWrapper.png" width={1920} height={1039}
                    alt="The Spotify Wrapper web app" />
        </Section>

        <Section title="What It Does">
            <ul>
                <li><strong>Spotify login:</strong> users create an account and link it to Spotify with a &ldquo;Log in with Spotify&rdquo; button.</li>
                <li><strong>Stats page:</strong> shows the user&rsquo;s top 50 tracks and artists and top 10 albums and genres, with a play button for song previews.</li>
                <li><strong>Adjustable time range:</strong> stats and wraps can cover the last month, six months, or year, matching Spotify&rsquo;s short, medium, and long term data.</li>
                <li><strong>The Wrap:</strong> an animated slideshow of top genres, albums, and tracks, ending with a &ldquo;unique or basic&rdquo; reveal of the user&rsquo;s taste. It has a higher-or-lower game built from the user&rsquo;s top items, and the user&rsquo;s own songs play in the background.</li>
                <li><strong>Saved wraps:</strong> every wrap is stored and can be reopened or deleted later.</li>
                <li><strong>Sharing:</strong> one-click sharing to X, Reddit, or a copied link.</li>
                <li><strong>Extras:</strong> dark mode, a mobile-friendly layout, a page for contacting the developers, and account settings with account deletion.</li>
            </ul>
            <p>
                The app is running again at{" "}
                <a href="https://denayeisnotokay.pythonanywhere.com/" target="_blank" rel="noopener noreferrer">denayeisnotokay.pythonanywhere.com</a>.
            </p>
            <Callout title="A note on the live site">
                <p>
                    Spotify has changed its Web API a lot since we built the project, and several features no longer
                    work as they did:
                </p>
                <ul>
                    <li><strong>Song previews:</strong> Spotify removed 30-second track previews, so the play buttons and background music don&rsquo;t work.</li>
                    <li><strong>Ideal track:</strong> the audio features data behind the &ldquo;ideal track&rdquo; stat was removed.</li>
                    <li><strong>Popularity:</strong> Spotify no longer shares track popularity, so any track added since then shows a popularity of 0.</li>
                    <li><strong>Genres:</strong> apps in development mode no longer get genre information, so top genres can&rsquo;t be shown. Spotify&rsquo;s requirements for leaving development mode are now demanding, and our app doesn&rsquo;t qualify.</li>
                    <li><strong>Who can log in:</strong> in development mode, only five Spotify users approved by the developers can sign in. Most of the app can only be demoed by our team members.</li>
                </ul>
            </Callout>
        </Section>

        <Section title="My Role">
            <p>
                I was one of two full-stack developers on a team of five. The team site sums up my main
                contribution as building wrap generation on the back end and the animations that present it on
                the front end. I also owned or co-owned most of our optional user stories, and often helped
                teammates on the front end and back end when they got stuck.
            </p>

            <h3>Generating the Wrap</h3>
            <p>
                Spotify&rsquo;s top-items endpoint returns only tracks and artists. I wrote the requests that
                fetch the extra data behind the stats page and the wrap, like top albums and genres, then built the
                stats page itself. With Camtien Nguyen, our front-end developer, I designed the wrap slides in Figma
                and implemented the wrap display in code.
            </p>

            <h3>Linking Spotify accounts</h3>
            <p>
                I connected our Django user accounts to Spotify, so each user&rsquo;s data could be pulled from the
                API. Since every other feature depends on Spotify data, this was one of the first things we
                finished in Sprint 1.
            </p>

            <h3>Animation and audio</h3>
            <p>
                I owned the transition animations story, using GSAP for the transitions between wrap slides and
                our UI library for hover effects. For the song clips story, I added the preview button on the
                stats page and the background music that plays during a wrap.
            </p>

            <h3>Responsive UI and dark mode</h3>
            <p>
                I owned the phone-friendly UI story, worth 8 points and the largest one we completed. I built the
                responsive grid layout that the main pages use. I also owned dark mode, including picking the
                dark color palette and building the theme switcher. With Camtien, I mocked up the site&rsquo;s
                pages in Figma and implemented them.
            </p>

            <h3>Sharing and contact</h3>
            <p>
                I implemented the share links for each social platform and wrote the back end for the contact
                page, which sends visitors&rsquo; messages to the team.
            </p>
        </Section>

        <Section title="Process">
            <p>
                We ran the project as three two-week Scrum sprints, from October 14 to November 25, 2024.
                Elijah Rabinovich was our Scrum master and Matthew Nehme-Haily was product owner. Each sprint
                began with a written plan and ended with individual and team retrospectives, which shaped the
                plan for the next sprint.
            </p>

            <h3>How we organized</h3>
            <ul>
                <li><strong>Notion as the hub:</strong> every user story from the spec went into a prioritized backlog. Before starting work, we split each story into tasks with an owner and a due date, which gave the Scrum master a clear view of what should be finishing when.</li>
                <li><strong>Twice-weekly reports:</strong> each member posted progress in our Discord twice a week. We moved these from Monday and Wednesday to Tuesday and Saturday after Sprint 1, because those days fit better around when people actually got work done.</li>
                <li><strong>Pairs and subgroups:</strong> we split into small groups for individual features, so people could share skills and work in parallel. I paired with Camtien on most of the front end.</li>
                <li><strong>Client check-ins:</strong> we met with our TA client every class and set up extra meetings to show mini-demos and get design feedback.</li>
                <li><strong>Decisions:</strong> made as a group by two-thirds vote, with another teammate mediating any disagreement.</li>
            </ul>

            <h3>How the sprints went</h3>
            <Columns cols={3} align="start">
                <Stack>
                    <h4>Sprint 1 &middot; Oct 14&ndash;28</h4>
                    <p>
                        We set an ambitious goal: all four base stories plus enough optional stories to pass 21
                        points. We didn&rsquo;t finish everything, partly because of the time spent learning Django
                        and the Spotify API, but we built the foundation: accounts, Spotify linking, the visual theme,
                        and the page structure. Three stories were fully done, and two of them, dark mode and
                        transition animations, were mine.
                    </p>
                </Stack>
                <Stack>
                    <h4>Sprint 2 &middot; Oct 28&ndash;Nov 11</h4>
                    <p>
                        We carried over the unfinished stories and added hosting, holiday wraps, and Duo-Wrapped,
                        expecting to work faster now that the base was in place. Exams and extracurriculars hit the
                        whole team at once, and most of this sprint&rsquo;s work slipped. Our retrospective was
                        honest about it, and the main takeaway was simple: schedule time to work together.
                    </p>
                </Stack>
                <Stack>
                    <h4>Sprint 3 &middot; Nov 11&ndash;25</h4>
                    <p>
                        We focused on the core stories, the wrap itself and saved wraps, and planned group work
                        sessions instead of relying on everyone finding time alone. Wrap generation, song clips,
                        time ranges, sharing, the contact page, and hosting all landed in this sprint. We dropped
                        holiday wraps and Duo-Wrapped rather than ship them half-done.
                    </p>
                </Stack>
            </Columns>

            <h4>By the numbers</h4>
            <ul>
                <li>3 two-week sprints, 5 developers</li>
                <li>4 of 4 base user stories completed</li>
                <li>Over 21 optional story points completed, across phone-friendly UI, hosting, song clips, time ranges, dark mode, sharing, transitions, the contact page, and an in-wrap game</li>
                <li>I was assigned to 6 of those optional stories, plus 3 of the 4 base stories</li>
            </ul>
        </Section>

        <Section title="Supplemental Resources">
            <ul>
                <li><a href="https://denayeisnotokay.pythonanywhere.com/" target="_blank" rel="noopener noreferrer">Live site</a> &middot; hosted on PythonAnywhere</li>
                <li><a href="https://sites.google.com/view/2340-group-13/about-the-project" target="_blank" rel="noopener noreferrer">Team website</a> &middot; product description, process, and demo video</li>
                <li><a href="https://sites.google.com/view/2340-group-13/our-process" target="_blank" rel="noopener noreferrer">Our Process</a> &middot; what we built in each sprint</li>
            </ul>
        </Section>

        <Callout title="What I learned">
            <p>
                Working with the Spotify API without a wrapper library taught me how OAuth and REST APIs actually
                work, beyond calling a library function. Owning features that crossed the whole stack, from API
                requests to GSAP animations, showed me how much the parts depend on each other. Sprint 2
                taught me the most about teamwork: good tracking and communication don&rsquo;t help if nobody
                has time blocked out to do the work. Planning shared work sessions, and cutting scope early when
                the schedule slipped, is what got us to a finished product.
            </p>
        </Callout>
    </>;
}
