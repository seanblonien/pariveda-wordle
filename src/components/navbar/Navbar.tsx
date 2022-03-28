import {ChartBarIcon, CogIcon, InformationCircleIcon} from '@heroicons/react/outline';
import {GAME_TITLE} from '../../constants/strings';
import {useSetModals} from '../../context/GlobalContext';

export const Navbar: React.FC = () => {
  const toggleModals = useSetModals();
  return (
    <div className='navbar'>
      <div className='navbar-content px-5'>
        <InformationCircleIcon
          className='h-6 w-6 mr-2 cursor-pointer dark:stroke-white'
          onClick={toggleModals.toggleInfoModal}
        />
        <p className='text-xl ml-2.5 font-bold dark:text-white'>{GAME_TITLE}</p>
        <div className='right-icons'>
          <ChartBarIcon
            className='h-6 w-6 mr-3 cursor-pointer dark:stroke-white'
            onClick={toggleModals.toggleStatsModal}
          />
          <CogIcon
            className='h-6 w-6 mr-3 cursor-pointer dark:stroke-white'
            onClick={toggleModals.toggleSettingsModal}
          />
        </div>
      </div>
      <hr />
    </div>
  );
};
