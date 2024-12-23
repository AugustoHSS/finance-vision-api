import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: {
            globals: globals.node,
        },
        rules: {
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'indent': ['error', 4],
            'no-trailing-spaces': 'error',
            'space-in-parens': ['error', 'never'],
            'comma-dangle': ['error', 'always-multiline'],
            'eol-last': ['error', 'always'],
            'comma-spacing': ['error', { before: false, after: true }],
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];
