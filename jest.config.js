/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  // preset: 'ts-jest/presets/js-with-ts', // для работы с файлами тестов *.jsx
  preset: 'ts-jest', // для работы с файлами тестов *.tsx
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css)': 'identity-obj-proxy', // для исключения ошибок импорта стилей в компоненте
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
