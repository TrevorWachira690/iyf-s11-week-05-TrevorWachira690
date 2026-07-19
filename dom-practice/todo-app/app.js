/* ================================================================
   TO-DO LIST APP
   ================================================================
   Big-picture design: we keep ONE array called "todos" as the
   single source of truth. Every time it changes (add, toggle,
   delete), we call renderTodos() to rebuild the visible list from
   scratch, based on that array. This is a really common pattern:
   STATE (the data) drives the UI, instead of manually editing
   little bits of HTML by hand and hoping they stay in sync.
   ================================================================ */

// --- DOM Elements (grab everything once, up front) ---
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// --- State ---
let todos = []; // each todo: { id, text, completed }
let currentFilter = "all"; // "all" | "active" | "completed"
let nextId = 1; // simple incrementing id generator

/* ----------------------------------------------------------------
   createTodoElement(todo)
   Builds the actual <li> DOM element for ONE todo object.
   Keeping this separate from renderTodos() keeps that function
   readable — "build one item" and "build the whole list" are two
   different jobs.
   ---------------------------------------------------------------- */
function createTodoElement(todo) {
  const li = document.createElement("li");
  li.className = "todo-item" + (todo.completed ? " completed" : "");
  // Storing the id on the element itself (as a data attribute) means
  // that later, when we get a click on this <li>, we can read
  // event.target.closest(".todo-item").dataset.id to know WHICH
  // todo it corresponds to — no need to search by array position.
  li.dataset.id = todo.id;

  const checkbox = document.createElement("span");
  checkbox.className = "checkbox";
  checkbox.textContent = todo.completed ? "✓" : "";

  const text = document.createElement("span");
  text.className = "todo-text";
  text.textContent = todo.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "✕";
  deleteBtn.type = "button"; // prevents it from accidentally acting like a submit button

  li.append(checkbox, text, deleteBtn);
  return li;
}

/* ----------------------------------------------------------------
   renderTodos()
   Clears the <ul> and rebuilds it based on "todos" + "currentFilter".
   This is the ONLY function that touches todoList's contents
   directly — every other function just changes "todos" and then
   calls this to reflect it visually.
   ---------------------------------------------------------------- */
function renderTodos() {
  todoList.innerHTML = ""; // clear everything, we're rebuilding from scratch

  // Narrow "todos" down to whichever ones match the active filter
  const visibleTodos = todos.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true; // "all"
  });

  if (visibleTodos.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent =
      currentFilter === "all" ? "No tasks yet — add one above!" : `No ${currentFilter} tasks.`;
    todoList.appendChild(empty);
  } else {
    visibleTodos.forEach((todo) => {
      todoList.appendChild(createTodoElement(todo));
    });
  }

  updateStats();
}

/* ----------------------------------------------------------------
   addTodo(text)
   ---------------------------------------------------------------- */
function addTodo(text) {
  todos.push({
    id: nextId++, // use current value, THEN increment (postfix ++)
    text,
    completed: false,
  });
  renderTodos();
}

/* ----------------------------------------------------------------
   toggleTodo(id)
   ---------------------------------------------------------------- */
function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed; // flip true<->false
  }
  renderTodos();
}

/* ----------------------------------------------------------------
   deleteTodo(id)
   ---------------------------------------------------------------- */
function deleteTodo(id) {
  // .filter() keeps everything EXCEPT the matching id — an easy
  // way to "remove" an item from an array without mutating it
  // directly with splice().
  todos = todos.filter((t) => t.id !== id);
  renderTodos();
}

/* ----------------------------------------------------------------
   updateStats()
   ---------------------------------------------------------------- */
function updateStats() {
  const remaining = todos.filter((t) => !t.completed).length;
  itemsLeft.textContent = `${remaining} item${remaining === 1 ? "" : "s"} left`;
}

/* ----------------------------------------------------------------
   filterTodos(filter)
   ---------------------------------------------------------------- */
function filterTodos(filter) {
  currentFilter = filter;

  // Update which filter button LOOKS active
  filters.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });

  renderTodos();
}

/* ----------------------------------------------------------------
   editTodo(id, newText) — bonus feature support
   ---------------------------------------------------------------- */
function editTodo(id, newText) {
  const trimmed = newText.trim();
  if (trimmed === "") {
    // treat clearing the text out entirely as a delete, not a blank task
    deleteTodo(id);
    return;
  }
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.text = trimmed;
  }
  renderTodos();
}

/* ================================================================
   EVENT LISTENERS
   ================================================================ */

// --- Adding a task ---
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const text = input.value.trim();
  if (text === "") return; // "empty tasks not allowed"

  addTodo(text);
  input.value = ""; // "input clears after adding"
  input.focus(); // nice touch: cursor stays ready for the next task
});

// --- Handling clicks on tasks (event delegation) ---
// ONE listener on the parent <ul> handles every current AND future
// <li>, instead of attaching a listener to each task individually.
todoList.addEventListener("click", function (event) {
  const li = event.target.closest(".todo-item");
  if (!li) return; // click landed on the empty-state message, ignore it

  const id = Number(li.dataset.id); // dataset values are always strings, convert back to a number

  if (event.target.classList.contains("delete-btn")) {
    deleteTodo(id);
  } else if (!event.target.classList.contains("todo-edit-input")) {
    // clicking anywhere else on the row (not the delete button, and
    // not while mid-edit) toggles completed
    toggleTodo(id);
  }
});

// --- Bonus: double-click to edit ---
todoList.addEventListener("dblclick", function (event) {
  const textSpan = event.target.closest(".todo-text");
  if (!textSpan) return;

  const li = textSpan.closest(".todo-item");
  const id = Number(li.dataset.id);
  const currentText = textSpan.textContent;

  // Swap the <span> out for an editable <input>, pre-filled with
  // the current text
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "todo-edit-input";
  editInput.value = currentText;

  li.replaceChild(editInput, textSpan);
  editInput.focus();
  editInput.select(); // highlights the existing text so typing replaces it instantly

  function finishEdit() {
    editTodo(id, editInput.value);
  }

  editInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      finishEdit(); // Enter -> save
    } else if (e.key === "Escape") {
      renderTodos(); // Escape -> cancel, just re-render from the untouched state
    }
  });

  // Clicking away from the input also saves it (a common UX pattern)
  editInput.addEventListener("blur", finishEdit);
});

// --- Filters ---
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterTodos(btn.dataset.filter);
  });
});

// --- Clear completed ---
clearCompletedBtn.addEventListener("click", () => {
  todos = todos.filter((t) => !t.completed);
  renderTodos();
});

// --- Initialize ---
renderTodos();
