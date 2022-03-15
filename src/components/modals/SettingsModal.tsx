import {BaseModal} from './BaseModal';
import {SettingsToggle} from './SettingsToggle';
import {HARD_MODE_DESCRIPTION, HIGH_CONTRAST_MODE_DESCRIPTION} from '../../constants/strings';
import {useGlobalContext, useSetDarkMode, useSetHardMode, useSetHighContrastMode} from '../../context/GlobalContext';
import {ModalInstanceProps} from '../../types';

export const SettingsModal: React.FC<ModalInstanceProps> = (props) => {
  const {
    settings: {isHardMode},
    theming: {isDarkMode, isHighContrastMode},
  } = useGlobalContext();
  const handleHardMode = useSetHardMode();
  const handleDarkMode = useSetDarkMode();
  const handleHighContrastMode = useSetHighContrastMode();
  return (
    <BaseModal title='Settings' {...props}>
      <div className='flex flex-col mt-2 divide-y'>
        <SettingsToggle
          settingName='Hard Mode'
          flag={isHardMode}
          handleFlag={handleHardMode}
          description={HARD_MODE_DESCRIPTION}
        />
        <SettingsToggle settingName='Dark Mode' flag={isDarkMode} handleFlag={handleDarkMode} />
        <SettingsToggle
          settingName='High Contrast Mode'
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
          description={HIGH_CONTRAST_MODE_DESCRIPTION}
        />
      </div>
    </BaseModal>
  );
};
