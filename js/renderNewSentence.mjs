export default function renderNewSentence(melody) {
  const sentenceDisplayElement = document.getElementById("sentenceDisplay");
  sentenceDisplayElement.innerHTML = "";
  melody.forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    sentenceDisplayElement.appendChild(characterSpan);
  });
}
