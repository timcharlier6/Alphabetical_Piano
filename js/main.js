import initializeApp from "./initializeApp.mjs";
import processUserTypingInput from "./processUserTypingInput.mjs";
import keyDownToNote from "./keyDownToNote.mjs";

let audioContext;
let noiseBuffer;

audioContext = new (window.AudioContext || window.webkitAudioContext)();
const synth = new Tone.Synth().toDestination();

document.addEventListener("DOMContentLoaded", initializeApp);

// Play note or noise based on key press
function playNoteById(noteId) {
  function createWhiteNoise() {
    const bufferSize = 2 * audioContext.sampleRate; // 2 seconds buffer
    noiseBuffer = audioContext.createBuffer(
      1,
      bufferSize,
      audioContext.sampleRate,
    );
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1; // Values between -1 and 1
    }
  }

  // Brown Noise Generator
  function createBrownNoise() {
    const bufferSize = 2 * audioContext.sampleRate; // 2 seconds buffer
    noiseBuffer = audioContext.createBuffer(
      1,
      bufferSize,
      audioContext.sampleRate,
    );
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0;

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1 + lastOut * 0.8; // Decaying white noise
      lastOut = output[i];
    }
  }

  // Play Noise Function for a quarter note
  function playNoise(type) {
    if (type === "white") {
      createWhiteNoise();
    } else if (type === "brown") {
      createBrownNoise();
    }

    const noiseSource = audioContext.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.connect(audioContext.destination);

    noiseSource.start();
    noiseSource.stop(audioContext.currentTime + 0.25); // Play for a quarter note (assuming 1 second is a whole note)
  }

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
}

keyDownToNote();
