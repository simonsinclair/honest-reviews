module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    '@remix-run/eslint-config/jest-testing-library',
    'prettier',
  ],
  settings: {
    jest: {
      /**
       * Vitest has a similar API to Jest, so the linting plugins work nicely,
       * but we must explicitly set the 'Jest' version.
       */
      version: 27,
    },
  },
};
