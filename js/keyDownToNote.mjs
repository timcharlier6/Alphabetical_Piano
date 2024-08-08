import getKeyMapping from "./getKeyMapping.mjs";

export default function keyDownToNote() {
  if (Tone.context.state !== "running") {
    Tone.start();
  }
  const keyMapping = getKeyMapping();
  const qwertyToNoteMapping = keyMapping.reduce((acc, key) => {
    acc[key.qwerty] = key.note;
    return acc;
  }, {});
  document.addEventListener("keydown", (event) => {
    const key = event.key;
    const noteId = qwertyToNoteMapping[key];
    console.log(noteId);
  });
}
