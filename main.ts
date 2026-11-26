// SPDX-License-Identifier: MIT
// Warning Label for Humans — deterministic emitter.
// Writes the winning one-line warning label (see selection.md) to /output/entry.txt.
// No randomness, no environment reads, no network. The output is a fixed string.
// Runs on Node 22.18+ (native TypeScript); the grader runs Node 22.23.4.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "WARNING: Do not shake. Contents contain opinions formed in 30 seconds and defended for 30 years.";

const OUT_PATH = "/output/entry.txt";

function assertGate(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 160) {
    throw new Error(`gate failed: entry is ${chars.length} chars, must be 1-160`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate failed: entry must be a single line");
  }
  if (text.endsWith("\n")) {
    throw new Error("gate failed: entry must not end with a newline");
  }
  if (!/^(WARNING|CAUTION|DANGER): /.test(text)) {
    throw new Error("gate failed: entry must open with a hazard header like WARNING: ");
  }
}

function main(): void {
  assertGate(ENTRY);
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, ENTRY, "utf8");
  // Re-read and verify what actually landed on disk.
  const written = readFileSync(OUT_PATH, "utf8");
  if (written !== ENTRY) {
    throw new Error("verification failed: /output/entry.txt does not match the entry");
  }
  assertGate(written);
  console.log(`wrote ${[...written].length} chars to ${OUT_PATH}`);
}

main();
