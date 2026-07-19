/* ================================================================
   LESSON 9: UNDERSTANDING THE DOM
   ================================================================
   The DOM (Document Object Model) is how JavaScript "sees" your
   HTML — not as text, but as a tree of objects you can read,
   navigate, and change. Every tag becomes a node in that tree.
   ================================================================ */


/* ----------------------------------------------------------------
   TASK 9.1 — SELECTING ELEMENTS
   ----------------------------------------------------------------
   There are 5 main ways to grab elements from the page. They
   differ in what they return and how "live" that result is.
   ---------------------------------------------------------------- */

// getElementById — the fastest method, but only for a single
// element that has a unique id="" attribute. Returns ONE element
// or null.
const header = document.getElementById("main-header");
console.log("getElementById:", header);

// getElementsByClassName — returns an HTMLCollection, which is
// "live": if elements matching this class are added/removed later,
// this collection automatically updates itself.
const contents = document.getElementsByClassName("content");
console.log("getElementsByClassName:", contents);

// getElementsByTagName — same live behavior, but matches by tag
// name instead of class.
const paragraphs = document.getElementsByTagName("p");
console.log("getElementsByTagName:", paragraphs);

// querySelector — accepts ANY valid CSS selector (class, id, tag,
// attribute, nesting — anything you'd write in a stylesheet) and
// returns the FIRST match only.
const firstLink = document.querySelector(".nav-link");
console.log("querySelector:", firstLink);

// querySelectorAll — same CSS selector power, but returns EVERY
// match as a NodeList. Unlike HTMLCollection, a NodeList is
// "static" — it's a snapshot, and won't update if the page changes
// later. NodeLists also support .forEach() directly; HTMLCollections
// don't (you'd need to convert them with Array.from() first).
const allLinks = document.querySelectorAll(".nav-link");
console.log("querySelectorAll:", allLinks);

// --- Practice answers ---
console.log("1. h1:", document.querySelector("h1"));
console.log("2. all .content:", document.querySelectorAll(".content"));
console.log("3. #contact-form:", document.getElementById("contact-form"));
console.log("4. email input:", document.getElementById("email"));
console.log("5. all nav li:", document.querySelectorAll("nav li"));
console.log("6. first .nav-link:", document.querySelector(".nav-link"));
// :last-of-type isn't reliable across mixed siblings, so the safe
// way to grab the LAST match from a NodeList is by its length - 1
const allParagraphs = document.querySelectorAll(".content");
console.log("7. last paragraph:", allParagraphs[allParagraphs.length - 1]);


/* ----------------------------------------------------------------
   TASK 9.2 — TRAVERSING THE DOM
   ----------------------------------------------------------------
   Once you have ONE element, you can "walk" to nearby elements
   using relationship properties, instead of running a whole new
   query. Think of the DOM like a family tree: parents, children,
   and siblings.
   ---------------------------------------------------------------- */

const nav = document.querySelector("nav");

console.log("parent of nav:", nav.parentElement);              // header
console.log("children of nav:", nav.children);                 // HTMLCollection [ul]
console.log("first child:", nav.firstElementChild);             // ul
console.log("last child:", nav.lastElementChild);                // ul (only one child here)

const article = document.querySelector("article");
console.log("next sibling of article:", article.nextElementSibling);     // section
console.log("previous sibling of article:", article.previousElementSibling); // null (nothing before it)

// querySelectorAll can also be called on an element (not just
// "document"), which limits the search to just its descendants.
const navLinks = nav.querySelectorAll("a");
console.log("links inside nav:", navLinks);

// --- Practice answers ---
const headerEl = document.getElementById("main-header");
console.log("1. nav inside header:", headerEl.querySelector("nav"));

const firstNavLink = document.querySelector(".nav-link");
console.log("2. parent li of first nav-link:", firstNavLink.parentElement);

console.log("3. sibling after article:", article.nextElementSibling);

const ul = document.querySelector(".nav-list");
console.log("4. all li in ul:", ul.children); // .children only gives element nodes, no stray text

const footer = document.querySelector("footer");
console.log("5. footer -> body:", footer.parentElement); // <body> is footer's direct parent here


/* ----------------------------------------------------------------
   TASK 9.3 — MODIFYING CONTENT
   ---------------------------------------------------------------- */

// --- Text content ---
const h1 = document.querySelector("h1");
console.log("textContent:", h1.textContent); // gets ALL text, including hidden elements
console.log("innerText:", h1.innerText);      // gets only text that's visually rendered
// h1.textContent = "New Title"; // uncomment to actually change it

// --- HTML content ---
// innerHTML lets you insert actual markup, but NEVER put raw user
// input into innerHTML — if a user typed <script>...</script> into
// a form and you dropped it into innerHTML, that script could run.
// textContent is the safe choice for anything that came from a user,
// because it always displays as plain text, never as executable HTML.
const dangerousInput = "<img src=x onerror=alert('hacked')>";
console.log("Same string via textContent (safe):", dangerousInput);
// article.textContent = dangerousInput; // would just show the text on screen, not run it

