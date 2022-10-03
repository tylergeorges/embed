import Color from 'color'
import styled from '@emotion/styled/macro'

import { ParsedUrl } from '../../types/url'
import { Settings_settings_theme } from '@generated'

export * from '@emotion/react'

export interface Theme extends Settings_settings_theme {
  readonly: boolean,
  guestMode: boolean,
  singleChannel: boolean,
  directEnabled: boolean,
  colors: {
    __typename: 'ThemeColorSettings'
    _primary: Color
    _accent: Color
    _background: Color

    primary: string
    accent: string
    background: string
  }
  url: ParsedUrl
  loadedSettings: boolean
}

export default styled
