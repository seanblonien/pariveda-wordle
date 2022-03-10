import GraphemeSplitter from 'grapheme-splitter';
import {useCallback, useEffect, useState} from 'react';
import {MAX_CHALLENGES, MAX_WORD_LENGTH} from '../constants/settings';
import {CORRECT_WORD_MESSAGE} from '../constants/strings';
import {useAlert} from '../context/AlertContext';
import {loadGameStateFromLocalStorage, saveGameStateToLocalStorage} from '../lib/localStorage';
import {solution, unicodeLength} from '../lib/words';

export const useGuesses = (
  isGameWon: boolean,
  setIsGameWon: (val: boolean) => void,
  setIsGameLost: (val: boolean) => void,
) => {
  const {showError} = useAlert();
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage();
    if (loaded?.solution !== solution) {
      return [];
    }
    const gameWasWon = loaded.guesses.includes(solution);
    if (gameWasWon) {
      setIsGameWon(true);
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true);
      showError(CORRECT_WORD_MESSAGE(solution), {
        persist: true,
      });
    }
    return loaded.guesses;
  });

  useEffect(() => {
    saveGameStateToLocalStorage({guesses, solution});
  }, [guesses]);

  const addGuess = useCallback(() => {
    setGuesses(prev => [...prev, currentGuess]);
    setCurrentGuess('');
  }, [setGuesses, setCurrentGuess, currentGuess]);

  const onChar = useCallback(
    (value: string) => {
      if (
        unicodeLength(`${currentGuess}${value}`) <= MAX_WORD_LENGTH &&
        guesses.length < MAX_CHALLENGES &&
        !isGameWon
      ) {
        setCurrentGuess(`${currentGuess}${value}`);
      }
    },
    [currentGuess, guesses, isGameWon],
  );

  const onDelete = useCallback(() => {
    setCurrentGuess(prev => new GraphemeSplitter().splitGraphemes(prev).slice(0, -1).join(''));
  }, [setCurrentGuess]);

  return {guesses, addGuess, currentGuess, setCurrentGuess, onChar, onDelete};
};
