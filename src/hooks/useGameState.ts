import {useCallback, useEffect} from 'react';
import {GAME_LOST_INFO_DELAY, MAX_WORD_LENGTH, REVEAL_TIME_MS} from '../constants/settings';
import {WIN_MESSAGES} from '../constants/strings';
import {useAlert} from '../context/AlertContext';
import {
  useGlobalContext,
  useSetIsGameWon,
  useSetIsGameLost,
  useSetIsRevealing,
  useSetModals,
} from '../context/GlobalContext';

export const useGameState = () => {
  const {showSuccess} = useAlert();
  const {
    game: {isGameLost, isGameWon, isRevealing},
  } = useGlobalContext();
  const setIsGameWon = useSetIsGameWon();
  const setIsGameLost = useSetIsGameLost();
  const setIsRevealing = useSetIsRevealing();
  const {toggleStatsModal} = useSetModals();

  useEffect(() => {
    if (isGameWon) {
      const winMessage = WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)];
      const delayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH;

      showSuccess(winMessage, {
        delayMs,
        onClose: toggleStatsModal,
      });
    }

    if (isGameLost) {
      setTimeout(toggleStatsModal, GAME_LOST_INFO_DELAY);
    }
  }, [isGameWon, isGameLost, showSuccess]);

  const toggleRevealing = useCallback(() => {
    setIsRevealing(true);
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false);
    }, REVEAL_TIME_MS * MAX_WORD_LENGTH);
  }, [setIsRevealing]);

  return {isGameWon, isGameLost, isRevealing, setIsGameLost, setIsGameWon, toggleRevealing};
};
