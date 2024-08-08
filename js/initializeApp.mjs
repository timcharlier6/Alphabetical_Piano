import getNextMelody from "./getNextMelody.mjs";
import renderNewSentence from "./renderNewSentence.mjs";
import melodyToQwerty from "./melodyToQwerty.mjs";
import melodyToAzerty from "./melodyToAzerty.mjs";
import processUserTypingInput from "./processUserTypingInput.mjs";
import layoutManager from "./layoutManager.mjs";

export default function initializeApp() {
  const buttonElement = document.getElementById("toggleLayout");
  const inputElement = document.getElementById("typeInput");
  inputElement.value = "";
  let layout = layoutManager.getCurrentLayout();
  buttonElement.innerHTML = layout;
  const h2Element = document.getElementById("songTitle");
  const nextMelody = getNextMelody();
  if (layout === "AZERTY") {
    renderNewSentence(melodyToAzerty(nextMelody[0].notes));
    h2Element.innerText = nextMelody[0].french_name;
    processUserTypingInput(layout);
  } else if (layout === "QWERTY") {
    h2Element.innerText = nextMelody[0].english_name;
    renderNewSentence(melodyToQwerty(nextMelody[0].notes));
    processUserTypingInput(layout);
  }
}
