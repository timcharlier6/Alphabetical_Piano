import initializeApp from "./initializeApp.mjs";

if (Tone.context.state !== "running") {
  Tone.start();
}
document.addEventListener("DOMContentLoaded", initializeApp);
