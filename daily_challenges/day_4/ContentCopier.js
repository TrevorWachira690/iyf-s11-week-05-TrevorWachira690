/* ================================================================
   DAY 4: CONTENT COPIER (bonus: drag and drop, plus a button)
   ================================================================ */

const source = document.getElementById("source");
const target = document.getElementById("target");

// --- Button-click version (the core requirement) ---
document.getElementById("copy-btn").addEventListener("click", () => {
  target.textContent = source.textContent;
});

// --- Drag-and-drop version (the bonus) ---
// There are 3 events involved in a basic drag-and-drop:

// 1. dragstart — fires on the element being picked up. We stash its
// text inside "dataTransfer", which is the built-in object browsers
// use to carry data from the drag source to wherever it gets dropped.
source.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("text/plain", source.textContent);
});

// 2. dragover — fires repeatedly while something is being dragged
// OVER the target. Calling preventDefault() here is NOT optional —
// browsers block dropping by default, and this is what allows it.
target.addEventListener("dragover", (event) => {
  event.preventDefault();
});

// 3. drop — fires the moment the user releases the drag on the target.
target.addEventListener("drop", (event) => {
  event.preventDefault();
  const droppedText = event.dataTransfer.getData("text/plain");
  target.textContent = droppedText;
});