import * as path from 'path';

/* eslint-disable */
export default {
  displayName: 'frontend',
  preset: '../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      { configFile: path.resolve(__dirname, '.babelrc') },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@ionic/react|@ionic/react-router|@ionic/core|@stencil/core|ionicons)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../coverage/frontend',
};
