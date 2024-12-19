// @ts-check
import eslint from '@eslint/js'
import vue from 'eslint-plugin-vue'
import tailwind from 'eslint-plugin-tailwindcss'
import tseslint from 'typescript-eslint'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  ...tailwind.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': ['error', {
        ignores: ['index', 'about', 'Button'],
      }],
    },
  },
)
