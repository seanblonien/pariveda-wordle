import {useGlobalContext, useSetModals} from '../../context/GlobalContext';
import {InfoModal} from './InfoModal';
import {SettingsModal} from './SettingsModal';
import {StatsModal} from './StatsModal';

export const ModalContainer: React.FC = () => {
  const {
    modals: {isInfoModalOpen, isStatsModalOpen, isSettingsModalOpen},
  } = useGlobalContext();
  const {toggleInfoModal, toggleStatsModal, toggleSettingsModal} = useSetModals();
  return (
    <>
      <InfoModal isOpen={isInfoModalOpen} close={toggleInfoModal} />
      <StatsModal isOpen={isStatsModalOpen} close={toggleStatsModal} />
      <SettingsModal isOpen={isSettingsModalOpen} close={toggleSettingsModal} />
    </>
  );
};
