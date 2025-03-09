/** @type {import('jest').Config} */
const config = {
    verbose: true,
    preset: 'jest-expo',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transformIgnorePatterns: [
        'node_modules/(?!(expo-modules-core|expo-router|react-native|expo|@react-native|@react-navigation)/)',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    setupFiles: ['<rootDir>/jest.setup.js'],
    collectCoverage: true,
    collectCoverageFrom: [
        'app/**/*.{js,jsx,ts,tsx}',
    ],
    coverageReporters: ['json', 'lcov', 'text'], // Format des rapports de couverture (text, lcov, etc.)
    coverageDirectory: '<rootDir>/.coverage', // Dossier où les rapports de couverture seront stockés
};

module.exports = config;
