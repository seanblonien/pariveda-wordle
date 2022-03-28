import {useGlobalContext} from '../../context/GlobalContext';
import {Alert} from './Alert';

export const AlertContainer = () => {
  const {
    alert: {message, status, isVisible},
  } = useGlobalContext();

  return <Alert isOpen={isVisible} message={message || ''} variant={status} />;
};
