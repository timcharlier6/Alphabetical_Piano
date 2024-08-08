const melody = [
  "a",
  "a",
  "j",
  "j",
  "k",
  "k",
  "j",
  "␣",
  "f",
  "f",
  "d",
  "d",
  "s",
  "s",
  "a",
];

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

processUserTypingInput();
