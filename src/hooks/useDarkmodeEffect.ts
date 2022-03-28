import {useEffect} from 'react';
import {useGlobalContext} from '../context/GlobalContext';

export const useDarkmodeEffect = () => {
  const {
    theming: {isDarkMode, isHighContrastMode},
  } = useGlobalContext();
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
};
