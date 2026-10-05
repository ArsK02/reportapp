import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { Tabs, BottomTabBarButtonProps } from 'expo-router/js-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Ionicons';
import { useTheme } from '@shopify/restyle';

import Theme from '@/theme';
import { IoniconName } from '@/components/icons';

const TAB_ICONS: Record<string, IoniconName> = {
  '(home)': 'home',
  settings: 'cog',
};

export default function TabsLayout() {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();

  // Android is edge-to-edge since SDK 54: keep the floating tab bar above the
  // system navigation bar, the same way it looked before edge-to-edge.
  const isAndroid = Platform.OS === 'android';

  return (
    <Tabs
      safeAreaInsets={isAndroid ? { bottom: 0 } : undefined}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
        tabBarIcon: ({ focused }) => (
          <TabBarButtonIcon
            focused={focused}
            iconName={TAB_ICONS[route.name] ?? 'home'}
          />
        ),
        lazy: false,
        tabBarShowLabel: false,
        // Let the custom icon background fill the whole tab button.
        tabBarIconStyle: styles.tabBarIcon,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBarColor,
          position: 'absolute',
          borderTopWidth: 0,
          bottom: 25 + (isAndroid ? insets.bottom : 0),
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 10,
          height: 58,
          paddingVertical: 8,
          // The tab bar sets its own paddingTop, which wins over paddingVertical.
          paddingTop: 8,
          paddingHorizontal: 8,
        },
      })}
    >
      <Tabs.Screen name="(home)" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}

const CustomTabBarButton: React.FC<BottomTabBarButtonProps> = (props) => {
  const { onPress, children, accessibilityState, testID } = props;
  return (
    <Pressable
      onPress={onPress}
      style={styles.customTabBarButton}
      accessibilityRole="tab"
      accessibilityState={accessibilityState}
      testID={testID}
    >
      {children}
    </Pressable>
  );
};

type TabBarButtonIconProps = {
  focused: boolean;
  iconName: IoniconName;
};

const TabBarButtonIcon: React.FC<TabBarButtonIconProps> = (props) => {
  const { focused, iconName } = props;
  const theme = useTheme<Theme>();

  return (
    <View
      style={[
        styles.tabBarButtonIcon,
        focused && { backgroundColor: theme.colors.tabBarActiveItemColor },
      ]}
    >
      <Icon
        name={iconName}
        size={22}
        color={
          focused
            ? theme.colors.secondaryIconColor
            : theme.colors.contrastIconColor
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarIcon: {
    width: '100%',
    height: '100%',
  },

  customTabBarButton: {
    flexGrow: 1,
    height: 42,
    borderRadius: 8,
    overflow: 'hidden',
  },

  tabBarButtonIcon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
