import {useCallback, useState} from 'react';
import {addStatsForCompletedGame, loadStats} from '../lib/stats';

export const useStats = () => {
  const [stats, setStats] = useState(() => loadStats());

  const statsCompleteGame = useCallback(
    (numOfGuesses: number) => {
      setStats(prev => addStatsForCompletedGame(prev, numOfGuesses));
    },
    [setStats],
  );

  return {stats, statsCompleteGame};
};
