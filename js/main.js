// Render a new sentence on the screen
function renderNewSentence(melody) {
  const sentenceDisplayElement = document.getElementById("sentenceDisplay");
  sentenceDisplayElement.innerHTML = "";
  melody.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    sentenceDisplayElement.appendChild(characterSpan);
  });
}

// Process user typing input
function processUserTypingInput() {
  const sentenceDisplayElement = document.getElementById("sentenceDisplay");
  const inputElement = document.getElementById("typeInput");

  // Generate the initial sentence default
  let randomSentence = generateRandomSentence();
  renderNewSentence(randomSentence);

  // Event listener for user input
  inputElement.addEventListener("input", () => {
    const arraySentence = sentenceDisplayElement.querySelectorAll("span");
    const arrayValue = inputElement.value.split("");
    console.log(arrayValue);

    let correct = true;
    arraySentence.forEach((characterSpan, index) => {
      const character = arrayValue[index];
      if (character == null) {
        characterSpan.classList.remove("correct");
        characterSpan.classList.remove("incorrect");
        characterSpan.classList.remove("underline");
      } else if (character === characterSpan.innerText) {
        characterSpan.classList.add("correct");
        characterSpan.classList.remove("incorrect");
        characterSpan.classList.remove("underline");
      } else if (
        character !== characterSpan.innerText &&
        (characterSpan.innerText === " " || characterSpan.innerText === "\n")
      ) {
        characterSpan.classList.add("incorrect");
        correct = false;
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

    if (arrayValue.length === arraySentence.length) {
      if (correct) {
        // Generate a new sentence based on current difficulty level
        const newDifficulty = "medium"; // Change difficulty as needed
        randomSentence = generateRandomSentence(newDifficulty, 8);
        renderNewSentence(randomSentence);
        inputElement.value = ""; // Clear the input field
      } else {
        inputElement.value = ""; // Clear the input field on incorrect completion
      }
    }
  });
}
