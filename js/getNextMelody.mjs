import { melodies } from "./melodies.mjs";

const remainingMelodies = melodies.slice();

export default function getNextMelody() {
  const randomMelody =
    remainingMelodies[Math.floor(Math.random() * melodies.length)];
  const extractedMelody = remainingMelodies.filter(
    (melody) => melody === randomMelody,
  );

  return extractedMelody;
}
