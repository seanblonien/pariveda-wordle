import {useState} from 'react';
import {HARD_MODE_ALERT_MESSAGE} from '../constants/strings';
import {useAlert} from '../context/AlertContext';
import {
  useClearCurrentRowClass,
  useGlobalContext,
  useSetCurrentRowClass,
  useSetHardMode,
  useToggleCurrentRowClassJiggle,
} from '../context/GlobalContext';

export const useDifficulty = (hasGuesses: boolean) => {
  const {
    game: {currentRowClass},
    settings: {isHardMode},
  } = useGlobalContext();
  const handleHardMode = useSetHardMode();
  const doJiggle = useToggleCurrentRowClassJiggle();

  return {isHardMode, currentRowClass, handleHardMode, doJiggle};
};
