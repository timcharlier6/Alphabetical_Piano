import getNextMelody from "./getNextMelody.mjs";
import renderNewSentence from "./renderNewSentence.mjs";
import melodyToQwerty from "./melodyToQwerty.mjs";
import processUserTypingInput from "./processUserTypingInput.mjs";

export default function initializeApp() {
  const h2Element = document.getElementById("songTitle");
  const nextMelody = getNextMelody();
  h2Element.innerText = nextMelody[0].english_name;
  renderNewSentence(melodyToQwerty(nextMelody[0].notes));
  processUserTypingInput();
}
