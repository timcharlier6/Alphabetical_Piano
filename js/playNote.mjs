const synth = new Tone.Synth().toDestination();
let lastTriggerTime = 0;
const minGap = 50; // 50ms

export default function playNoteById(noteId) {
  const now = Tone.now() * 1000; // Convert to milliseconds
  if (now - lastTriggerTime > minGap) {
    synth.triggerAttackRelease(noteId, "4n");
    lastTriggerTime = now;
  }
}
