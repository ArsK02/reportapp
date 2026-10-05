import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AnimatedSplashScreen from './AnimatedSplashScreen';

type Props = {
  children: React.ReactNode;
};

const AnimatedAppLoader: React.FC<Props> = ({ children }) => {
  const [isSplashReady, setSplashReady] = useState(false);
  const [splashUri, setSplashUri] = useState<string | null>(null);
  const appearanceTheme = useColorScheme();
  const isDark = appearanceTheme === 'dark';

  useEffect(() => {
    async function prepare() {
      try {
        const [[splash]] = await Promise.all([
          Asset.loadAsync(
            isDark
              ? require('../../assets/splash-dark.png')
              : require('../../assets/splash.png')
          ),
          Font.loadAsync(Ionicons.font),
        ]);
        setSplashUri(splash.localUri);
      } catch (e) {
        console.log(e);
      } finally {
        setSplashReady(true);
      }
    }

    prepare();
  }, [isDark]);

  if (!isSplashReady) {
    return null;
  }

  return (
    <AnimatedSplashScreen
      image={splashUri ? splashUri : ''}
      backgroundColor={isDark ? '#000000' : '#ffffff'}
    >
      {children}
    </AnimatedSplashScreen>
  );
};

export default AnimatedAppLoader;
