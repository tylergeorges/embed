import { store } from '@models'
import { settingsStore } from '@store'
import { Checkbox } from '../Upload/elements'
import {
  Close, ExperimentsButton,
  Root,
  Title,
  Top
} from './elements'

const Settings = () => (
  <Root className="settings-modal">
    <Top className="top">
      <Title>Settings</Title>
      <Close onClick={store.modal.close} />
    </Top>
    <Checkbox className="send-button-setting checkbox-field">
      <input
        type="checkbox"
        defaultChecked={settingsStore.sendButton}
        onChange={e => settingsStore.setSendButton(e.target.checked)}
      />
      <span className="checkbox">
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"></path></svg>
      </span>
      <span className="checkbox-text">Show Send Message button</span>
    </Checkbox>
    <ExperimentsButton
      onClick={() => {
        store.modal.close();
        store.modal.openExperiments()
      }}
      style={{marginTop: 16}}
    >
      Experiments
    </ExperimentsButton>
  </Root>
)

export default Settings
