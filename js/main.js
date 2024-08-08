import { keyMapping } from "./keyMapping.mjs";
import { melodies } from "./melodies.mjs";

function melodyToCharacter(melody) {
  const noteQwertyMapping = keyMapping.reduce((acc, key) => {
    acc[key.note] = key.qwerty;
    return acc;
  }, {});
  return melody.map((note) => noteQwertyMapping[note]);
}

console.log(melodyToCharacter(melodies));
