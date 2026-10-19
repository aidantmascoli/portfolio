// Freeform write-up for RetCom87, shown below the summary card on /projects/retcom87.
// See ./_example.js for every building block (images, videos, columns, galleries...).
// Source: my VIP lab notebook entries (NB 2–5).

import {Section, Columns, Stack, Figure, Embed, Callout, Code} from "@/app/projects/_components/blocks";

const MULT_ASM = `.65816
    org 0x3000
A:      dw 27
B:      dw 44
RESULT: dw 0

    org 0x2000
start:
    sei
    clc
    xce             ; switch to native mode
    rep #0x30       ; 16-bit accumulator and index registers
    ldx A
    ldy B
loop:
    txa
    and #1          ; low bit of A set?
    beq skip
    tya
    clc
    adc RESULT      ; RESULT += B
    sta RESULT
skip:
    tya
    asl             ; B <<= 1
    tay
    txa
    lsr             ; A >>= 1
    tax
    bne loop
done:
    lda RESULT
    brk`;

const TEXT_MODE_ASM = `;ports for TMS9118
VDATA = $DFD0         ;VRAM data sequential reads/writes
VREG  = $DFD1         ;Register read/writes and initial VRAM address

start:
  sei                 ;never let an interrupt split a VDP write
  sep #$30

  ldx #$00            ;index into data table
  ldy #$80            ;code for register 0, will increment
init_loop:
  lda TEXTMODE_INIT, X
  sta VREG            ;write data
  nop                 ;cannot write too fast or the VDP can't keep up
  sty VREG            ;write register identifier
  inx
  iny
  cpy #$88            ;all 8 registers written?
  bne init_loop

TEXTMODE_INIT:
  .byte $00 ;R0 = Text mode, no external video
  .byte $d0 ;R1 = 16K, Enable Display, Disable Interrupts
  .byte $02 ;R2 = Name table in VRAM at $0800
  .byte $80 ;R3 = Color table not used
  .byte $00 ;R4
  .byte $20 ;R5 = Pattern table in VRAM at $0000
  .byte $00 ;R6
  .byte $F1 ;R7 = White text on black background`;

