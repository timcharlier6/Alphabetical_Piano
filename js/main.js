import initializeApp from "./initializeApp.mjs";
import layoutManager from "./layoutManager.mjs";

if (Tone.context.state !== "running") {
  Tone.start();
}
document.addEventListener("DOMContentLoaded", initializeApp);
