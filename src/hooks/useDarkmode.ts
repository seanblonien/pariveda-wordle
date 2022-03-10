import {useCallback, useEffect, useState} from 'react';
import {getStoredIsHighContrastMode, setStoredIsHighContrastMode} from '../lib/localStorage';

export const useDarkmode = () => {

  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;


  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
        ? true
        : false
  );

  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  );


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [isDarkMode, isHighContrastMode]);

  const handleDarkMode = useCallback((isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [setIsDarkMode]);

  const handleHighContrastMode = useCallback((isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast)
    setStoredIsHighContrastMode(isHighContrast)
  }, [setIsHighContrastMode]);

  return {isDarkMode, isHighContrastMode, handleDarkMode, handleHighContrastMode};
}
