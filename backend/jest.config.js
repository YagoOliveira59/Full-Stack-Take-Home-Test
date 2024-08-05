/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
};