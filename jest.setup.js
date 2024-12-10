import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native-gesture-handler', () => {
  return {
    Swipeable: jest.fn(),
    DrawerLayout: jest.fn(),
  };
});

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});
global.alert = jest.fn();

jest.spyOn(global, 'alert').mockImplementation(() => {});

jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));

jest.mock('expo-modules-core', () => ({
  NativeModulesProxy: {},
  Platform: { OS: 'web' },
}));
jest.mock('@expo/vector-icons', () => ({
  Ionicons: jest.fn(() => 'Ionicons'),
}));
