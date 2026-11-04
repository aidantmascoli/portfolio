// Freeform write-up for Game Boy Advance Snake Game, shown below the summary card on /projects/gba-snake.
// See ./_example.js for every building block (images, videos, columns, galleries...).
// Sources: the CS 2110 HW6 spec and my submitted gba.c, gba.h, main.c, main.h.
// Screenshots: put the title screen and a gameplay capture in /public/images/gba-snake/.

import {Section, Columns, Stack, Figure, Code, Callout} from "@/app/projects/_components/blocks";

const GBA_C = `void waitForVBlank(void) {
  while (SCANLINECOUNTER > HEIGHT);   // wait until we're out of the current VBlank
  while (SCANLINECOUNTER < HEIGHT);   // then wait for the next one to start
  vBlankCounter++;
}

void drawImageDMA(int row, int col, int width, int height, const u16 *image) {
  for (int r = 0; r < height; r++) {  // one DMA transfer per row
    DMA[DMA_CHANNEL_3].src = image + OFFSET(r, 0, width);
    DMA[DMA_CHANNEL_3].dst = videoBuffer + OFFSET(row + r, col, WIDTH);
    DMA[DMA_CHANNEL_3].cnt = width | DMA_ON | DMA_SOURCE_INCREMENT;
  }
}`;

export default function Content() {
    return <>
        <Section title="The Assignment">
            <p>
                This was the final homework in Georgia Tech&rsquo;s CS 2110, Computer Organization and Programming:
                write an interactive program in C that runs on a Game Boy Advance emulator. There&rsquo;s no
                operating system or graphics library on the GBA. The screen, the buttons, and the DMA controller
                are all reached through memory-mapped registers at fixed addresses, so the program works directly
                with the hardware.
            </p>
            <p>
                The requirements were a title screen, images, text, button input, collision detection, and no
                screen tearing, all built on Mode 3 video, DMA, and VBlank timing. I chose to make Snake.
            </p>
            <Figure src="/images/gba-snake/title.png" width={240} height={160} size="lg" pixelated
                    alt="The game's title screen: a brick wall background with a blinking Press START prompt"
                    caption="The title screen" />
        </Section>

        <Section title="Talking to the Hardware">
            <p>
                Before writing the game, I finished the course&rsquo;s starter library in <code>gba.c</code> and{" "}
                <code>gba.h</code>. In Mode 3 the screen is a 240&times;160 bitmap, with each pixel stored as a
                16-bit color in video memory starting at <code>0x6000000</code>. Copying pixels one at a time from
                the CPU is too slow, so images and rectangles go through DMA channel 3: write a source address, a
                destination address, and a control word, and the hardware copies a whole row at once.
            </p>
            <p>
                To keep the picture from tearing, drawing waits for VBlank, the short gap after the screen finishes
                a frame. <code>waitForVBlank</code> polls the scanline counter register to find it. I also wrote
                a <code>KEY_JUST_PRESSED</code> macro that uses bitmasks to compare this frame&rsquo;s button
                register with the last one, so holding a button counts as a single press.
            </p>
            <Code caption="Two of the library functions from gba.c">{GBA_C}</Code>
        </Section>

        <Section title="The Game">
            <Columns>
                <Stack>
                    <p>
                        The board is a 30&times;18 grid of 8-pixel cells, with the score in a bar along the bottom.
                        The snake moves one cell every 8 frames, about 7.5 cells per second.
                    </p>
                    <ul>
                        <li>The snake is a doubly linked list. Each tick adds a new head, and the tail is removed unless the snake just ate.</li>
                        <li>Turns pressed between ticks go into a queue, so two quick presses (like a tight U-turn) both register. Presses that would reverse the snake into itself are ignored.</li>
                        <li>Two power-ups are on the board at a time. When one is eaten, it respawns on a random cell that isn&rsquo;t covered by the snake or the other power-up.</li>
                        <li>Hitting a wall or your own body loses; a score of 100 wins. SELECT returns to the title screen at any point.</li>
                        <li>The head has eyes and a forked tongue that turn with it, and on a loss the eyes become X&rsquo;s.</li>
                    </ul>
                </Stack>
                <Figure src="/images/gba-snake/gameplay.png" width={240} height={160} pixelated
                        alt="Gameplay: a green snake on a dark grid, with power-ups on the board and the score along the bottom"
                        caption="Gameplay in the mGBA emulator" />
            </Columns>
        </Section>

        <Section title="Drawing Without Tearing">
            <p>
                The GBA is slow enough that redrawing the full screen on every move would tear. So each tick only
                redraws what changed. The new head cell is drawn, and the old tail cell is erased by copying the
                matching piece of the background image back over it. The previous tongue is cleared, and the score
                bar is redrawn only when the score changes. All of this happens right after a single{" "}
                <code>waitForVBlank</code> call, inside the blank period.
            </p>
            <p>
                The title screen, grid background, power-up sprite, and end-of-game card are my own artwork
                (the title&rsquo;s brick texture is by{" "}
                <a href="https://www.artstation.com/artwork/3dVnEJ" target="_blank" rel="noopener noreferrer">Gregory Ligman</a>).
                I converted them into C arrays with nin10kit.
            </p>
        </Section>

        <Callout title="What I learned">
            <p>
                This project showed me what a graphics library usually hides: setting register bits with bitmasks,
                working out how much drawing fits in each frame, and finding memory bugs with gdb attached to the
                emulator. Looking back, I&rsquo;d replace the linked lists. I allocated the snake and the input
                queue with <code>malloc</code>, but the board only has 540 cells, so a fixed-size array used as a
                ring buffer would avoid allocation entirely. That fits a machine with no operating system better.
            </p>
        </Callout>
    </>;
}
