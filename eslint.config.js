// Import ESLint's recommended JavaScript rules
import js from '@eslint/js'

// Import predefined global variables (e.g., browser, Node.js)
import globals from 'globals'

// Import React Hooks linting rules
import reactHooks from 'eslint-plugin-react-hooks'

// Import React Refresh plugin for Vite (supports Hot Module Replacement)
import reactRefresh from 'eslint-plugin-react-refresh'

// Import helper functions for creating ESLint's flat configuration
import { defineConfig, globalIgnores } from 'eslint/config'

// Export the ESLint configuration
export default defineConfig([
  // Ignore the generated build folder during linting
  globalIgnores(['dist']),

  {
    // Apply these rules only to JavaScript and JSX files
    files: ['**/*.{js,jsx}'],

    // Extend recommended rule sets
    extends: [
      js.configs.recommended,           // Recommended JavaScript rules
      reactHooks.configs.flat.recommended, // React Hooks best practices
      reactRefresh.configs.vite,        // Vite React Refresh rules
    ],

    // Configure language options
    languageOptions: {
      ecmaVersion: 2020, // Enable ES2020 features

      // Define browser global variables (window, document, etc.)
      globals: globals.browser,

      // Configure parser options
      parserOptions: {
        ecmaVersion: 'latest',          // Use the latest ECMAScript syntax
        ecmaFeatures: { jsx: true },    // Enable JSX parsing
        sourceType: 'module',           // Use ES modules (import/export)
      },
    },

    // Custom linting rules
    rules: {
      // Report unused variables, except those starting with uppercase letters or "_"
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
