const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    "^@afx/models/engine/(.*)$": "<rootDir>/src/models/_engine/$1",
    "^@afx/models/(.*)$": "<rootDir>/src/models/main/$1",
    "^@afx/views/(.*)$": "<rootDir>/src/views/$1",
    "^@afx/utilities/(.*)$": "<rootDir>/src/utilities/$1",
    "^@afx/services/(.*)$": "<rootDir>/src/services/$1",
    "^@afx/components/(.*)$": "<rootDir>/src/components/$1",
    "^@afx/interfaces/(.*)$": "<rootDir>/src/interfaces/$1",
    "^@afx/mock-datas/(.*)$": "<rootDir>/src/mock-datas/$1",
    "^@afx/asset-icons/(.*)$": "<rootDir>/src/assets/icons/$1",
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);