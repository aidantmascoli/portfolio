;; mod.asm
;; Aidan Mascoli
;; Computes A % B by repeated subtraction (6502 emulation mode).
;; RESULT at 0x1004 holds 22 % 3 = 1 after running from 0x2000.

.65816
    org 0x1000
A:      dw 22
B:      dw 3
RESULT: dw 0

    org 0x2000
START:
    sei
    lda A

LOOP:
    sec
    sbc B
    bmi DONE
    jmp LOOP

DONE:
    clc
    adc B
    sta RESULT
    brk
