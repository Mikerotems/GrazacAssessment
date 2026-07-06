(function (root, factory) {
    const api = factory();

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    }

    root.GameLogic = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    function normalizeWord(value) {
        if (typeof value !== 'string') {
            return '';
        }

        return value.trim().toLowerCase();
    }

    function validateWordList(words) {
        if (!Array.isArray(words)) {
            return [];
        }

        return words.filter((word) => typeof word === 'string' && word.trim().length > 0);
    }

    function scrambleWord(word) {
        const normalized = normalizeWord(word);

        if (!normalized || normalized.length < 2) {
            return normalized;
        }

        let scrambled = normalized.split('');

        while (scrambled.join('') === normalized) {
            scrambled = scrambled
                .slice()
                .sort(() => Math.random() - 0.5);
        }

        return scrambled.join('');
    }

    function pickWord(words) {
        const validWords = validateWordList(words);

        if (validWords.length === 0) {
            return null;
        }

        const index = Math.floor(Math.random() * validWords.length);
        return validWords[index];
    }

    function getNextRound(words, currentWord) {
        const validWords = validateWordList(words);

        if (validWords.length === 0) {
            return { word: null, scrambled: '' };
        }

        const availableWords = validWords.filter(
            (word) => normalizeWord(word) !== normalizeWord(currentWord)
        );

        const nextWord =
            availableWords.length > 0
                ? availableWords[Math.floor(Math.random() * availableWords.length)]
                : validWords[Math.floor(Math.random() * validWords.length)];

        return {
            word: nextWord,
            scrambled: scrambleWord(nextWord),
        };
    }

    function validateGuess(input) {
        return typeof input === 'string' && input.trim().length > 0;
    }

    function isCorrectGuess(guess, targetWord) {
        return normalizeWord(guess) === normalizeWord(targetWord);
    }

    return {
        normalizeWord,
        validateWordList,
        scrambleWord,
        pickWord,
        getNextRound,
        validateGuess,
        isCorrectGuess,
    };
});
