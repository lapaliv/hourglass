module.exports = {
  moduleNameMapper: {
    '^@lapaliv/hourglass$': '<rootDir>/dist/hourglass.min.js',
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
