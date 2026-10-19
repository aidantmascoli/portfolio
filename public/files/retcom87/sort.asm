;; sort.asm
;; Aidan Mascoli
;; 09-22-2025
;; Recursive quicksort in 65816 native mode.
;; 8-bit accumulator for the byte array, 16-bit index registers.
;; Data: a word length followed by an array of bytes.

.65816
.org 0x4000
length: dw 20
array:
    db 56
    db 44
    db 37
    db 89
    db 12
    db 23
    db 67
    db 45
    db 90
    db 11
    db 34
    db 78
    db 22
    db 10
    db 5
    db 99
    db 48
    db 69
    db 27
    db 15

.org 0x2000
main:
    ; Disable interrupts to protect from ROM routines running
    sei

    ; Set native mode
    clc
    xce

    sep #$20 ; Set accumulator to 8-bit
    rep #$10 ; Reset index registers to 16-bit

    ; Initialize start = 0, end = length of array - 1
    ldx #0
    ldy length
    dey

    jsr quick_sort ; quick_sort(0, length - 1)
    brk

;; quick_sort(start: X, end: Y)
quick_sort:
    ; Save X and Y onto stack
    phx
    phy

    ; If start >= end, return
    sty $00
    cpx $00
    beq quick_sort_end
    bpl quick_sort_end
    jsr partition ; pi = partition(start, end)

    ; Load pivot index minus 1 into Y
    tay
    dey

    jsr quick_sort ; quick_sort(start, pi - 1)

    ; Restore Y from the stack
    ply
    phy

    ; Load pivot index plus 1 into X
    tax
    inx

    jsr quick_sort ; quick_sort(pi + 1, end)

quick_sort_end:
    ; Restore X and Y from stack
    ply
    plx

    rts

;; partition(start: X, end: Y) -> pivot_index: A
partition:
    ; Save X and Y to the stack
    phx
    phy

    lda array, y ; pivot = array[end]
    sta $02 ; store pivot in zero page for comparison
    sty $04 ; store end in zero page for comparison
    txy ; int j = start

partition_loop:
    lda array, y ; get array[j]

    ; if array[j] <= pivot
    cmp $02
    bpl partition_skip

    jsr swap ; swap array[i] and array[j]
    inx ; i++

partition_skip:
    iny ; j++

    ; loop while j < end
    cpy $04
    bmi partition_loop

    jsr swap ; swap array[i] and array[end]

    txa ; load pivot_index into A

    ; Restore X and Y from stack
    ply
    plx
    rts

;; swap(i: X, j: Y)
swap:
    pha ; save accumulator on the stack

    ; swap array[i] and array[j]
    lda array, y ; load array[j]
    sta $00 ; temp = array[j]
    lda array, x ; load array[i]
    sta array, y ; array[j] = array[i]
    lda $00 ; load temp
    sta array, x ; array[i] = temp

    pla ; restore accumulator from stack
    rts
