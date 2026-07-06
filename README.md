# Grazac Assessment - Word Scramble Game

This project is a simple browser-based word scramble game built with HTML, CSS, and JavaScript. The goal is to unscramble a random word before the countdown timer reaches zero.

## How to Play

1. Open the game in your browser by launching [index.html](index.html) or using a live server.
2. Read the scrambled word shown on the screen.
3. Type your guess into the input field and press the Submit Guess button.
4. Each correct answer earns 1 point.
5. You have 15 seconds to solve each word.
6. If you get stuck, click Show Hint to reveal a clue.
7. Click Start New Game to begin another round.

## Game Rules

- The game displays one scrambled word at a time.
- The timer starts at 15 seconds for each round.
- A correct guess increases your score.
- If time runs out, the round ends and the correct answer is revealed.
- The game automatically loads a new word after a correct answer.

## Project Files

- [index.html](index.html) - Main game structure
- [style.css](style.css) - Visual styling
- [script.js](script.js) - Game interaction and UI logic
- [gameLogic.js](gameLogic.js) - Word scrambling and guessing logic
- [gameLogic.test.js](gameLogic.test.js) - Unit tests for the game logic

## Optional Enhancements

The current version is intentionally simple, but the project could be extended with:

- Difficulty levels such as easy, medium, and hard
- Sound effects for correct and incorrect guesses
- A high-score leaderboard using local storage or a backend
- Multiple word categories such as programming, animals, or countries
- A pause button and restart countdown behavior
- A hint limit to make the game more challenging

## Running the Game

You can run the game locally by opening [index.html](index.html) in a browser.

If you prefer a smoother development experience, use a live server extension in your editor and open the project folder from there.

## Testing

The game logic includes tests in [gameLogic.test.js](gameLogic.test.js). You can run them in a Node.js environment with a test runner such as Jest or Vitest if configured in your setup.
