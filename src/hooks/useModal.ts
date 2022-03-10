import {useState} from 'react';

export const useModal = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return {isInfoModalOpen, isStatsModalOpen, isSettingsModalOpen, setIsInfoModalOpen, setIsSettingsModalOpen, setIsStatsModalOpen};
}
