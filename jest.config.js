// noinspection HtmlUnknownTag
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['.bk', 'dist'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupFiles: ['./jest.setup.ts'],
  reporters: ['default', ['jest-junit', { outputDirectory: 'coverage' }]],
  coverageReporters: ['text', 'cobertura'],
  // globals: {
  //     'ts-jest': {
  //         tsConfig: 'jest.tsconfig.json',
  //     },
  // },
}
