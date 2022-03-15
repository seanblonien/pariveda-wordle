import {useGlobalContext, useSetModals} from '../../context/GlobalContext';
import {InfoModal} from './InfoModal';

export const ModalContainer: React.FC = () => {
  const {
    modals: {isInfoModalOpen, isStatsModalOpen, isSettingsModalOpen},
  } = useGlobalContext();
  const {toggleInfoModal, toggleStatsModal, toggleSettingsModal} = useSetModals();
  return (
    <>
      <InfoModal isOpen={isInfoModalOpen} close={toggleInfoModal} />
      <StatsModal isOpen={isStatsModalOpen} handleClose={toggleStatsModal} />
      <SettingsModal isOpen={isSettingsModalOpen} handleClose={toggleSettingsModal} />
    </>
  );
};
