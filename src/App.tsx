import {Grid} from './components/grid/Grid';
import {Keyboard} from './components/keyboard/Keyboard';
import {ModalContainer} from './components/modals/ModalContainer';
import {Navbar} from './components/navbar/Navbar';
import {MAX_WORD_LENGTH, MAX_CHALLENGES, REVEAL_TIME_MS} from './constants/settings';
import {NOT_ENOUGH_LETTERS_MESSAGE, WORD_NOT_FOUND_MESSAGE, CORRECT_WORD_MESSAGE} from './constants/strings';
import {useAlert} from './context/AlertContext';
import {useDifficulty} from './hooks/useDifficulty';
import {useGameState} from './hooks/useGameState';
import {useGuesses} from './hooks/useGuesses';
import {isWordInWordList, solution, findFirstUnusedReveal, unicodeLength} from './lib/words';
import './App.css';
import {AlertContainer} from './components/alerts/AlertContainer';
import {useModal} from './hooks/useModal';
import {useStats} from './hooks/useStats';

export const App: React.FC = () => {
  const {showError} = useAlert();
  const {setIsInfoModalOpen, setIsSettingsModalOpen, setIsStatsModalOpen} = useModal();
  const {isGameWon, setIsGameWon, isGameLost, setIsGameLost, isRevealing, toggleRevealing} = useGameState();
  const {guesses, addGuess, currentGuess, onChar, onDelete} = useGuesses(isGameWon, setIsGameWon, setIsGameLost);
  const {statsCompleteGame} = useStats();
  const {isHardMode, currentRowClass, doJiggle} = useDifficulty(guesses.length === 0);

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
    const hasGuessedMaxChallenges = guesses.length === MAX_CHALLENGES - 1;

    if (isGuessValidLength && !hasGuessedMaxChallenges && !isGameWon) {
      addGuess();

      if (isWinningWord) {
        statsCompleteGame(guesses.length);
        setIsGameWon(true);
        return;
      }

      if (hasGuessedMaxChallenges) {
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
