import {useEffect} from 'react';
import {ENTER_TEXT, DELETE_TEXT} from '../../constants/strings';
import {getStatuses} from '../../lib/statuses';
import {localeAwareUpperCase} from '../../lib/words';
import {Key} from './Key';

export type KeyboardProps = {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  guesses: string[];
  isRevealing?: boolean;
};

export const Keyboard: React.FC<KeyboardProps> = ({
  onChar,
  onDelete,
  onEnter,
  guesses,
  isRevealing,
}) => {
  const charStatuses = getStatuses(guesses);

  const onClick = (value: string) => {
    if (value === 'ENTER') {
      onEnter();
    } else if (value === 'DELETE') {
      onDelete();
    } else {
      onChar(value);
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter();
      } else if (e.code === 'Backspace') {
        onDelete();
      } else {
        const key = localeAwareUpperCase(e.key);
        // TODO: check this test if the range works with non-english letters
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onChar(key);
        }
      }
    };
    window.addEventListener('keyup', listener);
    return () => {
      window.removeEventListener('keyup', listener);
    };
  }, [onEnter, onDelete, onChar]);

  const mapKey = (key: string) => (
    <Key
      value={key}
      key={key}
      onClick={onClick}
      status={charStatuses[key]}
      isRevealing={isRevealing}
    />
  );

  return (
    <div>
      <div className='flex justify-center mb-1'>
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(mapKey)}
      </div>
      <div className='flex justify-center mb-1'>
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(mapKey)}
      </div>
      <div className='flex justify-center'>
        <Key width={65.4} value='ENTER' onClick={onClick}>
          {ENTER_TEXT}
        </Key>
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(mapKey)}
        <Key width={65.4} value='DELETE' onClick={onClick}>
          {DELETE_TEXT}
        </Key>
      </div>
    </div>
  );
};
