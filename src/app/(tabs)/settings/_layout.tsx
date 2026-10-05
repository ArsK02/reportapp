import React from 'react';
import { Stack, router } from 'expo-router';
import { useTheme } from '@shopify/restyle';

import HeaderBackButton from '@/components/buttons/HeaderBackButton';
import Theme from '@/theme';

export default function SettingsLayout() {
  const theme = useTheme<Theme>();

  const headerLeft = () => <HeaderBackButton onPress={() => router.back()} />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: theme.colors.backgroundColor,
        },
      }}
    >
      <Stack.Screen name="index" />

      <Stack.Screen
        name="backup"
        options={{ headerShown: true, title: '', headerLeft }}
      />

      <Stack.Screen
        name="donation"
        options={{ headerShown: true, title: '', headerLeft }}
      />

      <Stack.Screen
        name="privacy-policy"
        options={{
          headerShown: true,
          title: '',
          headerLeft,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="paypal"
        options={{
          headerShown: true,
          title: '',
          headerLeft,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
