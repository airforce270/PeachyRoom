import {defineConfig, globalIgnores} from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';
import jsdoc from 'eslint-plugin-jsdoc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([globalIgnores(['build/**/*']), {
  ...jsdoc.configs['recommended-error'],
  plugins: {
    jsdoc: jsdoc,
  },
  rules: {},
}, {
  extends: compat.extends('google'),

  languageOptions: {
    globals: {
      ...globals.browser,
      ...Object.fromEntries(
        Object.entries(globals.commonjs).map(([key]) => [key, 'off']),
      ),
      ...Object.fromEntries(
        Object.entries(globals.node).map(([key]) => [key, 'off']),
      ),
    },

    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    'valid-jsdoc': 'off',
    'indent': 'off',
    'no-multi-spaces': 'off',
    'require-jsdoc': 'off',
    'max-len': ['off'],
    'camelcase': 'off',
    'no-invalid-this': 'off',
    'no-extra-semi': 'error',
  },
}]);
