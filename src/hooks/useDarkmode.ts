import {useEffect} from 'react';
import {useGlobalContext, useSetDarkMode, useSetHighContrastMode} from '../context/GlobalContext';

export const useDarkmode = () => {
  const {
    theming: {isDarkMode, isHighContrastMode},
  } = useGlobalContext();
  const setHighContrastMode = useSetHighContrastMode();
  const setIsDarkMode = useSetDarkMode();
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [isDarkMode, isHighContrastMode]);

  const handleDarkMode = setIsDarkMode;
  const handleHighContrastMode = setHighContrastMode;

  return {isDarkMode, isHighContrastMode, handleDarkMode, handleHighContrastMode};
};
