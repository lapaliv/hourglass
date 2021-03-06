module.exports = {
  moduleNameMapper: {
    '^@lapaliv/hourglass$': '<rootDir>/dist/hourglass.min.js',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverage: true,
  //collectCoverageFrom: [
  //  '<rootDir>/components/**/*.vue',
  //  '<rootDir>/pages/**/*.vue',
  //],
  coverageReporters: ['json', 'lcovonly', 'text', 'clover'],
};
