import getKeyMapping from "./getKeyMapping.mjs";

export default function keyDownToNote() {
  const keyDownNoteMapping = getKeyMapping().reduce((acc, key) => {
    acc[key.keyDown] = key.note;
    return acc;
  }, {});
  return keyDownNoteMapping;
}
