import {useCallback, useEffect, useState} from 'react';
import {GAME_LOST_INFO_DELAY, MAX_WORD_LENGTH, REVEAL_TIME_MS} from '../constants/settings';
import {WIN_MESSAGES} from '../constants/strings';
import {useAlert} from '../context/AlertContext';

export const useGameState = (setIsStatsModalOpen: (va: boolean) => void) => {
  const {showSuccess} = useAlert();
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    if (isGameWon) {
      const winMessage = WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)];
      const delayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH;

      showSuccess(winMessage, {
        delayMs,
        onClose: () => setIsStatsModalOpen(true),
      });
    }

    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true);
      }, GAME_LOST_INFO_DELAY);
    }
  }, [isGameWon, isGameLost, showSuccess, setIsStatsModalOpen]);

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
