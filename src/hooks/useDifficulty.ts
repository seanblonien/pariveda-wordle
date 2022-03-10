import {useState} from 'react';
import {HARD_MODE_ALERT_MESSAGE} from '../constants/strings';
import {useAlert} from '../context/AlertContext';

export const useDifficulty = (hasGuesses: boolean) => {
  const {showError} = useAlert();
  const [isHardMode, setIsHardMode] = useState(
    localStorage.getItem('gameMode') ? localStorage.getItem('gameMode') === 'hard' : false,
  );

  const [currentRowClass, setCurrentRowClass] = useState('');

  const handleHardMode = (isHard: boolean) => {
    if (hasGuesses || localStorage.getItem('gameMode') === 'hard') {
      setIsHardMode(isHard);
      localStorage.setItem('gameMode', isHard ? 'hard' : 'normal');
    } else {
      showError(HARD_MODE_ALERT_MESSAGE);
    }
  };

  const clearCurrentRowClass = () => {
    setCurrentRowClass('');
  };

  const doJiggle = (msg: string) => {
    setCurrentRowClass('jiggle');
    showError(msg, {
      onClose: clearCurrentRowClass,
    });
  };

  return {isHardMode, currentRowClass, handleHardMode, doJiggle};
};
