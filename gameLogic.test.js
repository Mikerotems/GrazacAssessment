const test = require('node:test');
const assert = require('node:assert/strict');
const { validateGuess, scrambleWord, isCorrectGuess, pickWord, getNextRound, validateWordList } = require('./gameLogic');

test('validateGuess rejects empty strings', () => {
    assert.equal(validateGuess('   '), false);
    assert.equal(validateGuess('python'), true);
});

test('scrambleWord returns a different order for a multi-letter word', () => {
    const result = scrambleWord('javascript');
    assert.notEqual(result, 'javascript');
    assert.equal(result.length, 'javascript'.length);
});

test('isCorrectGuess compares normalized values', () => {
    assert.equal(isCorrectGuess('Python', 'python'), true);
    assert.equal(isCorrectGuess('java', 'javascript'), false);
});

test('pickWord returns null when the word list has no valid entries', () => {
    assert.equal(pickWord([]), null);
    assert.equal(pickWord(['', '   ', 7]), null);
});

test('getNextRound handles empty lists safely', () => {
    const result = getNextRound([], 'javascript');
    assert.equal(result.word, null);
    assert.equal(result.scrambled, '');
});

test('validateWordList filters invalid values', () => {
    const result = validateWordList(['python', '', 4, 'java']);
    assert.deepEqual(result, ['python', 'java']);
});
