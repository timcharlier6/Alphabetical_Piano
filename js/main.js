import initializeApp from "./initializeApp.mjs";
import layoutManager from "./layoutManager.mjs";

console.log(layoutManager.getCurrentLayout());

if (Tone.context.state !== "running") {
  Tone.start();
}
document.addEventListener("DOMContentLoaded", initializeApp);
