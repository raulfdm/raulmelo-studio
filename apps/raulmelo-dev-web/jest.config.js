module.exports = {
  moduleNameMapper: {
    '^@components/(.*)': '<rootDir>/src/components/$1',
    '^@config/(.*)': '<rootDir>/src/config/$1',
    '^@contexts/(.*)': '<rootDir>/src/contexts/$1',
    '^@data/(.*)': '<rootDir>/src/data/$1',
    '^@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '^@lib/(.*)': '<rootDir>/src/lib/$1',
    '^@models/(.*)': '<rootDir>/src/models/$1',
    '^@screens/(.*)': '<rootDir>/src/screens/$1',
    '^@services/(.*)': '<rootDir>/src/services/$1',
    '^@styles/(.*)': '<rootDir>/src/styles/$1',
    '^@types-api': '<rootDir>/src/types/api/index.ts',
    '^@types-app': '<rootDir>/src/types/index.ts',
    '^@utils/(.*)': '<rootDir>/src/utils/$1',
  },
};
