export function melodyToQwerty(melody) {
  const noteQwertyMapping = keyMapping.reduce((acc, key) => {
    acc[key.note] = key.qwerty;
    return acc;
  }, {});
  return melody.map((note) => noteQwertyMapping[note]);
}
