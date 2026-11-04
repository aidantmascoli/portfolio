// Freeform write-up for Physical LED Controls, shown below the summary card on /projects/led-board.
// See ./_example.js for every building block (images, videos, columns, galleries...).
// Adapted from the original ECE Discovery Project page (July 2025).

import {Section, Columns, Stack, Figure, Video, Callout} from "@/app/projects/_components/blocks";

export default function Content() {
    return <>
        <Section title="Goals">
            <p>
                The main objective for this project was to create a versatile and configurable control surface for
                LED lighting setups. Some specific goals I set for myself were:
            </p>
            <ul>
                <li>Designing a physical interface with multiple input types (sliders and switches)</li>
                <li>Enabling user reconfiguration of control behavior (e.g. a single slider could control brightness, hue, or effect speed)</li>
                <li>Implementing USB communication for broad OS compatibility</li>
                <li>Building a finished device housed in a custom casing</li>
                <li>Successfully integrating with OpenRGB, an open-source API for lighting control</li>
            </ul>
            <p>
                I chose this project in order to improve my ECE skills, specifically targeting USB data transfer
                and physical fabrication.
            </p>
        </Section>

        <Section title="Process">
            <h3>Choosing a board</h3>
            <p>
                I started the process with research on how to create custom USB devices. This specific topic had me
                going in circles for quite a while, but I ended up settling on the Arduino Micro. It was an ideal
                solution, since the board already has built-in USB capabilities, and I was already familiar with
                boards in the Arduino family.
            </p>
            <p>
                Next up was finding all the additional components I would need for this build. This included the
                slide potentiometers, knobs for them, and blank keycaps for my mechanical switches. The rest of the
                parts were needed specifically for the final build: some PCB prototype boards to solder onto, and
                some extra jumper wires. Other than that, I already had all of the pieces I would need.
            </p>

            <h3>Prototyping</h3>
            <p>
                Once I had picked out all the pieces, I designed the circuitry that would let the board read from
                the switches and sliders. This circuitry was fairly simple, mainly connecting power, ground, and the
                analog and digital input pins in the right places. The original design that I planned to prototype
                only used two buttons and two sliders.
            </p>
            <p>
                After waiting for all my parts to arrive, I quickly put together a prototype of the
                2-button-2-slider design on a couple of breadboards, then wrote some test code that simply plotted
                the button and slider values in the debugger. Both the buttons and sliders were working as intended,
                meaning that the hardware prototype was successful!
            </p>

            <h3>Software</h3>
            <p>Once the hardware prototype was working, I modified the embedded software in a few ways:</p>
            <ol>
                <li>To easily change the number of buttons and sliders for the final board</li>
                <li>To send signals over USB only when a value changes, or when the device is polled</li>
            </ol>
            <p>
                After making these changes, I ran the embedded software again on the prototype hardware, and
                eventually got it to work as intended. The final embedded code can be
                downloaded <a href="/files/embedded_software.ino" download>here</a>.
            </p>
            <p>
                The desktop-side software ended up being a pretty simple task: all it had to do was receive USB
                input, decode it, and send that data on to the OpenRGB SDK. I implemented this code in Python, and
                it can also be downloaded <a href="/files/controls.py" download>here</a>.
            </p>

            <h3>Planning the final board</h3>
            <Columns>
                <p>
                    Before I started wiring the finalized hardware, I updated my wiring diagram for the
                    10-slider-10-button final design. This ended up being super helpful, since all 20 inputs used a
                    lot of the Arduino Micro&rsquo;s available pins, and finding space for all of them while wiring
                    would have been a lot more stressful.
                </p>
                <Figure src="/images/pinplan.png" width={1115} height={720}
                        alt="Pin plan mapping the 10 sliders and 10 buttons to the Arduino Micro's analog and digital pins"
                        caption="The final pin plan" />
            </Columns>

            <h3>Building the case</h3>
            <p>
                When I initially set out on this project, I wanted to improve my physical fabrication skills and use
                the tools provided by the makerspace to 3D print a housing for the final design. I didn&rsquo;t end
                up having enough time to accomplish this, so instead I put together a casing out of a cardboard box!
                Through some meticulous box cutting and hot gluing, I arrived at a pretty clean final product.
            </p>
            <Columns>
                <Figure src="/images/thumbnail.jpg" width={3457} height={2854}
                        alt="The finished control board at an angle, with sliders and mechanical switches in a cardboard case" />
                <Figure src="/images/front.jpg" width={3830} height={2140}
                        alt="Top-down view of the finished control board" />
            </Columns>

            <h3>Soldering</h3>
            <Columns>
                <Figure src="/images/circuitry.jpg" width={3780} height={2531}
                        alt="The underside of the board, showing the soldered wiring to the Arduino Micro"
                        caption="The finished circuitry" />
                <p>
                    The final step was placing and soldering all the electronics. This took me quite a while, but
                    luckily I had already set myself up for success by planning the exact wiring I would need. After
                    many hours spent improving my soldering skills, I finally finished wiring the full circuit.
                </p>
            </Columns>
        </Section>

        <Section title="Demo">
            <p>
                Once the build was done, I retested the embedded software on the final hardware, and thankfully
                everything was working. After a few tweaks to the desktop-side software, the basic controls were
                working! Here is a short demo of the final product:
            </p>
            <Video src="/files/demo.mov" portrait caption="The board controlling the lighting in my PC setup" />
        </Section>

        <Section title="Successes and Failures">
            <Columns align="start">
                <Stack>
                    <h4>What went well</h4>
                    <ul>
                        <li>The embedded software worked reliably and was adaptable to the control scheme</li>
                        <li>The transition from breadboard to soldered hardware went smoothly</li>
                        <li>The USB-based communication with OpenRGB was successfully implemented and debugged</li>
                        <li>The physical layout of the board offered good usability and response</li>
                    </ul>
                </Stack>
                <Stack>
                    <h4>What didn&rsquo;t go as planned</h4>
                    <ul>
                        <li>Design and parts ordering took longer than expected, delaying hardware prototyping</li>
                        <li>Not all planned computer-side features (like a GUI) were implemented by showcase time</li>
                        <li>Building and soldering the final hardware took more iteration than anticipated, which compressed portfolio writing and presentation time</li>
                    </ul>
                </Stack>
            </Columns>
        </Section>

        <Callout title="Skills gained">
            <p>
                This project was a deep dive into real-world application of embedded electrical and computer
                engineering principles. Key skills I developed include:
            </p>
            <ul>
                <li><strong>Soldering and hardware finalization:</strong> moving beyond prototyping to polished, finished hardware</li>
                <li><strong>Circuit design and planning:</strong> creating a clear component layout with minimal signal interference</li>
                <li><strong>USB protocol understanding:</strong> learning how to interpret and transmit structured data over USB</li>
                <li><strong>Embedded-to-desktop communication:</strong> coordinating signal input from the board with software logic on a PC</li>
                <li><strong>Iterative design and project pacing:</strong> realizing the importance of buffering time for troubleshooting and adjustments</li>
            </ul>
        </Callout>
    </>;
}
