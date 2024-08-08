let currentLayout = "azerty";

const layoutManager = {
  toggleLayout() {
    const button = document.getElementById("toggleLayout");
    currentLayout = button.innerHTML.toLowerCase();
    currentLayout = currentLayout === "qwerty" ? "azerty" : "qwerty";
    button.innerHTML = currentLayout.toUpperCase();
  },

  getCurrentLayout() {
    return currentLayout;
  },
};

export default layoutManager;
