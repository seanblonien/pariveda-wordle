import Countdown from 'react-countdown';
import {
  STATISTICS_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  NEW_WORD_TEXT,
  SHARE_TEXT,
} from '../../constants/strings';
import {useGlobalContext} from '../../context/GlobalContext';
import {shareStatus} from '../../lib/share';
import {tomorrow} from '../../lib/words';
import {ModalInstanceProps} from '../../types';
import {Histogram} from '../stats/Histogram';
import {StatBar} from '../stats/StatBar';
import {BaseModal} from './BaseModal';

export const StatsModal: React.FC<ModalInstanceProps> = props => {
  const {
    game: {stats},
  } = useGlobalContext();
  const {isGameWon, setIsGameWon, isGameLost, setIsGameLost, isRevealing, toggleRevealing} =
    useGameState(setIsStatsModalOpen);
  if (stats.totalGames <= 0) {
    return (
      <BaseModal title={STATISTICS_TITLE} {...props}>
        <StatBar gameStats={stats} />
      </BaseModal>
    );
  }
  return (
    <BaseModal title={STATISTICS_TITLE} {...props}>
      <StatBar gameStats={stats} />
      <h4 className='text-lg leading-6 font-medium text-gray-900 dark:text-gray-100'>
        {GUESS_DISTRIBUTION_TEXT}
      </h4>
      <Histogram gameStats={stats} />
      {(isGameLost || isGameWon) && (
        <div className='mt-5 sm:mt-6 columns-2 dark:text-white'>
          <div>
            <h5>{NEW_WORD_TEXT}</h5>
            <Countdown
              className='text-lg font-medium text-gray-900 dark:text-gray-100'
              date={tomorrow}
              daysInHours
            />
          </div>
          <button
            type='button'
            className='mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
            onClick={() => {
              shareStatus(guesses, isGameLost, isHardMode, isDarkMode, isHighContrastMode);
              handleShare();
            }}
          >
            {SHARE_TEXT}
          </button>
        </div>
      )}
    </BaseModal>
  );
};
