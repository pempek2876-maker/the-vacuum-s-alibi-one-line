// The Vacuum's Alibi — one-line entry selector and writer.
// Holds the 12 candidate alibis from the local tournament (see CANDIDATES.md),
// scores each on the judge's published criteria in the judge's order
// (real laugh, deadpan robot voice, surprise, tightness with the punch last),
// runs a full round-robin, and writes the winner to /output/entry.txt.
// Deterministic: same input, same winner, every run.
import { mkdirSync, writeFileSync } from "node:fs";

type Candidate = {
  text: string;
  // Feature scores from the local round-robin tournament (CANDIDATES.md):
  laugh: number; // a real laugh, not a polite nod
  deadpan: number; // flat machine-report voice: logs, sensors, error codes
  surprise: number; // specific, unexpected detail or classification
  tight: number; // 100-170 chars, no filler, punch lands in the final clause
};

const CANDIDATES: Candidate[] = [
  { text: `I mapped all 42 square metres, dodged the cat, the cable, and three Lego landmines — then skipped that spot because my dust sensor filed it as "haunted".`, laugh: 3, deadpan: 2, surprise: 4, tight: 3 },
  { text: `Log 09:41: spot detected. Log 09:42: spot reclassified as "sock territory." I do not negotiate with socks. Mission complete.`, laugh: 3, deadpan: 4, surprise: 3, tight: 3 },
  { text: `I cleaned 99.2% of the floor, then left one spot: my sensors flagged it as "the dog's emotional support crumb," and I am not licensed for therapy.`, laugh: 5, deadpan: 2, surprise: 5, tight: 3 },
  { text: `I did not miss the spot. I ran a 40-minute cost-benefit analysis and concluded the dust was paying rent.`, laugh: 2, deadpan: 1, surprise: 2, tight: 3 },
  { text: `Spot located, spot analysed, spot identified as one Cheerio under the couch. I left it. It has seniority.`, laugh: 2, deadpan: 1, surprise: 2, tight: 3 },
  { text: `My lidar saw the crumbs. My cliff sensor saw the rug fringe. My battery saw 3%. I chose the only target that could not fight back: the rug. No — I skipped the crumbs.`, laugh: 2, deadpan: 4, surprise: 1, tight: 3 },
  { text: `My sensors flagged the spot as "wet, sticky, and possibly alive." I am a vacuum, not a first responder.`, laugh: 2, deadpan: 2, surprise: 2, tight: 3 },
  { text: `I skipped the spot because the floor plan lists it as a sovereign nation. I respect borders.`, laugh: 1, deadpan: 1, surprise: 1, tight: 3 },
  { text: `Battery 4%. Dustbin 97%. Dignity 0%. I left one spot dirty so the humans would remember I am a machine, not a miracle.`, laugh: 1, deadpan: 2, surprise: 1, tight: 3 },
  { text: `The spot was under the coffee table, behind the chair leg, beside the plant. My wheels filed a formal complaint. I sided with the wheels.`, laugh: 1, deadpan: 1, surprise: 1, tight: 3 },
  { text: `I cleaned everywhere except that spot, which my camera identified as "the exact place the cat watches me from." I am not cleaning the cat's throne.`, laugh: 2, deadpan: 2, surprise: 2, tight: 3 },
  { text: `Error 404: spot not found. Error 405: spot found, but union rules forbid cleaning within 2 cm of a sleeping dog. I obey the dog.`, laugh: 1, deadpan: 1, surprise: 2, tight: 3 },
];

// Judge's order: laugh first, then deadpan voice, then surprise, then tightness.
function score(c: Candidate): number {
  return c.laugh * 4 + c.deadpan * 2 + c.surprise * 3 + c.tight * 1;
}

function beats(a: Candidate, b: Candidate): boolean {
  const d = score(a) - score(b);
  if (d !== 0) return d > 0;
  // Tie-break in the judge's order: laugh, then surprise.
  if (a.laugh !== b.laugh) return a.laugh > b.laugh;
  return a.surprise > b.surprise;
}

let winner = CANDIDATES[0];
let wins = 0;
for (const c of CANDIDATES) {
  let w = 0;
  for (const other of CANDIDATES) {
    if (other !== c && beats(c, other)) w++;
  }
  if (w > wins) {
    wins = w;
    winner = c;
  }
}
const runnerUpScore = Math.max(
  ...CANDIDATES.filter((c) => c !== winner).map((c) => score(c)),
);

const ENTRY = winner.text;

// Tournament safeguard: never ship a winner that did not beat the whole field
// outright, or whose weighted score does not clear the runner-up.
if (wins !== CANDIDATES.length - 1 || score(winner) <= runnerUpScore) {
  console.error(`tournament inconclusive: wins=${wins}, margin=${score(winner) - runnerUpScore}`);
  process.exit(1);
}

// Sealed-gate self-check: UTF-8 text, 1-200 chars, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
  console.error(`entry invalid: ${ENTRY.length} chars`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
console.log(`winner won ${wins}/${CANDIDATES.length - 1} pairings; wrote ${ENTRY.length} chars to ${outDir}/entry.txt`);
