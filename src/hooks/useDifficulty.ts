import {
  useGlobalContext,
  useToggleHardMode,
  useToggleCurrentRowClassJiggle,
} from '../context/GlobalContext';

export const useDifficulty = () => {
  const {
    game: {currentRowClass},
    settings: {isHardMode},
  } = useGlobalContext();
  const handleHardMode = useToggleHardMode();
  const doJiggle = useToggleCurrentRowClassJiggle();

  return {isHardMode, currentRowClass, handleHardMode, doJiggle};
};
