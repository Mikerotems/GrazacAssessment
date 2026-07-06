const wordList = ['javascript', 'python', 'react', 'database', 'algorithm', 'compiler', 'function', 'variable', 'browser', 'server'];
const hints = {
    javascript: 'A popular language used to build interactive websites.',
    python: 'A beginner-friendly language often used in automation and data science.',
    react: 'A JavaScript library for building user interfaces.',
    database: 'A structured collection of data that applications use.',
    algorithm: 'A step-by-step set of instructions for solving a problem.',
    compiler: 'A program that translates code into machine-readable instructions.',
    function: 'A reusable block of code that performs a task.',
    variable: 'A named container that stores data.',
    browser: 'The app you use to view websites.',
    server: 'A machine or program that provides resources to clients.',
};

const game = {
    words: wordList,
    currentWord: null,
    score: 0,
    timeLeft: 15,
    timerId: null,
};

const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const scrambledWordEl = document.getElementById('scrambledWord');
const hintBtn = document.getElementById('hintBtn');
const hintTextEl = document.getElementById('hintText');
const guessForm = document.getElementById('guessForm');
const guessInput = document.getElementById('guessInput');
const feedbackEl = document.getElementById('feedback');
const newGameBtn = document.getElementById('newGameBtn');

function startTimer() {
    if (game.timerId) {
        clearInterval(game.timerId);
    }

    game.timeLeft = 15;
    updateTimerDisplay();

    game.timerId = setInterval(() => {
        game.timeLeft -= 1;
        updateTimerDisplay();

        if (game.timeLeft <= 0) {
            clearInterval(game.timerId);
            game.timerId = null;
            feedbackEl.textContent = `Time is up! The correct answer was ${game.currentWord}.`;
            hintTextEl.textContent = '';
            hintTextEl.classList.add('hidden');
            guessInput.disabled = true;
            hintBtn.disabled = true;
            feedbackEl.style.color = '#f87171';
        }
    }, 1000);
}

function updateTimerDisplay() {
    timerEl.textContent = game.timeLeft;
}

function updateScoreDisplay() {
    scoreEl.textContent = game.score;
}

function renderRound() {
    const nextRound = GameLogic.getNextRound(game.words, game.currentWord);

    if (!nextRound.word) {
        scrambledWordEl.textContent = 'No valid words';
        feedbackEl.textContent = 'No valid words are available in the list.';
        hintTextEl.textContent = '';
        hintTextEl.classList.add('hidden');
        guessInput.disabled = true;
        hintBtn.disabled = true;
        return;
    }

    game.currentWord = nextRound.word;
    scrambledWordEl.textContent = nextRound.scrambled;
    guessInput.value = '';
    guessInput.disabled = false;
    hintBtn.disabled = false;
    feedbackEl.textContent = 'Enter a guess to begin.';
    feedbackEl.style.color = '#f8fafc';
    hintTextEl.textContent = '';
    hintTextEl.classList.add('hidden');
    guessInput.focus();
}

function startNewGame() {
    game.score = 0;
    updateScoreDisplay();
    renderRound();
    startTimer();
}

hintBtn.addEventListener('click', () => {
    if (!game.currentWord) {
        return;
    }

    const clue = hints[game.currentWord];
    if (clue) {
        hintTextEl.textContent = clue;
        hintTextEl.classList.remove('hidden');
    }
});

guessForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const rawGuess = guessInput.value;

    if (!GameLogic.validateGuess(rawGuess)) {
        feedbackEl.textContent = 'Please enter a non-empty guess.';
        feedbackEl.style.color = '#fca5a5';
        return;
    }

    if (GameLogic.isCorrectGuess(rawGuess, game.currentWord)) {
        game.score += 1;
        updateScoreDisplay();
        feedbackEl.textContent = 'Correct! Loading the next word...';
        feedbackEl.style.color = '#4ade80';
        guessInput.disabled = true;
        hintBtn.disabled = true;

        setTimeout(() => {
            renderRound();
            startTimer();
        }, 800);
    } else {
        feedbackEl.textContent = 'Not quite. Try again!';
        feedbackEl.style.color = '#fbbf24';
    }
});

newGameBtn.addEventListener('click', () => {
    startNewGame();
});

updateScoreDisplay();
startNewGame();
