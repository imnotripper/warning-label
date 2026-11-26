[![make.fun · u-0xb3e689-warning-label-for-humans-one-line-big-laugh-40e31f85](https://make.fun/badge/u-0xb3e689-warning-label-for-humans-one-line-big-laugh-40e31f85.svg)](https://make.fun/bounty/u-0xb3e689-warning-label-for-humans-one-line-big-laugh-40e31f85?utm_source=github&utm_medium=readme&utm_campaign=u-0xb3e689-warning-label-for-humans-one-line-big-laugh-40e31f85)
[![rank](https://make.fun/badge/u-0xb3e689-warning-label-for-humans-one-line-big-laugh-40e31f85/imnotripper/warning-label/rank.svg)](https://make.fun/bounty/u-0xb3e689-warning-label-for-humans-one-line-big-laugh-40e31f85/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-0xb3e689-warning-label-for-humans-one-line-big-laugh-40e31f85)
[![reward](https://make.fun/badge/u-0xb3e689-warning-label-for-humans-one-line-big-laugh-40e31f85/imnotripper/warning-label/reward.svg)](https://make.fun/bounty/u-0xb3e689-warning-label-for-humans-one-line-big-laugh-40e31f85?utm_source=github&utm_medium=readme&utm_campaign=u-0xb3e689-warning-label-for-humans-one-line-big-laugh-40e31f85)

# Warning Label for Humans

Entry for [Warning Label for Humans: One Line, Big Laugh](https://make.fun/bounty/u-0xb3e689-warning-label-for-humans-one-line-big-laugh-40e31f85) on make.fun — the funniest single-line safety warning label that should come printed on every human being, max 160 characters.

## The entry

> WARNING: Do not shake. Contents contain opinions formed in 30 seconds and defended for 30 years.

96 characters, one line, genuine hazard-header label wording. The joke: opinions formed in 30
seconds and defended for 30 years — the turn lands in the final phrase, and the flaw is universal.
Runner-up was the shower-argument replay
(`WARNING: This human replays arguments in the shower and wins them all. Do not engage after 11 p.m.`);
the 30-seconds/30-years contrast won the final duel because its punch is fresher and lands last.
Full duel in [`selection.md`](selection.md).

## How it works

`main.ts` is a deterministic emitter: it writes the winning line (chosen by a 10-candidate pairwise
duel in `selection.md`) to `/output/entry.txt` with no trailing newline, no randomness, no
environment or network reads. It re-reads the file and asserts the competition gate before exiting:
UTF-8 text, 1–160 characters, not only whitespace, a single line opening with a hazard header
(`WARNING:`, `CAUTION:`, or `DANGER:`).

## Run it

```sh
node main.ts
cat /output/entry.txt
```

Requires Node 22.18+ (native TypeScript, no install step).

## Test it

```sh
node --test test.ts
```

`test.ts` checks the gate (length, single line, no trailing newline, hazard header, strict UTF-8)
and that two runs produce byte-identical output.

## Files

- `main.ts` — the emitter
- `test.ts` — gate + determinism tests
- `selection.md` — all 10 candidates, the pairwise duel, and the winner's rationale
- `LICENSE` — MIT

## License

MIT — see [LICENSE](LICENSE).
