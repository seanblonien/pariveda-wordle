import {WORDS} from '../constants/wordlist';
import {VALID_GUESSES} from '../constants/validGuesses';
import {WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE} from '../constants/strings';
import {getGuessStatuses} from './statuses';
import {default as GraphemeSplitter} from 'grapheme-splitter';

export const isWordInWordList = (word: string) => {
  return WORDS.includes(localeAwareLowerCase(word)) || VALID_GUESSES.includes(localeAwareLowerCase(word));
};

export const isWinningWord = (word: string) => {
  return solution === word;
};

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  if (guesses.length === 0) {
    return false;
  }

  const lettersLeftArray = new Array<string>();
  const guess = guesses[guesses.length - 1];
  const statuses = getGuessStatuses(guess);

  for (let i = 0; i < guess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present') {
      lettersLeftArray.push(guess[i]);
    }
    if (statuses[i] === 'correct' && word[i] !== guess[i]) {
      return WRONG_SPOT_MESSAGE(guess[i], i + 1);
    }
  }

  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n;
  for (const letter of word) {
    n = lettersLeftArray.indexOf(letter);
    if (n !== -1) {
      lettersLeftArray.splice(n, 1);
    }
  }

  if (lettersLeftArray.length > 0) {
    return NOT_CONTAINED_MESSAGE(lettersLeftArray[0]);
  }
  return false;
};

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word);
};

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length;
};

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase();
};

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase();
};

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const baseTime = new Date('January 1, 2022 00:00:00').valueOf();
  const nowTime = Date.now();
  const millisecondsInADay = 86400000;
  const timeElpasedInMilliseconds = nowTime - baseTime;
  const numberOfTheDay = Math.floor(timeElpasedInMilliseconds / millisecondsInADay);
  const wordOfTheDay = WORDS[numberOfTheDay % WORDS.length];
  
  const solution = localeAwareUpperCase(wordOfTheDay);

  console.log(`Solution #${numberOfTheDay}: ${solution}`);

  const nextday = (numberOfTheDay + 1) * millisecondsInADay + baseTime;
  return {
    solution,
    solutionIndex: numberOfTheDay,
    tomorrow: nextday,
  };
};

export const {solution, solutionIndex, tomorrow} = getWordOfDay();
