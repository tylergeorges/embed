import React, { createContext, useContext } from 'react';
import { GuildSettings } from '@graphql/graphql';

// React context where settings will be stored
const SettingsContext = createContext<GuildSettings | null>(null);

// Custom provider component responsible for fetching and providing settings.
interface SettingsProviderProps {
  children: React.ReactNode;
}
function SettingsProvider({ children }: SettingsProviderProps) {
  // TODO: Fetch the settings

  return <>{children}</>;
}

// A custom hook to use the settings context
export const useSettings = () => useContext(SettingsContext);

// Custom provider component responsible for fetching and providing settings.
export default SettingsProvider;
