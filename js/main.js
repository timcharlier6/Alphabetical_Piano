import { melodies } from "./melodies.mjs";
import { melodyToQwerty } from "./melodyToQwerty.mjs";
import playNoise from "./playNoise.mjs";
import { keyDownToNote } from "./keyDownToNote.mjs";

const synth = new Tone.Synth().toDestination();
const melody = melodyToQwerty(melodies);
const keyDownNoteMapping = keyDownToNote();
console.log(melody);

function getNextMelody() {
  return melody.slice();
}

function renderNewSentence(melody) {
  const sentenceDisplayElement = document.getElementById("sentenceDisplay");
  sentenceDisplayElement.innerHTML = "";
  melody.push("↵");
  melody.forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    sentenceDisplayElement.appendChild(characterSpan);
  });
}

function processUserTypingInput() {
  const sentenceDisplayElement = document.getElementById("sentenceDisplay");
  const inputElement = document.getElementById("typeInput");

  let nextMelody = getNextMelody();
  renderNewSentence(nextMelody);

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
      nextMelody = getNextMelody();
      renderNewSentence(nextMelody);
      inputElement.value = "";
    }
  });
}

function playNoteById(noteId) {
  switch (noteId) {
    case "c3":
    case "d3":
    case "e3":
    case "f3":
    case "g3":
    case "a3":
    case "b3":
    case "c4":
    case "d4":
    case "e4":
    case "f4":
    case "g4":
    case "a4":
    case "b4":
    case "c5":
    case "d5":
    case "e5":
    case "f5":
    case "g5":
    case "a5":
    case "b5":
    case "c6":
      synth.triggerAttackRelease(noteId.toUpperCase(), "4n");
      break;
    case "white":
      playNoise("white");
      break;
    case "brown":
      playNoise("brown");
      break;
  }
  document.addEventListener("keydown", function (event) {
    if (Tone.context.state !== "running") {
      Tone.start();
    }

    const noteId = keyDownNoteMapping[event.code];
    if (noteId) {
      playNoteById(noteId);
      console.log(event.code);
    }
  });
}

document.addEventListener("DOMContentLoaded", processUserTypingInput);
