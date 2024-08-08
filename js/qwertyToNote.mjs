import getKeyMapping from "./getKeyMapping.mjs";

export default function qwertyToNote() {
  const keyMapping = getKeyMapping();
  const qwertyToNoteMapping = keyMapping.reduce((acc, key) => {
    acc[key.qwerty] = key.note;
    return acc;
  }, {});
  return qwertyToNoteMapping;
}