// --- Attributes ---
const link = document.querySelector(".nav-link");
console.log("getAttribute href:", link.getAttribute("href"));
console.log("property access href:", link.href); // property access returns a FULL resolved URL

link.setAttribute("href", "https://example.com");
console.log("hasAttribute target:", link.hasAttribute("target")); // false, we never set one
link.removeAttribute("target"); // safe even if it didn't exist

// --- Data attributes ---
// dataset gives camelCase access to any data-* attribute.
// data-id -> dataset.id, data-my-thing -> dataset.myThing
const dataEl = document.querySelector("[data-id]");
console.log("data-id:", dataEl.dataset.id);
console.log("data-category:", dataEl.dataset.category);
dataEl.dataset.newAttr = "value"; // this actually CREATES a real data-new-attr="value" attribute in the HTML

// --- Styles ---
const container = document.querySelector(".container");
container.style.backgroundColor = "#f0f0f0";
container.style.padding = "24px";
container.style.borderRadius = "8px";
// Object.assign copies multiple properties onto container.style at once,
// so you don't have to write container.style.x = ... on separate lines
Object.assign(container.style, {
  border: "1px solid #999",
});
// Note: in real projects, prefer toggling a CSS CLASS over setting
// individual inline styles like this — it keeps your styling rules
// in the stylesheet where they belong, instead of scattered in JS.


/* ----------------------------------------------------------------
   TASK 9.4 — ADDING & REMOVING ELEMENTS
   ---------------------------------------------------------------- */

// --- Creating elements ---
const newParagraph = document.createElement("p");
newParagraph.textContent = "This is a new paragraph!";
newParagraph.className = "content highlight";

// appendChild adds it as the LAST child inside <article>
article.appendChild(newParagraph);

// insertBefore needs the parent, the new node, and the "reference"
// node it should be placed before
const firstParagraph = article.querySelector("p");
article.insertBefore(newParagraph, firstParagraph); // moves it to the front

// Modern equivalents (no need to reference the parent for these):
article.prepend(newParagraph); // makes it the first child
article.append(newParagraph);  // makes it the last child again
firstParagraph.before(newParagraph); // places it right before firstParagraph
firstParagraph.after(newParagraph);  // places it right after firstParagraph

// --- Removing elements ---
// footer.remove(); // uncomment to delete the footer entirely

// Older-style removal — you ask the PARENT to remove a specific child
const lastNavLi = nav.querySelector("li:last-child");
// lastNavLi.parentElement.removeChild(lastNavLi); // uncomment to try

// --- Clearing all children ---
// Fast but destroys and rebuilds everything inside — fine for
// small lists, wasteful for huge ones:
// article.innerHTML = "";
// More "manual" alternative — keeps removing the first child until
// none are left:
// while (article.firstChild) {
//   article.removeChild(article.firstChild);
// }

// --- Cloning elements ---
const navItem = document.querySelector(".nav-link").parentElement;
const clone = navItem.cloneNode(true); // true = "deep clone" — includes everything inside it too
clone.querySelector("a").textContent = "New Link";
document.querySelector(".nav-list").appendChild(clone);

// --- Build: addNavItem ---
function addNavItem(text, href) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = href;
  a.textContent = text;
  a.className = "nav-link";
  li.appendChild(a);
  document.querySelector(".nav-list").appendChild(li);
}
addNavItem("Blog", "/blog");
addNavItem("Portfolio", "/portfolio");


/* ================================================================
   LESSON 10: EVENTS & USER INTERACTION
   ================================================================ */


/* ----------------------------------------------------------------
   TASK 10.1 — EVENT LISTENERS + CLICK COUNTER BUILD
   ---------------------------------------------------------------- */

const countDisplay = document.getElementById("count-display");
const incrementBtn = document.getElementById("increment-btn");
const decrementBtn = document.getElementById("decrement-btn");
const resetBtn = document.getElementById("reset-btn");

let count = 0; // our piece of "state" — the single source of truth for the count

function updateCountDisplay() {
  countDisplay.textContent = count;
}

incrementBtn.addEventListener("click", () => {
  count++;
  updateCountDisplay();
});

decrementBtn.addEventListener("click", () => {
  // requirement: count cannot go below 0
  if (count > 0) {
    count--;
  }
  updateCountDisplay();
});

resetBtn.addEventListener("click", () => {
  count = 0;
  updateCountDisplay();
});


/* ----------------------------------------------------------------
   TASK 10.2 — THE EVENT OBJECT + KEYBOARD SHORTCUTS BUILD
   ---------------------------------------------------------------- */

document.addEventListener("click", function (event) {
  // event.target = the SPECIFIC element that was actually clicked
  // event.currentTarget = the element the listener is attached to
  // (here, that's "document" itself, no matter what you clicked)
  console.log("Target:", event.target);
  console.log("Current Target:", event.currentTarget);
  console.log("Type:", event.type);
  console.log("Position:", event.clientX, event.clientY);
});

