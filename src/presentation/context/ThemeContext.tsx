import React from 'react';
import {createContext, PropsWithChildren} from 'react';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';
import {useColorScheme} from 'react-native';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const ThemeContext = createContext({
  isDark: false,
  theme: LightTheme,
});

const contextMD3DarkTheme = {
  ...MD3DarkTheme,
  DarkTheme,
  colors: {...MD3DarkTheme.colors, ...DarkTheme.colors},
};

const contextMD3LightTheme = {
  ...MD3LightTheme,
  LightTheme,
  colors: {...MD3LightTheme.colors, ...LightTheme.colors},
};

export const ThemeContextProvider = ({children}: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const theme = isDark ? contextMD3DarkTheme : contextMD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <ThemeContext.Provider value={{isDark, theme}}>
          {children}
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};
