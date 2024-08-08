import getNextMelody from "./getNextMelody.mjs";
import { melodyToQwerty } from "./melodyToQwerty.mjs";
import renderNewSentence from "./renderNewSentence.mjs";

function initializeApp() {
  const h2Element = document.getElementById("songTitle");
  const nextMelody = getNextMelody();
  h2Element.innerText = nextMelody[0].english_name;
  renderNewSentence(melodyToQwerty(nextMelody[0].notes));
}

document.addEventListener("DOMContentLoaded", initializeApp);

function processUserTypingInput() {
  const sentenceDisplayElement = document.getElementById("sentenceDisplay");
  const inputElement = document.getElementById("typeInput");

  inputElement.addEventListener("input", () => {
    let arrayValue = inputElement.value.split("");

    if (arrayValue[arrayValue.length - 1] === " ") {
      arrayValue[arrayValue.length - 1] = "␣";
    } else if (arrayValue[arrayValue.length - 1] === "\n") {
      arrayValue[arrayValue.length - 1] = "↵";
    }

    inputElement.value = arrayValue.join("");

    const arraySentence = sentenceDisplayElement.querySelectorAll("span");

    let correct = true;
    arraySentence.forEach((characterSpan, index) => {
      const character = arrayValue[index];
      if (character == null) {
        characterSpan.classList.remove("correct", "incorrect", "underline");
      } else if (character === characterSpan.innerText) {
        characterSpan.classList.add("correct");
        characterSpan.classList.remove("incorrect", "underline");
      } else {
        characterSpan.classList.remove("correct");
        characterSpan.classList.add("incorrect");
        characterSpan.classList.remove("underline");
        correct = false;
      }
    });

    if (arrayValue.length < arraySentence.length) {
      arraySentence[arrayValue.length].classList.add("underline");
    }

    if (arrayValue.length === arraySentence.length && correct) {
      initializeApp();
      inputElement.value = "";
    }

    if (arrayValue.length >= arraySentence.length && !correct) {
      inputElement.value = "";
    }
  });
}

processUserTypingInput();
