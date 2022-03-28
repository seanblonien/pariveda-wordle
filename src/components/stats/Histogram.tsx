import {GameStats} from '../../lib/localStorage';
import {Progress} from './Progress';

type Props = {
  gameStats: GameStats;
};

export function Histogram({gameStats}: Props) {
  const {winDistribution} = gameStats;
  const maxValue = Math.max(...winDistribution);

  return (
    <div className='columns-1 justify-left m-2 text-sm dark:text-white'>
      {winDistribution.map((value, i) => (
        <Progress key={i} index={i} size={90 * (value / maxValue)} label={String(value)} />
      ))}
    </div>
  );
}
