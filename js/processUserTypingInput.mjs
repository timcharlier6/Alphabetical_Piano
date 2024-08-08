import renderNewSentence from "./renderNewSentence.mjs";
import qwertyToNote from "./qwertyToNote.mjs";
import azertyToNote from "./azertyToNote.mjs";
import initializeApp from "./initializeApp.mjs";
import playNote from "./playNote.mjs";
import layoutManager from "./layoutManager.mjs";

export default function processUserTypingInput(input) {
  let textToNoteMapping;
  var input = input;

  if (input === "AZERTY") {
    textToNoteMapping = azertyToNote();
  } else if (input === "QWERTY") {
    textToNoteMapping = qwertyToNote();
  }
  const sentenceDisplayElement = document.getElementById("sentenceDisplay");
  const inputElement = document.getElementById("typeInput");

  inputElement.addEventListener("input", (event) => {
    let arrayValue = inputElement.value.split("");

    // Handle space and newline characters
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
        if (
          index === arrayValue.length - 1 && // Ensure it's the current character
          textToNoteMapping[character] && // Ensure there is a mapped note
          character !== "␣" && // Exclude space
          character !== "↵" && // Exclude newline
          event.data !== null
        ) {
          console.log(
            event.data + " " + textToNoteMapping[character] + " " + input,
          );
          console.log(textToNoteMapping);
          playNote(textToNoteMapping[character]);
        }
      } else {
        characterSpan.classList.remove("correct");
        characterSpan.classList.add("incorrect");
        characterSpan.classList.remove("underline");
        correct = false;
      }
    });

    // Underline the next character to type
    if (arrayValue.length < arraySentence.length) {
      arraySentence[arrayValue.length].classList.add("underline");
    }

    // If the entire sentence is correct, reset for the next sentence
    if (arrayValue.length === arraySentence.length && correct) {
      initializeApp();
      inputElement.value = "";
    }

    // If input is incorrect and exceeds the sentence length, reset input
    if (arrayValue.length >= arraySentence.length && !correct) {
      inputElement.value = "";
    }
  });
}
