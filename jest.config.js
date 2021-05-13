module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: ['default', ['jest-junit', { outputDirectory: 'coverage' }]],
  coverageReporters: ['text', 'cobertura'],
}
