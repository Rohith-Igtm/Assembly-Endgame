# Assembly: Endgame

A React word-guessing game where the player must guess the hidden word before too many programming languages are lost to Assembly.

## About the Project

Assembly: Endgame is a small React game inspired by classic word-guessing games. The player guesses letters using an on-screen keyboard. Correct guesses reveal letters in the hidden word, while incorrect guesses remove programming languages one by one.

The goal is to guess the full word before the game is lost.

## Features

- Interactive alphabet keyboard
- Tracks guessed letters
- Shows correct and wrong guesses with different button colors
- Displays hidden word letters as the player guesses correctly
- Counts incorrect guesses
- Marks programming languages as "lost" after wrong guesses
- Shows win/loss game status
- New game button after the game ends
- Random word selection
- Farewell message when a language is lost
- Confetti effect when the player wins

## Built With

- React
- JavaScript
- CSS
- clsx
- react-confetti-boom

## Project Structure

```txt
src/
├── App.jsx
├── index.css
├── language.js
├── utils.js
└── main.jsx
