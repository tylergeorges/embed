import { Theme as ThemeContext } from '@lib/emotion'
import Color from 'color'
import { ThemeProvider as Provider } from 'emotion-theming'
import { GlobalStyles } from './elements'
import GET_SETTINGS from './Settings.graphql'

import { Settings, Settings_settings_theme } from '@generated'
import * as Constants from '@constants'
import { useQuery } from 'react-apollo-hooks'
import {useRouter} from '@hooks'
import {generalStore, authStore} from '@store';
import { useEffect } from 'react'

const queryParams = new URLSearchParams(location.search);

const UPDATE_TIMEOUT = 15000;

export const ThemeProvider = ({ children }) => {
  const guild = useRouter()?.guild ?? '299881420891881473'
  const { data: {settings} } = useQuery<Settings>(GET_SETTINGS, { variables: { guild }, fetchPolicy: 'network-only' })

  let theme: Settings_settings_theme = {
    __typename: 'ThemeSettings',
    colors: {
      __typename: 'ThemeColorSettings',
      primary: settings?.theme?.colors?.primary || Constants.THEME_COLOR_PRIMARY,
      accent: settings?.theme?.colors?.accent || Constants.THEME_COLOR_ACCENT,
      background: settings?.theme?.colors?.background || Constants.THEME_BACKGROUND
    },
    css: settings?.theme?.css || ``
  };

  generalStore.setSettings(settings)

  useEffect(() => {
    if (queryParams.has('token')) {
      let ls: Storage
      try {
        ls = localStorage
      } catch (e) {
        generalStore.toggleMenu(true)
      }

      if (ls && ls.getItem('updatingAt')) {
        const updateThreshold = parseInt(ls.getItem('updatingAt')) + UPDATE_TIMEOUT;
        const justUpdated = updateThreshold > Date.now();

        if (justUpdated) {
          ls.removeItem('updatingAt');

          return; // We don't need to re-auth as the token in localStorage will still be fine.
        }
      }

      const token = decodeURIComponent(queryParams.get('token'))

      if (ls) authStore.guildLogin(guild, token).then(async () => {
        generalStore.needsUpdate = true;
      }).catch(e => {
        console.warn(`Failed to authenticate using guild: ${e}`);
      })
    } else if (queryParams.has('username')) {
      const name = decodeURIComponent(queryParams.get('username'))
      if (name !== authStore.user?.username) {
        let ls: Storage
        try {
          ls = localStorage
        } catch (e) {
          generalStore.toggleMenu(true)
        }

        if (ls) authStore.guestLogin(name).then(async () => {
          generalStore.needsUpdate = true;
        })
      }
    }
  }, []);

  const themeContext: ThemeContext = {
    ...theme,
    readonly: settings?.readonly || false,
    guestMode: settings?.guestMode || false,
    singleChannel: !!settings?.singleChannel || settings?.hideSidebar || false,
    directEnabled: settings?.directEnabled || false,
    colors: {
      ...theme.colors,
      _primary: Color(theme.colors.primary),
      _background: Color(theme.colors.background),
      _accent: Color(theme.colors.accent)
    },
    url: {
      preset: queryParams.get('preset') as 'crate' | null,
      api: queryParams.get('api')
    },
    loadedSettings: !!settings
  };

  GlobalStyles.inject(themeContext);

  return <Provider theme={themeContext}>{children}</Provider>
};
