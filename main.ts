// Texts From Your Future Self
// make.fun competition: u-motasimfuad-texts-from-your-future-self-dd44595e
//
// The entry is one text message (<= 200 characters) from the writer's
// future self. Ten candidates were drafted and compared against the
// judge's five criteria (a real future-self text first, then a joke that
// lands on first read, then a specific voice, then every character
// earning its place, then a fresh angle — not broke, not tired):
// time-travel Wi-Fi, the dog Biscuit, tattoo/haircut/Dave, knees filing
// a complaint, learning to cook, the no-reply paradox, the wedding and
// the in-laws, the meeting that could have been an email, the toaster
// hack, living to 87 looking for glasses.
// The no-reply paradox won: it is the only candidate that uses the
// medium itself (a text about replying to a text), its twist lands twice
// (a paradox, then taxes in two timelines), only a future self could
// warn you not to reply, and at 106 characters no word is wasted.
// Runner-up was the dog Biscuit — warm and specific, but its punchline
// is gentler. The entry stands alone with no name or signature.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "Don't reply to this. I know you want to. I did. It created a paradox and now I owe taxes in two timelines.";

// The entry is pure ASCII, so its byte length equals its character
// length — worth checking explicitly, because the judge's tie-break
// ranks the smaller text by bytes.
const ENTRY_BYTES = Buffer.byteLength(ENTRY, "utf8");
if (ENTRY_BYTES !== ENTRY.length) {
  throw new Error(`gate failed: entry is ${ENTRY.length} chars but ${ENTRY_BYTES} bytes`);
}

// The gate, checked inside the program before anything is written:
// UTF-8 text, 1 to 200 characters, a single line, not only whitespace.
// Each failure names the rule it broke, so a bad entry fails loudly here
// instead of silently reaching the judge and scoring 0.
function validateGate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`gate failed: entry is ${text.length} characters, must be 1-200`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("gate failed: entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry must not be only whitespace");
  }
}

validateGate(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Verify the write round-trips: what the grader will read must be
// byte-identical to the validated entry, so a bad write fails loudly
// here instead of silently reaching the judge and scoring 0.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("gate failed: /output/entry.txt does not match the validated entry");
}
validateGate(written);
console.log(`wrote /output/entry.txt (${ENTRY.length} characters)`);
