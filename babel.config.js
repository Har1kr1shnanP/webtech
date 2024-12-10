module.exports = function (api) {
    api.cache(true);
    return {
      presets:[ '@babel/preset-react', 'module:@react-native/babel-preset'],
  };
};
  