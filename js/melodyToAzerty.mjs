import getKeyMapping from "./getKeyMapping.mjs";

export default function melodyToAzerty(melody) {
  const noteAzertyMapping = getKeyMapping().reduce((acc, key) => {
    acc[key.note] = key.azerty;
    return acc;
  }, {});
  return melody.map((note) => noteAzertyMapping[note]);
}
