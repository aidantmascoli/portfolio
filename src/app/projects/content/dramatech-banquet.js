// Freeform write-up for DramaTech Banquet Website, shown below the summary card on /projects/dramatech-banquet.
// See ./_example.js for every building block (images, videos, columns, galleries...).

import {Section, Columns, Figure} from "@/app/projects/_components/blocks";

export default function Content() {
    return <>
        <Section title="The Invitation">
            <p>
                This year&rsquo;s banquet theme was &ldquo;The White Rabbit&rsquo;s Speakeasy,&rdquo; and the website
                works like a way in. Guests follow a short story through a series of choices, guided by photo
                collages and torn-paper text, matching the visual style and color palette of the event. At the end,
                the White Rabbit asks for a password, which was given in the invitation emails, so only invited guests
                can get through the digital &ldquo;door&rdquo;.
            </p>
            <Columns>
                <Figure src="/images/banquet/choice.png" width={2352} height={1478}
                        alt="A story page showing a neon-lit alleyway photo beside two choices: Keep Going or Follow the Sign"
                        caption="Each step of the story offers a choice" />
                <Figure src="/images/banquet/password.png" width={2352} height={1478}
                        alt="The White Rabbit in a doorway asking for a password, with a text box to type the answer"
                        caption="The password prompt at the end of the story" />
            </Columns>
        </Section>

        <Section title="How I Built It">
            <p>
                I designed and developed the whole site on my own in about a week. It&rsquo;s a React app built with
                Vite and styled with Tailwind CSS, and all of the animations use GSAP.
            </p>
        </Section>
    </>;
}