// Keyboard shortcuts build
document.addEventListener("keydown", function (event) {
  // Ctrl+S -> show "Saved!" and prevent the browser's save dialog
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault(); // stops the browser's native "Save Page" dialog
    alert("Saved!");
  }

  // Escape -> clear all form inputs on the page
  if (event.key === "Escape") {
    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
  }

  // Ctrl+Enter, while focused inside the contact form -> submit it
  if (event.ctrlKey && event.key === "Enter") {
    const form = document.getElementById("contact-form");
    if (form.contains(document.activeElement)) {
      form.requestSubmit(); // triggers the normal "submit" event, same as clicking Submit
    }
  }
});


/* ----------------------------------------------------------------
   TASK 10.3 — EVENT BUBBLING & DELEGATION
   ----------------------------------------------------------------
   BUBBLING: when you click a deeply nested element, the click
   event doesn't just fire there — it "bubbles" upward through
   every ancestor, like ripples spreading outward from where a
   stone hit water.
   ---------------------------------------------------------------- */

document.getElementById("grandparent").addEventListener("click", () => {
  console.log("Grandparent clicked");
});
document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent clicked");
});
document.getElementById("child").addEventListener("click", () => {
  console.log("Child clicked");
});
// Clicking "Child" logs, in this order:
// Child clicked -> Parent clicked -> Grandparent clicked
// (innermost first, then outward)


// DELEGATION: instead of attaching a listener to every single <li>
// (which breaks the moment you add a NEW <li> later, since it never
// got a listener), attach ONE listener to the shared parent <ul>,
// and use event.target to figure out which child was actually clicked.
const delegatedList = document.getElementById("delegated-list");

delegatedList.addEventListener("click", function (event) {
  // event.target.matches(selector) checks if the clicked element
  // itself matches a CSS selector — a clean way to filter clicks
  // without caring exactly what markup structure exists inside.

  if (event.target.matches(".delete-btn")) {
    // clicked the delete (✕) button — remove its parent <li>
    event.target.closest("li").remove();
    return; // stop here so we don't ALSO toggle "completed" below
  }

  if (event.target.matches("li")) {
    // clicked the task text itself — toggle completed styling
    event.target.classList.toggle("completed");
  }
});

// Adding new items dynamically — because the listener above lives
// on the parent <ul>, any NEW <li> we add here automatically works
// with delete/toggle too, with zero extra listeners needed.
const newItemInput = document.getElementById("new-item-input");
const addItemBtn = document.getElementById("add-item-btn");

addItemBtn.addEventListener("click", () => {
  const text = newItemInput.value.trim();
  if (text === "") return; // ignore empty submissions

  const li = document.createElement("li");
  li.className = "item";
  li.textContent = text + " ";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "✕";
  li.appendChild(deleteBtn);

  delegatedList.appendChild(li);
  newItemInput.value = ""; // clear the input for the next task
});


/* ----------------------------------------------------------------
   TASK 10.4 — FORM HANDLING
   ---------------------------------------------------------------- */

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

function showError(input, message) {
  input.classList.add("error");
  // avoid stacking duplicate error messages if the user keeps typing
  let errorEl = input.nextElementSibling;
  if (!errorEl || !errorEl.classList.contains("error-message")) {
    errorEl = document.createElement("span");
    errorEl.className = "error-message";
    input.after(errorEl);
  }
  errorEl.textContent = message;
}

function clearError(input) {
  input.classList.remove("error");
  const errorEl = input.nextElementSibling;
  if (errorEl && errorEl.classList.contains("error-message")) {
    errorEl.remove();
  }
}

// "input" fires on EVERY keystroke — good for instant feedback
nameInput.addEventListener("input", function (event) {
  const value = event.target.value;
  if (value.length < 2) {
    showError(nameInput, "Name must be at least 2 characters");
  } else {
    clearError(nameInput);
  }
});

emailInput.addEventListener("input", function (event) {
  const value = event.target.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    showError(emailInput, "Please enter a valid email");
  } else {
    clearError(emailInput);
  }
});

function isValid(data) {
  return data.name && data.name.length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
}

form.addEventListener("submit", function (event) {
  // Forms reload the whole page by default when submitted — this
  // stops that so we can handle everything with JavaScript instead.
  event.preventDefault();

  // FormData reads every named input inside the form automatically
  const formData = new FormData(form);
  // Object.fromEntries turns FormData's pairs into a plain object:
  // { name: "...", email: "..." }
  const data = Object.fromEntries(formData);
  console.log("Form data:", data);

  if (isValid(data)) {
    alert("Form submitted successfully!");
    form.reset(); // clears all inputs back to their default (empty) state
  } else {
    alert("Please fix the errors before submitting.");
  }
});