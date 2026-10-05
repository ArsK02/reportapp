import '../../localization';

import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@shopify/restyle';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import store, { persistor } from '@/store/store';
import LogicCore from '@/core/LogicCore';
import AnimatedAppLoader from '@/components/AnimatedAppLoader';
import { ThemeNames, themes } from '@/theme';
import { selectThemeState } from '@/store/app/appSelectors';

SplashScreen.preventAutoHideAsync();

const RootNavigator = () => {
  const appTheme: ThemeNames = useSelector(selectThemeState());
  const appearanceTheme = useColorScheme();

  const selectedTheme = useMemo(() => {
    const themeName = appTheme === 'auto' ? appearanceTheme : appTheme;
    return themeName === 'dark' ? themes.dark.theme : themes.light.theme;
  }, [appTheme, appearanceTheme]);

  return (
    <ActionSheetProvider>
      <ThemeProvider theme={selectedTheme}>
        <BottomSheetModalProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>

          <StatusBar style={selectedTheme.colors.statusBar as StatusBarStyle} />
        </BottomSheetModalProvider>
      </ThemeProvider>
    </ActionSheetProvider>
  );
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AnimatedAppLoader>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <LogicCore />
            <RootNavigator />
          </PersistGate>
        </Provider>
      </AnimatedAppLoader>
    </GestureHandlerRootView>
  );
}
