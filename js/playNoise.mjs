let audioContext;
let noiseBuffer;

audioContext = new (window.AudioContext || window.webkitAudioContext)();

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

export default playNoise;
