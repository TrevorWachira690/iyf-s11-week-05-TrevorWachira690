/* ================================================================
   DAY 5: DARK MODE TOGGLE
   ================================================================ */

document.getElementById("dark-mode-btn").addEventListener("click", () => {
  // classList.toggle() adds the class if it's missing, and removes
  // it if it's already there — a single line that acts as an on/off
  // switch, no if/else needed.
  document.body.classList.toggle("dark-mode");
});

// The smooth fade between light/dark isn't handled in JS at all —
// it comes from the "transition" property in the CSS, which tells
// the browser to animate background-color and color changes instead
// of snapping instantly.

// Note: the curriculum mentions saving this preference with
// localStorage next week. For now, refreshing the page resets it
// back to light mode — that's expected at this stage.