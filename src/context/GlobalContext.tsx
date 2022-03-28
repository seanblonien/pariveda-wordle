import {useCallback, useState} from 'react';
import {createContainer} from 'react-tracked';
import {ALERT_TIME_MS} from '../constants/settings';
import {HARD_MODE_ALERT_MESSAGE} from '../constants/strings';
import {createUseTrackedUpdateByKey} from '../lib/helpers';
import {
  getInitialDarkMode,
  getStoredHardMode,
  getInitialHighContrast,
  setStoredDarkMode,
  setStoredHardMode,
  setStoredIsHighContrastMode,
} from '../lib/localStorage';
import {addStatsForCompletedGame, loadStats} from '../lib/stats';
import {AlertOptions, AlertStatus, GameStats} from '../types';

type GlobalContextType = {
  theming: {
    isDarkMode: boolean;
    isHighContrastMode: boolean;
  };
  settings: {
    isHardMode: boolean;
  };
  game: {
    currentRowClass: 'jiggle' | '';
    guesses: string[];
    stats: GameStats;
    isGameWon: boolean;
    isGameLost: boolean;
    isRevealing: boolean;
  };
  modals: {
    isInfoModalOpen: boolean;
    isStatsModalOpen: boolean;
    isSettingsModalOpen: boolean;
  };
  alert: {
    status: AlertStatus;
    message: string | null;
    isVisible: boolean;
  };
};

const initialState: GlobalContextType = {
  theming: {
    isDarkMode: getInitialDarkMode(),
    isHighContrastMode: getInitialHighContrast(),
  },
  settings: {
    isHardMode: getStoredHardMode(),
  },
  game: {
    currentRowClass: '',
    guesses: [],
    stats: loadStats(),
    isGameWon: false,
    isGameLost: false,
    isRevealing: false,
  },
  modals: {
    isInfoModalOpen: false,
    isStatsModalOpen: false,
    isSettingsModalOpen: false,
  },
  alert: {
    status: 'success',
    message: null,
    isVisible: false,
  },
};

const useGlobalState = () => useState(initialState);
const {Provider, useUpdate, useTrackedState} = createContainer(useGlobalState);

const useModalsUpdate = createUseTrackedUpdateByKey(useUpdate, 'modals');
const useThemingUpdate = createUseTrackedUpdateByKey(useUpdate, 'theming');
const useGameUpdate = createUseTrackedUpdateByKey(useUpdate, 'game');
const useCurrentRowClassUpdate = createUseTrackedUpdateByKey(useGameUpdate, 'currentRowClass');
const useAlertUpdate = createUseTrackedUpdateByKey(useUpdate, 'alert');

export const useSetIsGameWon = createUseTrackedUpdateByKey(useGameUpdate, 'isGameWon');
export const useSetIsGameLost = createUseTrackedUpdateByKey(useGameUpdate, 'isGameLost');
export const useSetIsRevealing = createUseTrackedUpdateByKey(useGameUpdate, 'isRevealing');

const useShow = () => {
  const update = useAlertUpdate();
  return useCallback(
    (showStatus: AlertStatus, newMessage: string, options?: AlertOptions) => {
      const {delayMs = 0, persist, onClose, durationMs = ALERT_TIME_MS} = options || {};

      setTimeout(() => {
        update(prev => ({...prev, status: showStatus, message: newMessage, isVisible: true}));

        if (!persist) {
          setTimeout(() => {
            update(prev => ({...prev, isVisible: false}));
            if (onClose) {
              onClose();
            }
          }, durationMs);
        }
      }, delayMs);
    },
    [update],
  );
};

export const useShowError = () => {
  const show = useShow();
  return useCallback(
    (newMessage: string, options?: AlertOptions) => {
      show('error', newMessage, options);
    },
    [show],
  );
};

export const useShowSuccess = () => {
  const show = useShow();
  return useCallback(
    (newMessage: string, options?: AlertOptions) => {
      show('success', newMessage, options);
    },
    [show],
  );
};

export const useToggleDarkMode = () => {
  const update = useThemingUpdate();
  return useCallback(() => {
    update(prev => {
      const isDarkMode = !prev.isDarkMode;
      setStoredDarkMode(isDarkMode);
      return {...prev, isDarkMode};
    });
  }, [update]);
};

export const useToggleHighContrastMode = () => {
  const update = useThemingUpdate();
  return useCallback(() => {
    update(prev => {
      const isHighContrastMode = !prev.isHighContrastMode;
      setStoredIsHighContrastMode(isHighContrastMode);
      return {...prev, isHighContrastMode};
    });
  }, [update]);
};

export const useToggleHardMode = () => {
  const update = useUpdate();
  const showError = useShowError();
  return useCallback(() => {
    update(prev => {
      if (prev.game.guesses.length === 0 || getStoredHardMode()) {
        const isHardMode = !prev.settings.isHardMode;
        setStoredHardMode(isHardMode);
        return {...prev, settings: {...prev.settings, isHardMode}};
      }
      showError(HARD_MODE_ALERT_MESSAGE);
      return prev;
    });
  }, [update, showError]);
};

export const useClearCurrentRowClass = () => {
  const update = useCurrentRowClassUpdate();
  return useCallback(() => {
    update('');
  }, [update]);
};

export const useToggleCurrentRowClassJiggle = () => {
  const update = useCurrentRowClassUpdate();
  const showError = useShowError();
  const clearCurrentRowClass = useClearCurrentRowClass();
  return useCallback(
    (msg: string) => {
      update(() => {
        showError(msg, {
          onClose: clearCurrentRowClass,
        });
        return 'jiggle';
      });
    },
    [clearCurrentRowClass, showError, update],
  );
};

export const useSetModals = () => {
  const update = useModalsUpdate();
  return {
    toggleInfoModal: useCallback(() => {
      update(prev => ({...prev, isInfoModalOpen: !prev.isInfoModalOpen}));
    }, [update]),
    toggleStatsModal: useCallback(() => {
      update(prev => ({...prev, isStatsModalOpen: !prev.isStatsModalOpen}));
    }, [update]),
    toggleSettingsModal: useCallback(() => {
      update(prev => ({...prev, isSettingsModalOpen: !prev.isSettingsModalOpen}));
    }, [update]),
  };
};

export const useAddStatsCompleteGame = () => {
  const update = useGameUpdate();
  return useCallback(
    (numOfGuesses: number) => {
      update(prev => ({...prev, stats: addStatsForCompletedGame(prev.stats, numOfGuesses)}));
    },
    [update],
  );
};

export {Provider as GlobalContextProvider, useTrackedState as useGlobalContext};
