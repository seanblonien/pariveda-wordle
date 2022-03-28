import {
  useGlobalContext,
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
