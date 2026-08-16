import react from '@eslint-react/eslint-plugin'
import js from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import pluginRouter from '@tanstack/eslint-plugin-router'
import eslintConfigPrettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

// Vendored shadcn/ui source - we don't want lint noise from generated component
// code that we may regenerate via the `bun ui` script. Mirrors the same
// treatment in apps/web/biome.json.
const vendoredShadcnGlobs = [
  'src/lib/sharedComponents/ui/**',
  'src/lib/hooks/use-mobile.ts',
  'src/routes/_authenticated/_app/settings/account/-components/account-form.tsx',
]

export default tseslint.config(
  {
    ignores: [
      'dist',
      '.vinxi',
      '.wrangler',
      '.vercel',
      '.netlify',
      '.output',
      'build/',
      ...vendoredShadcnGlobs,
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier,
      ...pluginQuery.configs['flat/recommended'],
      ...pluginRouter.configs['flat/recommended'],
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    ...react.configs['recommended-type-checked'],
  },
  {
    rules: {
      // You can override any rules here
    },
  },
)
