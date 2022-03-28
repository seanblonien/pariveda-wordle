import {ChartBarIcon, CogIcon, InformationCircleIcon, CodeIcon} from '@heroicons/react/outline';
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
        <p className='text-xl ml-2.5 font-bold dark:text-white inline-flex h-full items-center'>
          <img src='/parivedaLogo.png' alt='Pariveda Logo' className='h-[75%] mr-2' />
          Wordle
        </p>
        <div className='right-icons'>
          <a
            href='https://github.com/seanblonien/pariveda-wordle'
            aria-label='GitHub Code'
            title='GitHub Code'
            target='_blank'
            rel='noreferrer'
          >
            <CodeIcon className='h-6 w-6 mr-3 cursor-pointer dark:stroke-white' />
          </a>
          <span title='Stats'>
            <ChartBarIcon
              className='h-6 w-6 mr-3 cursor-pointer dark:stroke-white'
              onClick={toggleModals.toggleStatsModal}
            />
          </span>
          <span title='Settings'>
            <CogIcon
              className='h-6 w-6 mr-3 cursor-pointer dark:stroke-white'
              onClick={toggleModals.toggleSettingsModal}
            />
          </span>
        </div>
      </div>
      <hr />
    </div>
  );
};
