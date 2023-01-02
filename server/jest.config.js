/** @type {import('@jest/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
};
