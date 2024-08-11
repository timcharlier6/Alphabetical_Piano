const buttonElement = document.getElementById("toggleLayout");
const textareaElement = document.getElementById("typeInput");
const displayElement = document.getElementById("sentenceDisplay");
const h2Element = document.getElementById("songTitle");

let cachedMelodies = null;
let cachedMappings = null;
let layoutBool = JSON.parse(localStorage.getItem("layoutBool")) || false;

document.addEventListener("DOMContentLoaded", initializeApp);

async function loadJSON(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}

async function cacheData() {
  const melodiesData = await loadJSON("./json/melodies.json");
  const mappingsData = await loadJSON("./json/mappings.json");
  cachedMelodies = melodiesData;
  cachedMappings = mappingsData;
}

function changeLayout() {
  layoutBool = !layoutBool;
  localStorage.setItem("layoutBool", JSON.stringify(layoutBool));
  location.reload();
}

function displayText() {
  if (cachedMelodies) {
    const randomMelody = getRandomMelody(cachedMelodies);
    document.getElementById("sentenceDisplay").innerHTML = randomMelody;
  } else {
    console.log("Data not loaded yet.");
  }
}

function getKey(input) {
  if (input === "melody") return layoutBool ? "nom" : "name";
  if (input === "character") return layoutBool ? "azerty" : "qwerty";
}

function getRandomMelody(cachedMelodies) {
  if (cachedMelodies.length === 0) {
    setTimeout(() => {
      location.reload();
    }, 5000);
    const message = layoutBool
      ? `YOU FINISHED THE GAME!\n Thanks for playing...`
      : `VOUS AVEZ FINI LE JEU!\n Merci d'avoir joué...`;
    return message;
  }
  const randomIndex = Math.floor(Math.random() * cachedMelodies.length);
  const randomMelody = cachedMelodies.splice(randomIndex, 1)[0];
  return randomMelody;
}

function displayInnerHTML(melody) {
  const key = getKey("melody");
  buttonElement.innerHTML = layoutBool
    ? "Switch to QWERTY"
    : "Switch to AZERTY";
  h2Element.innerHTML = melody[key];
}

async function initializeApp() {
  let melody = [];
  let text = [];
  document.body.addEventListener("click", () => textareaElement.focus());
  buttonElement.addEventListener("click", changeLayout);
  await cacheData();
  displayText();
  melody = getRandomMelody(cachedMelodies);
  text = melodyToText(melody);
  displayInnerHTML(melody);
  renderSentence(text);
  const arrayText = Array.from(displayElement.querySelectorAll("span"));
  if (textareaElement.value === "") arrayText[0].classList.add("underline");
  textareaElement.value = "";
  textareaElement.addEventListener("input", (event) =>
    handleInput(event, arrayText)
  );
}

const textToNote = () => {
  const key = getKey("character");
  const inputLength = textareaElement.value.length;
  const getCharachter = textareaElement.value[inputLength - 1];
  const foundItem = cachedMappings.find(
    (item) => item["text"][key] === getCharachter
  );
  const note = foundItem ? foundItem["note"] : null;
  return note;
};

const playTone = (note) => {
  if (Tone.context.state === "suspended") Tone.start();
  let lastTriggerTime = 0;
  const minGap = 50;
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now() * 1000; // Convert to milliseconds
  if (now - lastTriggerTime > minGap && note !== "\n" && note !== " ") {
    synth.triggerAttackRelease(note, "4n");
    lastTriggerTime = now;
  }
};

const handleInput = (event, arrayText) => {
  let arrayValue = textareaElement.value.split("");
  if (arrayValue[arrayValue.length - 1] === " ") {
    arrayValue[arrayValue.length - 1] = "␣";
  } else if (arrayValue[arrayValue.length - 1] === "\n") {
    arrayValue[arrayValue.length - 1] = "↵";
  }
  textareaElement.value = arrayValue.join("");
  const inputLength = textareaElement.value.length;
  const userInput = textareaElement.value;
  let correct = true;

  const note = textToNote();
  arrayText.forEach((item, index) => {
    if (event.inputType === "deleteContentBackward") {
      const cursorPosition = event.target.selectionStart;
      arrayText[cursorPosition].classList.remove(
        "correct",
        "incorrect",
        "underline"
      );
      arrayText[cursorPosition + 1].classList.remove("underline");
      // log the index of the deleted character
      console.log(cursorPosition);
    }
    if (
      textareaElement.value[index] !== item.innerText &&
      index < inputLength
    ) {
      item.classList.remove("correct", "underline");
      item.classList.add("incorrect");
      correct = false;
    }

    if (
      (userInput[index] === item.innerText && event.data === item.innerText) ||
      (event.data === " " &&
        item.innerText === "␣" &&
        userInput[index] === item.innerText) ||
      (userInput[index] === "\n" &&
        item.innerText === "↵" &&
        userInput[index] === item.innerText)
    ) {
      item.classList.remove("incorrect", "underline");
      item.classList.add("correct");
      playTone(note);
    }
  });

  if (inputLength < arrayText.length) {
    arrayText[inputLength].classList.remove("correct", "incorrect");
    arrayText[inputLength].classList.add("underline");
  }

  if (inputLength >= arrayText.length && !correct) {
    setTimeout(() => {
      displayElement.style.borderColor = "red";
      setTimeout(() => {
        textareaElement.value = "";
        displayElement.style.borderColor = "";
        arrayText.forEach((item, index) => {
          item.classList.remove("correct", "incorrect", "underline");
        });
      }, 1000);
    }, 10);
  }

  if (inputLength === arrayText.length && correct) {
    initializeApp();
  }
};

const renderSentence = (text) => {
  displayElement.innerHTML = "";
  text.forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    displayElement.appendChild(characterSpan);
  });
};

const melodyToText = (melody) => {
  const key = getKey("character");
  const notesArray = melody["notes"].split(",");
  const textArray = notesArray.map((note) => {
    const foundItem = cachedMappings.find((item) => item["note"] === note);
    return foundItem ? foundItem["text"][key] : null;
  });
  return textArray;
};

const currentYear = new Date().getFullYear();

const copyrightElement = document.getElementById("copyright");

copyrightElement.textContent = `© ${currentYear} Tim Charlier.`;
