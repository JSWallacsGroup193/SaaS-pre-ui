import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: '<rootDir>/test/prisma-test-environment.ts',
  rootDir: '.',
  testMatch: ['<rootDir>/test/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
  verbose: true,
};

export default config;
