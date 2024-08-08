import initializeApp from "./initializeApp.mjs";
import layoutManager from "./layoutManager.mjs";

if (Tone.context.state !== "running") {
  Tone.start();
}
const buttonElement = document.getElementById("toggleLayout");
buttonElement.addEventListener("click", layoutManager.toggleLayout);
let currentLayout = layoutManager.getCurrentLayout();
console.log(currentLayout);
const textarea = document.getElementById("typeInput");
document.addEventListener("DOMContentLoaded", initializeApp);
// Add event listener to the body
document.body.addEventListener("click", function () {
  textarea.focus();
});
