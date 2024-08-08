import getKeyMapping from "./getKeyMapping.mjs";

export default function azertyToNote() {
  const keyMapping = getKeyMapping();
  const azertyToNoteMapping = keyMapping.reduce((acc, key) => {
    acc[key.azerty] = key.note;
    return acc;
  }, {});
  return azertyToNoteMapping;
}
