const keyMapping = [
  { keyDown: "KeyZ", qwerty: "z", azerty: "w", note: "c3" },
  { keyDown: "KeyX", qwerty: "x", azerty: "x", note: "d3" },
  { keyDown: "KeyC", qwerty: "c", azerty: "c", note: "e3" },
  { keyDown: "KeyV", qwerty: "v", azerty: "v", note: "f3" },
  { keyDown: "KeyM", qwerty: "m", azerty: ",", note: "g3" },
  { keyDown: "Comma", qwerty: ",", azerty: ";", note: "a3" },
  { keyDown: "Period", qwerty: ".", azerty: ":", note: "b3" },
  { keyDown: "KeyA", qwerty: "a", azerty: "q", note: "c4" },
  { keyDown: "KeyS", qwerty: "s", azerty: "s", note: "d4" },
  { keyDown: "KeyD", qwerty: "d", azerty: "d", note: "e4" },
  { keyDown: "KeyF", qwerty: "f", azerty: "f", note: "f4" },
  { keyDown: "KeyJ", qwerty: "j", azerty: "j", note: "g4" },
  { keyDown: "KeyK", qwerty: "k", azerty: "k", note: "a4" },
  { keyDown: "KeyL", qwerty: "l", azerty: "l", note: "b4" },
  { keyDown: "KeyQ", qwerty: "q", azerty: "a", note: "c5" },
  { keyDown: "KeyW", qwerty: "w", azerty: "z", note: "d5" },
  { keyDown: "KeyE", qwerty: "e", azerty: "e", note: "e5" },
  { keyDown: "KeyR", qwerty: "r", azerty: "r", note: "f5" },
  { keyDown: "KeyU", qwerty: "u", azerty: "u", note: "g5" },
  { keyDown: "KeyI", qwerty: "i", azerty: "i", note: "a5" },
  { keyDown: "KeyO", qwerty: "o", azerty: "o", note: "b5" },
  { keyDown: "KeyP", qwerty: "p", azerty: "p", note: "c6" },
  { keyDown: "Enter", qwerty: "\n", azerty: "\n", note: "brown" },
  { keyDown: "Space", qwerty: " ", azerty: " ", note: "white" },
];

const twinkleTwinkle = [
  "c4",
  "c4",
  "g4",
  "g4",
  "a4",
  "a4",
  "g4",
  "f4",
  "f4",
  "e4",
  "e4",
  "d4",
  "d4",
  "c4",
];

const noteQwertyMapping = keyMapping.reduce((acc, key) => {
  acc[key.note] = key.qwerty;
  return acc;
}, {});

function melodyToCharacter(melody) {
  return melody.map((note) => noteQwertyMapping[note]);
}

console.log(melodyToCharacter(twinkleTwinkle));
