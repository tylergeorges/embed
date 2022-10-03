import "@emotion/react";
import Color from "color";
import {ParsedUrl} from "./types/url";
import {Settings_settings_theme} from "@generated";

declare module "@emotion/react" {
  export interface Theme extends Settings_settings_theme{
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
}
