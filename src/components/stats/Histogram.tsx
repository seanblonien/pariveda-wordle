import {useGlobalContext} from '../../context/GlobalContext';
import {Progress} from './Progress';

export const Histogram = () => {
  const {
    game: {
      stats: {winDistribution},
    },
  } = useGlobalContext();
  const maxValue = Math.max(...winDistribution);

  return (
    <div className='columns-1 justify-left m-2 text-sm dark:text-white'>
      {winDistribution.map((value, i) => (
        <Progress key={i} index={i} size={90 * (value / maxValue)} label={String(value)} />
      ))}
    </div>
  );
};
