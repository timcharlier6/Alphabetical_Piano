import renderNewSentence from "./renderNewSentence.mjs";
import qwertyToNote from "./qwertyToNote.mjs";
import initializeApp from "./initializeApp.mjs";
import playNote from "./playNote.mjs";

let qwertyToNoteMapping = qwertyToNote();

export default function processUserTypingInput() {
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
        const noteId = qwertyToNoteMapping[arrayValue[arrayValue.length - 1]];
        console.log(noteId);
        if (noteId && noteId !== " " && noteId !== "\n") {
          playNote(noteId);
        }
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
