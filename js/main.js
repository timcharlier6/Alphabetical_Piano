$(document).ready(function () {
  const $p = $("#p");
  const $message = $("#message");
  const $textarea = $("#textarea");
  const $start = $("#start");
  const $select = $("#select");
  let map = {};
  let prel = {};
  let notes = [];
  let currentLayout = "azerty";
  let $spans;

  let userInput = prompt(
    "Please enter the layout you want to use: choose from qwerty, dvorak, azerty",
  );

  if (!userInput) {
    prompt(
      "Please enter the layout you want to use:\n Choose from qwerty, dvorak, or azerty\n Svp entrez le clavier que vous voulez utiliser: choisissez entre qwerty, dvorak, ou azerty.",
    );
  } else if (userInput === "qwerty") {
    currentLayout = "qwerty";
  } else if (userInput === "dvorak") {
    currentLayout = "dvorak";
  } else if (userInput === "azerty") {
    currentLayout = "azerty";
  } else {
    prompt(
      "Please enter the layout you want to use:\n Choose from qwerty, dvorak, or azerty\n Svp entrez le clavier que vous voulez utiliser: choisissez entre qwerty, dvorak, ou azerty.",
    );
  }

  const synth = new Tone.Synth().toDestination();
  let isCorrect = true;
  async function init() {
    try {
      [map, prel] = await Promise.all([
        fetch("./json/mappings.json").then((response) => response.json()),
        fetch("./json/cello_suites/prelude1.json").then((response) =>
          response.json(),
        ),
      ]);
    } catch (error) {
      console.error(error);
    }
    waitForFetch();
  }
  init();

  function waitForFetch() {
    function nextNotes() {
      if (prel.length === 0) {
        $p.text("Finish");
        return;
      }

      notes = prel.shift();
      notes = convertNotesToCharacters(notes, [...notes], map);
      $p.contents().remove();
      notes.forEach((note) => {
        const $span = $("<span>").text(note);
        $p.append($span);
      });
      $spans = $p.children();
    }

    nextNotes();

    $start.on("click", async () => {
      $textarea.focus();
      await Tone.start();
      console.log("audio is ready");
      if (prel.length !== 0) {
        $message.text(
          "Please start typing the characters appearing on the screen.",
        );
        setTimeout(() => {
          $message.text("");
        }, 5000);
      }
    });

    $textarea.on("input", (e) => {
      let tone = convertTextInputToTone(e.originalEvent.data, map);
      let inputText = $textarea.val();
      console.log(`tone ${tone}`);
      inputText = inputText.replace(/ /g, "␣");

      $spans.each((index, span) => {
        const $span = $(span);
        if (index < inputText.length) {
          $span.removeClass("underline");
          if (inputText[index] !== $span.text()) {
            $span.css("color", "red");
          } else {
            $span.css("color", "green");
            if (
              inputText[inputText.length - 1] === notes[index] &&
              inputText.length === index + 1
            )
              playTone(tone);
          }
        } else if (index === inputText.length) {
          $span.addClass("underline");
          $span.css("color", "");
        } else {
          $span.css("color", "");
          $span.removeClass("underline");
        }
      });
      if (
        inputText.length >= $spans.length &&
        inputText[inputText.length - 1] === "␣"
      ) {
        $spans.css("color", "");
        $textarea.val("");
        nextNotes();
      }
    });
  }

  function convertNotesToCharacters(originalSubArr, copySubArr, map) {
    for (let i = 0; i < originalSubArr.length; i++) {
      for (let j = 0; j < map.length; j++) {
        if (map[j]["note"] === originalSubArr[i]) {
          copySubArr[i] = map[j]["text"][currentLayout];
        }
      }
    }
    return copySubArr;
  }

  function convertTextInputToTone(e, map) {
    let tone = "";
    for (let i = 0; i < map.length; i++) {
      if (e === map[i]["text"][currentLayout]) {
        tone = map[i]["note"];
      }
    }
    return tone;
  }

  let lastTriggerTime = 0;
  function playTone(sound) {
    console.log(`sound ${sound}`);
    const minGap = 50;
    const now = Tone.now() * 1000; // Convert to milliseconds
    if (now - lastTriggerTime > minGap && sound) {
      synth.triggerAttackRelease(sound, "4n");
      lastTriggerTime = now;
    }
  }

  const currentYear = new Date().getFullYear();
  const $copyRight = $("#date");
  $copyRight.text(currentYear);
});
