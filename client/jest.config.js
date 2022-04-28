const paths = require('./src/config/paths')

const config = {
	rootDir: './',
	transform: {
		'^.+\\.(jsx?|tsx?)$': 'ts-jest',
	},
	transformIgnorePatterns: [
		'[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
		'^.+\\.module\\.(css|sass|scss)$',
	],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	setupFilesAfterEnv: [paths.testsSetup],
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
		'^components/(.*)$': '<rootDir>/src/components/$1',
		'^store/(.*)$': '<rootDir>/src/store/$1',
		'^helpers/(.*)$': '<rootDir>/src/helpers/$1',
		'^assets/(.*)$': '<rootDir>/src/assets/$1',
		'\\.svg$': '<rootDir>/config/jest/svgrMock.js',
		'^.+\\.(css|less|scss)$': '<rootDir>/config/jest/cssMock.js',
		'^@/(.*)$': '<rootDir>/src/$1',
	},
}

module.exports = config
