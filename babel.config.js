module.exports = function (api) {
  api.cache(true);
  return {
    // babel-preset-expo configures expo-router and the
    // react-native-worklets (Reanimated 4) plugin automatically.
    presets: ['babel-preset-expo'],
  };
};
