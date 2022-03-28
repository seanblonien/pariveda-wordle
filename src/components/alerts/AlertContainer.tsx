import {useAlert} from '../../context/AlertContext';
import {Alert} from './Alert';

export function AlertContainer() {
  const {message, status, isVisible} = useAlert();

  return <Alert isOpen={isVisible} message={message || ''} variant={status} />;
}
