/* ================================================================
   DAY 1: COLOR CHANGER
   Goal: clicking a button gives every heading a new random color.
   ================================================================ */

function randomHexColor() {
  // Math.random() gives a decimal between 0 and 1. Multiplying by
  // 16777215 (which is 0xFFFFFF, the highest possible 6-digit hex
  // value) scales it up to the full range of colors.
  const randomNum = Math.floor(Math.random() * 16777215);

  // .toString(16) converts that number into a base-16 (hex) STRING.
  // padStart(6, "0") guarantees it's always 6 digits — without it,
  // a small number like 163 would become "a3" instead of "0000a3",
  // producing an invalid CSS color.
  return "#" + randomNum.toString(16).padStart(6, "0");
}

document.getElementById("color-changer-btn").addEventListener("click", () => {
  // A combined CSS selector ("h1, h2, h3") grabs all three heading
  // levels in a single querySelectorAll call.
  const headings = document.querySelectorAll("h1, h2, h3");

  headings.forEach((heading) => {
    heading.style.color = randomHexColor();
  });
});
