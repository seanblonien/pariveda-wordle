import {HARD_MODE_DESCRIPTION, HIGH_CONTRAST_MODE_DESCRIPTION} from '../../constants/strings';
import {
  useGlobalContext,
  useToggleDarkMode,
  useToggleHardMode,
  useToggleHighContrastMode,
} from '../../context/GlobalContext';
import {ModalInstanceProps} from '../../types';
import {BaseModal} from './BaseModal';
import {SettingsToggle} from './SettingsToggle';

export const SettingsModal: React.FC<ModalInstanceProps> = props => {
  const {
    settings: {isHardMode},
    theming: {isDarkMode, isHighContrastMode},
  } = useGlobalContext();
  const toggleHardMode = useToggleHardMode();
  const toggleDarkMode = useToggleDarkMode();
  const toggleHighContrastMode = useToggleHighContrastMode();
  return (
    <BaseModal title='Settings' {...props}>
      <div className='flex flex-col mt-2 divide-y'>
        <SettingsToggle
          settingName='Hard Mode'
          flag={isHardMode}
          handleFlag={toggleHardMode}
          description={HARD_MODE_DESCRIPTION}
        />
        <SettingsToggle settingName='Dark Mode' flag={isDarkMode} handleFlag={toggleDarkMode} />
        <SettingsToggle
          settingName='High Contrast Mode'
          flag={isHighContrastMode}
          handleFlag={toggleHighContrastMode}
          description={HIGH_CONTRAST_MODE_DESCRIPTION}
        />
      </div>
    </BaseModal>
  );
};
