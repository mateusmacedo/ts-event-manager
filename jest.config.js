module.exports = {
  roots: ['<rootDir>/test'],
  moduleFileExtensions: ['ts', 'js', 'tsx', 'jsx'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  testEnvironment: 'node',
  coverageReporters: ['json-summary', 'text', 'lcov'],
  testResultsProcessor: 'jest-sonar-reporter',
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: 80
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}']
}
