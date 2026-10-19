// Reference for writing a project write-up. Not shown on the site.
// Copy whatever you need into one of the project files in this folder.
//
// Plain JSX works anywhere: <p>, <ul>/<ol>, <a>, <strong>, <h3>, <h4>.
// Lists, links and sub-headings are styled automatically.

import {Section, Columns, Stack, Figure, Gallery, Video, Embed, Callout} from "@/app/projects/_components/blocks";

export default function Content() {
    return <>
        <Section title="Background">
            <p>Plain paragraphs stack with even spacing. Write as many as you like.</p>
            <p>Links like <a href="https://example.com">this one</a> pick up the project color.</p>
        </Section>

        <Section title="Process">
            <Columns>
                <Stack>
                    <h3>Text next to an image</h3>
                    <p>Columns sit side by side on wide screens and stack on phones.</p>
                    <ul>
                        <li>Bulleted lists work</li>
                        <li>So do numbered ones with &lt;ol&gt;</li>
                    </ul>
                </Stack>
                <Figure src="/images/placeholder.jpg" alt="Describe the image" caption="Optional caption" width={800} height={800} />
            </Columns>

            <Figure src="/images/placeholder.jpg" alt="A centered, narrower image" size="md" width={800} height={800} />

            <Gallery cols={3} images={[
                { src: "/images/placeholder.jpg", alt: "Photo 1" },
                { src: "/images/placeholder.jpg", alt: "Photo 2" },
                { src: "/images/placeholder.jpg", alt: "Photo 3" },
            ]} />
        </Section>

        <Section title="Demo">
            <Video src="/files/demo.mp4" caption="A video file in /public/files" />
            <Embed src="https://www.youtube.com/embed/VIDEO_ID" title="Demo video" caption="Or an embedded player" />
            <Columns>
                <Embed src="https://www.youtube.com/embed/VIDEO_ID" title="Vertical clip" portrait />
                <p>Use <code>portrait</code> for vertical videos.</p>
            </Columns>
        </Section>

        <Callout title="What I learned">
            <p>A highlighted box for takeaways or reflections.</p>
        </Callout>
    </>;
}
