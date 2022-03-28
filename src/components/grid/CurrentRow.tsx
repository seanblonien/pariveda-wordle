import {MAX_WORD_LENGTH} from '../../constants/settings';
import {unicodeSplit} from '../../lib/words';
import {Cell} from './Cell';

export type CurrentRowProps = {
  guess: string;
  className: string;
};

export const CurrentRow: React.FC<CurrentRowProps> = ({guess, className}) => {
  const splitGuess = unicodeSplit(guess);
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH - splitGuess.length));
  const classes = `flex justify-center mb-1 ${className}`;

  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  );
};
