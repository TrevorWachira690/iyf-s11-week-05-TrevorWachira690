# Week 05: DOM Manipulation

## Author
- **Name:** Trevor Wachira
- **GitHub:** [@TrevorWachira690](https://github.com/TrevorWachira690)
- **Date:** 07/19/2026

## Project Description
I built a DOM practice file that contains JavaScript code in a separate file called dom.js, and a mini project which was an interactive To-Do List application written in JavaScript. This was built to teach myself how JavaScript can select, read, and change elements on a web page, and how to make a page respond to user actions like clicking, typing, and submitting a form.

## Technologies Used
- HTML
- CSS
- JavaScript
- VSCode
- Git
- GitHub

## Features
- **dom-practice/dom.html** - This is the file which runs in the browser and contains JavaScript code from dom.js. It covers selecting elements, traversing the DOM, modifying content/attributes/styles, and adding or removing elements.
- **dom-practice/dom.js** - This is the JS file which contains practice code for Lesson 9 and Lesson 10, including event listeners, the event object, event bubbling, event delegation, and form handling. It runs in the browser's console.
- **todo-app/index.html** - This is the file which runs in the browser for the mini project, and links to app.js and styles.css.
- **todo-app/app.js** - This is the JavaScript mini project that manages a to-do list: adding tasks, marking them complete, deleting them, filtering by status, and editing a task by double-clicking it.
- **todo-app/styles.css** - This contains the styling for the To-Do List app.

## How to Run
1. Clone this repository
2. Open `dom-practice/dom.html` in your browser to see the DOM practice exercises
3. Open the console to view the logged output
4. Open `todo-app/index.html` in your browser to use the To-Do List app

**Note:** unlike plain JavaScript exercises, this week's code reads and changes actual page elements (the DOM), so it needs a real browser to run in — it cannot be run directly with `node dom.js` the way a script with no page to work on could.

## Lessons Learned
I learnt how to select elements using methods like `getElementById`, `querySelector`, and `querySelectorAll`, how to move between elements using parent/child/sibling relationships, and how to safely change text, attributes, and styles. I also learnt how events work, what event bubbling is, and how to use event delegation so that one listener on a parent element can handle clicks on many child elements, even ones added later.

## Challenges Faced
1. **File Structure** - Initially I mixed practice code and the mini project together, but I separated them into a `dom-practice/` folder for exercises and a `todo-app/` folder for the actual deliverable, matching how the course expects the To-Do List app to load its logic from its own separate app.js file.
2. **Event Delegation** - Understanding why one listener on the parent list works for tasks that don't exist yet took extra practice, since it behaves differently from attaching a listener to each item directly.
