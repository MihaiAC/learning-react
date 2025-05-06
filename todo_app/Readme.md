# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
- [The challenge](#the-challenge)
- [Built with](#built-with)
- [What I learned](#what-i-learned)
- [Continued development](#continued-development)
- [Useful resources](#useful-resources)

### Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Built with

Vite + Tailwind + React + shadcn/ui + dnd-kit

### What I learned

- Implementing drag and drop for a list of items with dnd-kit;
- Importing SVGs as components with vite-plugin-svgr;
- Using local storage to store theme settings and todo items;
- Selecting the background image based on screen size and current theme;
- Making dark mode switching actually switch the background image (`@custom-variant dark (&:where(.dark, .dark *));`);

### Notes

Still not happy with stretching on wide screens. In practice, I would like to have a separate background image for them.

### Useful resources

- [How to make dark mode easier in Tailwind v4, without spamming dark:](https://www.reddit.com/r/tailwindcss/comments/1jvi5ip/how_to_make_dark_mode_easier_in_tailwind_v4/)
