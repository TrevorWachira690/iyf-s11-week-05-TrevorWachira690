/* ================================================================
   DAY 2: DYNAMIC ELEMENT CREATOR
   Goal: each click adds a new NUMBERED paragraph with a delete button.
   ================================================================ */

let paragraphCount = 0; // tracks how many paragraphs we've created so far
const paragraphList = document.getElementById("paragraph-list");

document.getElementById("add-paragraph-btn").addEventListener("click", () => {
  paragraphCount++; // increment BEFORE using it, so we start at #1, not #0

  const p = document.createElement("p");
  p.textContent = `Paragraph #${paragraphCount}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  // This arrow function "closes over" the exact "p" element created
  // above — even though many paragraphs get created over time, each
  // one's delete button remembers ITS OWN paragraph specifically.
  deleteBtn.addEventListener("click", () => {
    p.remove();
  });

  p.appendChild(deleteBtn);
  paragraphList.appendChild(p);
});