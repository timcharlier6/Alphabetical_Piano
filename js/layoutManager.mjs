import initializeApp from "./initializeApp.mjs";
let currentLayout;

const layoutManager = {
  toggleLayout() {
    currentLayout = currentLayout === "QWERTY" ? "AZERTY" : "QWERTY";
    initializeApp(currentLayout);
  },

  getCurrentLayout() {
    currentLayout = currentLayout === undefined ? "AZERTY" : currentLayout;
    return currentLayout;
  },
};

export default layoutManager;
