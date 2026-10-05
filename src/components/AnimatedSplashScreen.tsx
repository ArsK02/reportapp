import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

type Props = {
  children: React.ReactNode;
  image: string;
  backgroundColor: string;
};

const AnimatedSplashScreen: React.FC<Props> = (props) => {
  const { children, image, backgroundColor } = props;
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [animation, isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  // Without a splash image there is nothing to wait for.
  useEffect(() => {
    if (!image) {
      onImageLoaded();
    }
  }, [image, onImageLoaded]);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              pointerEvents: 'none',
              backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="contain"
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
            source={{ uri: image }}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default AnimatedSplashScreen;
