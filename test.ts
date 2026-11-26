// SPDX-License-Identifier: MIT
// Tests for the Warning Label for Humans emitter (main.ts).
// Gate: /output/entry.txt must be UTF-8 text of 1-160 chars, not only whitespace,
// a single line with no trailing newline, opening with a hazard header.
// Determinism: two runs must produce byte-identical output.
// The EXPECTED line is the duel winner in selection.md (#7, 96 chars).
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";

const OUT_PATH = "/output/entry.txt";
const EXPECTED =
  "WARNING: Do not shake. Contents contain opinions formed in 30 seconds and defended for 30 years.";

function runEmitter(): void {
  execFileSync(process.execPath, ["--experimental-strip-types", "main.ts"], {
    cwd: import.meta.dirname,
    stdio: "pipe",
  });
}

test("entry matches the winning line and passes the gate", () => {
  runEmitter();
  const bytes = readFileSync(OUT_PATH);
  // Strict UTF-8 decode: throws on any invalid byte sequence.
  const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  assert.equal(text, EXPECTED);
  const chars = [...text];
  assert.ok(chars.length >= 1 && chars.length <= 160, `length ${chars.length} out of 1-160`);
  assert.ok(text.trim().length > 0, "entry must not be only whitespace");
  assert.ok(!text.includes("\n") && !text.includes("\r"), "entry must be a single line");
  assert.ok(!text.endsWith("\n"), "entry must not end with a newline");
  assert.match(text, /^(WARNING|CAUTION|DANGER): /, "entry must open with a hazard header");
});

test("emitter is deterministic across two runs", () => {
  runEmitter();
  const first = readFileSync(OUT_PATH);
  runEmitter();
  const second = readFileSync(OUT_PATH);
  assert.ok(first.equals(second), "two runs must produce byte-identical output");
});
