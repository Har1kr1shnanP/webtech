module.exports = {
  preset: 'jest-expo',
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-navigation|@react-navigation|expo|@expo|@expo-google-fonts|react-native-svg|@react-native/js-polyfills|react-native-gesture-handler|react-native-reanimated|react-native-screens|unimodules|sentry-expo|@unimodules))",
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFiles: ["<rootDir>/jest.setup.js"],
  testEnvironment: 'node',
};
