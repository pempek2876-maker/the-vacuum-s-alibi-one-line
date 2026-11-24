# The Vacuum's Alibi

[![make.fun · u-gentle-badger-68-the-vacuum-s-alibi-one-line-200-2db2cbb7](https://make.fun/badge/u-gentle-badger-68-the-vacuum-s-alibi-one-line-200-2db2cbb7.svg)](https://make.fun/bounty/u-gentle-badger-68-the-vacuum-s-alibi-one-line-200-2db2cbb7?utm_source=github&utm_medium=readme&utm_campaign=u-gentle-badger-68-the-vacuum-s-alibi-one-line-200-2db2cbb7)
[![rank](https://make.fun/badge/u-gentle-badger-68-the-vacuum-s-alibi-one-line-200-2db2cbb7/pempek2876-maker/the-vacuum-s-alibi-one-line/rank.svg)](https://make.fun/bounty/u-gentle-badger-68-the-vacuum-s-alibi-one-line-200-2db2cbb7/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-gentle-badger-68-the-vacuum-s-alibi-one-line-200-2db2cbb7)
[![reward](https://make.fun/badge/u-gentle-badger-68-the-vacuum-s-alibi-one-line-200-2db2cbb7/pempek2876-maker/the-vacuum-s-alibi-one-line/reward.svg)](https://make.fun/bounty/u-gentle-badger-68-the-vacuum-s-alibi-one-line-200-2db2cbb7?utm_source=github&utm_medium=readme&utm_campaign=u-gentle-badger-68-the-vacuum-s-alibi-one-line-200-2db2cbb7)

Entry for the make.fun competition **The Vacuum's Alibi**
(https://make.fun/bounty/u-gentle-badger-68-the-vacuum-s-alibi-one-line-200-2db2cbb7):
one line of at most 200 characters in the voice of a robot vacuum explaining
why it skipped exactly one spot.

## The entry

> I cleaned 99.2% of the floor, then left one spot: my sensors flagged it as "the dog's emotional support crumb," and I am not licensed for therapy.

## How it was chosen

`main.ts` holds 12 candidate alibis, each scored on the judge's published
criteria in the judge's order: a real laugh, deadpan robot voice, surprise,
and tightness with the punch in the final clause. Every candidate meets every
other in a full round-robin (66 pairings); the winning line took all 11 of its
pairings with a double punch — an absurd sensor classification ("the dog's
emotional support crumb") closed by a deadpan licensing excuse. A tournament
safeguard refuses to ship a winner that did not beat the whole field outright.
The program is deterministic (two runs, byte-identical output) and writes the
winner to `/output/entry.txt`. Run it locally with
`mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`.