export default function Content() {
    return <>
        <Section title="The Machine">
            <p>
                RetCom87 is a team inside Georgia Tech&rsquo;s Vertically Integrated Projects program building a
                retrofuturistic, 80s-inspired computer. It&rsquo;s a stack of
                boards on top of a WDC W65C265SXB, whose 65C816 CPU (the 16-bit successor to the 6502, best known
                from the Super Nintendo) drives a sound board, a TMS9118 video board, and keyboard and controller input.
            </p>
            <p>
                My part was the software side. With no operating system underneath, everything I wrote is 65816
                assembly, loaded onto the board over serial. I kept a lab notebook
                throughout the year, and this page is drawn from it.
            </p>
        </Section>

        <Section title="Learning 65816 Assembly">
            <p>
                I started by working through the ChibiAkumas 6502 and 65816 tutorials, then wrote three practice
                programs, each one leaning on more of the processor. I uploaded each to the physical board with
                WDC&rsquo;s easySXB tool, ran it, and dumped memory to check the result by hand.
            </p>

            <Columns>
                <Stack>
                    <h3>Modulo (6502 emulation mode)</h3>
                    <p>
                        A repeated-subtraction modulo, written entirely in 6502 emulation mode to get comfortable
                        with branching and the basic instruction set. The memory dump shows <code>A = 0x16</code> (22),{" "}
                        <code>B = 0x03</code>, and <code>RESULT = 0x01</code>, so 22&nbsp;%&nbsp;3&nbsp;=&nbsp;1.
                    </p>
                </Stack>
                <Figure src="/images/retcom87/mod-easysxb.png" width={1368} height={827}
                        alt="easySXB window showing the modulo program's registers and a memory dump starting at 0x1000"
                        caption="mod.asm running on the board in easySXB" />
            </Columns>

            <Columns>
                <Figure src="/images/retcom87/mult-easysxb.png" width={1368} height={850}
                        alt="easySXB window showing a memory dump at 0x3000 with the multiplication result 0x04A4"
                        caption="mult.asm: 27 × 44 = 0x4A4 (1188)" />
                <Stack>
                    <h3>Shift-and-add multiply (native mode)</h3>
                    <p>
                        The next step was native mode. Setting the accumulator and index registers to 16 bits
                        allows larger operands, and the algorithm multiplies with shifts and adds instead of a loop
                        of additions.
                    </p>
                </Stack>
            </Columns>
            <Code caption="mult.asm">{MULT_ASM}</Code>

            <h3>Recursive quicksort</h3>
            <p>
                The last exercise was a quicksort over a 20-byte array, written with recursive subroutines that take
                their arguments in the X and Y registers and return in the accumulator. It runs with an 8-bit
                accumulator (to read bytes) and 16-bit index registers, and it relies on the stack and zero page
                far more than the first two programs. Getting it to work on easySXB was hard, and the board&rsquo;s
                breakpoints weren&rsquo;t helping. That&rsquo;s what led to the debugger below, where I tracked down
                every bug before moving the program back onto the hardware.
            </p>
        </Section>

        <Section title="Building a 65816 Debugger">
            <p>
                To see exactly what my code was doing, I wanted to run it somewhere I could fully observe and
                control. After testing several emulators, I built on Francesco Rigoni&rsquo;s{" "}
                <a href="https://github.com/FrancescoRigoni/Lib65816" target="_blank" rel="noopener noreferrer">Lib65816</a>,
                a C++ implementation of the 65816 CPU, and extended it into a command line debugger that can:
            </p>
            <ul>
                <li>Load <code>.hex</code> program files</li>
                <li>Dump memory to, and load memory from, a binary file</li>
                <li>Add and remove breakpoints</li>
                <li>Step into, over, and out of code after a breakpoint is hit</li>
                <li>Print the current CPU status</li>
                <li>Set the program counter directly, or run from any address</li>
            </ul>
            <p>
                Testing it on my own programs turned up a bug in the original library: one of the arithmetic opcode
                handlers used the accumulator&rsquo;s 8/16-bit mode when it should have used the index registers&rsquo;
                mode. Once that was fixed, the debugger became the tool four of us on the sub-team used to learn
                65816 and track down bugs. The source is on{" "}
                <a href="https://github.com/denayeisnotokay/db65816" target="_blank" rel="noopener noreferrer">GitHub</a>.
                One issue is still open there: after a <code>brk</code> instruction, execution won&rsquo;t resume even
                after the PC is reset.
            </p>
        </Section>

        <Section title="Debugger Demo">
            <p>
                This video is a walkthrough of the debugger and its command line features, running 65816 code
                entirely in software, without the board.
            </p>
            <Embed src="https://www.youtube-nocookie.com/embed/2fuJJ3oru5s" title="65816 Debugger Demo"
                   caption="65816 Debugger Demo" />
        </Section>

        <Section title="Driving the TMS9118 Video Chip">
            <Columns>
                <Stack>
                    <h3>Text mode</h3>
                    <p>
                        The video board is built around a TMS9118, the same family of video chip used in the
                        ColecoVision and MSX. I began by modifying the team&rsquo;s existing demo to put my own
                        strings on screen: initialize the chip&rsquo;s eight registers for text mode, copy a font into
                        the pattern table in VRAM, then write characters into the name table.
                    </p>
                    <p>
                        Timing matters. The CPU can write faster than the chip can accept data, and an interrupt
                        landing mid-write puts the two out of sync, so interrupts stay off while the code talks to
                        the chip.
                    </p>
                </Stack>
                <Figure src="/images/retcom87/text-mode.jpg" width={900} height={1200} size="sm"
                        alt="A small monitor displaying white text-mode characters output by the RetCom87 video board"
                        caption="Custom text on the display, driven from 65816 assembly" />
            </Columns>
            <Code caption="Text mode initialization (excerpt from moretext.asm)">{TEXT_MODE_ASM}</Code>

            <h3>Sprite mode</h3>
            <p>
                Sprites took a while to click. My answer was a reusable template: the program carries all of its VRAM
                data (patterns, colors, and sprite attributes) and copies each block to the right place. The demo
                uses both background patterns and sprites in Graphics I mode, with a small sprite moving down the
                screen over a tiled brick background. For now, motion comes from a busy-wait between each pixel of
                movement. The next step is driving it from a hardware timer instead.
            </p>
            <Figure src="/images/retcom87/sprite-mode.jpg" width={1368} height={760}
                    alt="Capture-card screenshot of an orange brick-pattern background with a small green sprite"
                    caption="Graphics I mode: a sprite over a brick pattern background, captured from the video output" />
        </Section>

        <Section title="Supplemental Resources">
            <ul>
                <li><a href="/files/retcom87/mod.asm" download>mod.asm</a> &middot; modulo in 6502 emulation mode</li>
                <li><a href="/files/retcom87/mult.asm" download>mult.asm</a> &middot; shift-and-add multiplication in native mode</li>
                <li><a href="/files/retcom87/sort.asm" download>sort.asm</a> &middot; recursive quicksort</li>
                <li><a href="https://github.com/denayeisnotokay/db65816" target="_blank" rel="noopener noreferrer">db65816</a> &middot; my 65816 debugger</li>
                <li><a href="https://github.com/FrancescoRigoni/Lib65816" target="_blank" rel="noopener noreferrer">Lib65816</a> &middot; the 65816 CPU emulator it&rsquo;s built on</li>
                <li><a href="https://www.chibiakumas.com/6502/" target="_blank" rel="noopener noreferrer">ChibiAkumas 6502 tutorials</a> &middot; where I started learning</li>
            </ul>
        </Section>

        <Callout title="What I learned">
            <p>
                Writing assembly for real hardware taught me to read datasheets and schematics closely, to treat
                timing as part of correctness, and to build my own tools when the existing ones get in the way. The
                debugger started as a way to fix my quicksort and ended up saving time for the rest of the sub-team.
            </p>
        </Callout>
    </>;
}
