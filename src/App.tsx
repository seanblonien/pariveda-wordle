import {AlertContainer} from './components/alerts/AlertContainer';
import {Grid} from './components/grid/Grid';
import {Keyboard} from './components/keyboard/Keyboard';
import {ModalContainer} from './components/modals/ModalContainer';
import {Navbar} from './components/navbar/Navbar';
import {MAX_WORD_LENGTH, MAX_CHALLENGES, REVEAL_TIME_MS} from './constants/settings';
import {NOT_ENOUGH_LETTERS_MESSAGE, WORD_NOT_FOUND_MESSAGE, CORRECT_WORD_MESSAGE} from './constants/strings';
import {useAddStatsCompleteGame, useShowError} from './context/GlobalContext';
import {useDarkmodeEffect} from './hooks/useDarkmodeEffect';
import {useDifficulty} from './hooks/useDifficulty';
import {useGameState} from './hooks/useGameState';
import {useGuesses} from './hooks/useGuesses';
import {isWordInWordList, solution, findFirstUnusedReveal, unicodeLength} from './lib/words';
import './App.css';

export const App: React.FC = () => {
  useDarkmodeEffect();
  const showError = useShowError();
  const {isGameWon, setIsGameWon, isGameLost, setIsGameLost, isRevealing, toggleRevealing} = useGameState();
  const {guesses, addGuess, currentGuess, onChar, onDelete} = useGuesses(isGameWon, setIsGameWon, setIsGameLost);
  const statsCompleteGame = useAddStatsCompleteGame();
  const {isHardMode, currentRowClass, doJiggle} = useDifficulty();

  const isGuessValidLength = unicodeLength(currentGuess) === MAX_WORD_LENGTH;

  const onEnter = () => {
    if (isGameWon || isGameLost) return;

    if (!isGuessValidLength) {
      doJiggle(NOT_ENOUGH_LETTERS_MESSAGE);
      return;
    }

    if (!isWordInWordList(currentGuess)) {
      doJiggle(WORD_NOT_FOUND_MESSAGE);
      return;
    }

    // enforce hard mode - all guesses must contain all previously revealed letters
    if (isHardMode) {
      const firstMissingReveal = findFirstUnusedReveal(currentGuess, guesses);
      if (firstMissingReveal) {
        doJiggle(firstMissingReveal);
        return;
      }
    }

    toggleRevealing();

    const isWinningWord = solution === currentGuess;
    const isAtMaxGuesses = guesses.length === MAX_CHALLENGES;
    const isOnLastGuess = guesses.length === MAX_CHALLENGES - 1;

    if (isGuessValidLength && !isAtMaxGuesses && !isGameWon) {
      addGuess();

      if (isWinningWord) {
        statsCompleteGame(guesses.length);
        setIsGameWon(true);
        return;
      }

      if (isOnLastGuess) {
        statsCompleteGame(guesses.length + 1);
        setIsGameLost(true);
        showError(CORRECT_WORD_MESSAGE(solution), {
          persist: true,
          delayMs: REVEAL_TIME_MS * MAX_WORD_LENGTH + 1,
        });
      }
    }
  };

  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <div className='pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow'>
        <div className='pb-6 grow'>
          <Grid
            guesses={guesses}
            currentGuess={currentGuess}
            isRevealing={isRevealing}
            currentRowClassName={currentRowClass}
          />
        </div>
        <Keyboard onChar={onChar} onDelete={onDelete} onEnter={onEnter} guesses={guesses} isRevealing={isRevealing} />
        <ModalContainer />
        <AlertContainer />
      </div>
    </div>
  );
};
