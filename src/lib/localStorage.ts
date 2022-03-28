import {GameStats} from '../types';

const gameStateKey = 'gameState';
const highContrastKey = 'highContrast';
const gameStatKey = 'gameStats';
const darkModeKey = 'theme';
const difficultyKey = 'gameMode';

type StoredGameState = {
  guesses: string[];
  solution: string;
};

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState));
};

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey);
  return state ? (JSON.parse(state) as StoredGameState) : null;
};

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats));
};

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey);
  return stats ? (JSON.parse(stats) as GameStats) : null;
};

export const getInitialHighContrast = () => {
  const highContrast = localStorage.getItem(highContrastKey);
  return highContrast === '1';
};

export const setStoredIsHighContrastMode = (isHighContrast: boolean) => {
  if (isHighContrast) {
    localStorage.setItem(highContrastKey, '1');
  } else {
    localStorage.removeItem(highContrastKey);
  }
};

const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
export const getInitialDarkMode = () => {
  return localStorage.getItem(darkModeKey)
    ? localStorage.getItem(darkModeKey) === 'dark'
    : prefersDarkMode
      ? true
      : false;
};

export const setStoredDarkMode = (isDarkMode: boolean) => {
  localStorage.setItem(darkModeKey, isDarkMode ? 'dark' : 'light');
};

export const getStoredHardMode = () => {
  return localStorage.getItem(difficultyKey) ? localStorage.getItem(difficultyKey) === 'hard' : false;
};
export const setStoredHardMode = (isHardMode: boolean) => {
  localStorage.setItem(difficultyKey, isHardMode ? 'hard' : 'normal');
};
