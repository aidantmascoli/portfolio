;; mult.asm
;; Aidan Mascoli
;; Shift-and-add multiplication in 65816 native mode with 16-bit registers.
;; RESULT at 0x3004 holds 27 * 44 = 1188 (0x4A4) after running from 0x2000.

.65816
    org 0x3000
A:      dw 27
B:      dw 44
RESULT: dw 0

    org 0x2000
start:
    sei

    clc
    xce

    rep #0x30

    ldx A
    ldy B

loop:
    txa
    and #1
    beq skip

    tya
    clc
    adc RESULT
    sta RESULT

skip:
    tya
    asl
    tay

    txa
    lsr
    tax

    bne loop

done:
    lda RESULT
    brk
