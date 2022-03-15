import {useCallback, useState} from 'react';
import {createContainer} from 'react-tracked';
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
import {useAlert} from './AlertContext';

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
  };
  modals: {
    isInfoModalOpen: boolean;
    isStatsModalOpen: boolean;
    isSettingsModalOpen: boolean;
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
  },
  modals: {
    isInfoModalOpen: false,
    isStatsModalOpen: false,
    isSettingsModalOpen: false,
  },
};

const useGlobalState = () => {
  return useState(initialState);
};
const {Provider, useUpdate, useTrackedState} = createContainer(useGlobalState);

const useModalsUpdate = createUseTrackedUpdateByKey(useUpdate, 'modals');
const useThemingUpdate = createUseTrackedUpdateByKey(useUpdate, 'theming');
const useGameUpdate = createUseTrackedUpdateByKey(useUpdate, 'game');
const useCurrentRowClassUpdate = createUseTrackedUpdateByKey(useGameUpdate, 'currentRowClass');

export const useSetDarkMode = () => {
  const update = useThemingUpdate();
  return useCallback(
    (value: boolean) => {
      update(prev => {
        setStoredDarkMode(value);
        return {...prev, isDarkMode: value};
      });
    },
    [update],
  );
};

export const useSetHighContrastMode = () => {
  const update = useThemingUpdate();
  return useCallback(
    (value: boolean) => {
      update(prev => {
        setStoredIsHighContrastMode(value);
        return {...prev, isHighContrastMode: value};
      });
    },
    [update],
  );
};

export const useSetHardMode = () => {
  const update = useUpdate();
  const {showError} = useAlert();
  return useCallback(
    (value: boolean) => {
      update(prev => {
        if (prev.game.guesses.length > 0 || getStoredHardMode()) {
          setStoredHardMode(value);
          return {...prev, settings: {...prev.settings, isHardMode: value}};
        } else {
          showError(HARD_MODE_ALERT_MESSAGE);
          return prev;
        }
      });
    },
    [update, showError],
  );
};

export const useClearCurrentRowClass = () => {
  const update = useCurrentRowClassUpdate();
  return useCallback(() => {
    update('');
  }, [update]);
};

export const useToggleCurrentRowClassJiggle = () => {
  const update = useCurrentRowClassUpdate();
  const {showError} = useAlert();
  const clearCurrentRowClass = useClearCurrentRowClass();
  return useCallback(
    (msg: string) => {
      update(prev => {
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

export {Provider as GlobalContextProvider, useTrackedState as useGlobalContext};
