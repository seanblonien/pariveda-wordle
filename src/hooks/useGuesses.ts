import {useEffect, useState} from 'react';
import {MAX_CHALLENGES} from '../constants/settings';
import {CORRECT_WORD_MESSAGE} from '../constants/strings';
import {useAlert} from '../context/AlertContext';
import {loadGameStateFromLocalStorage, saveGameStateToLocalStorage} from '../lib/localStorage';
import {solution} from '../lib/words';

export const useGuesses = (setIsGameWon: (val: boolean) => void, setIsGameLost: (val: boolean) => void) => {
  const {showError} = useAlert();
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true)
      showError(CORRECT_WORD_MESSAGE(solution), {
        persist: true,
      })
    }
    return loaded.guesses
  });


  useEffect(() => {
    saveGameStateToLocalStorage({guesses, solution})
  }, [guesses]);

  return {guesses, setGuesses, currentGuess, setCurrentGuess}
}
