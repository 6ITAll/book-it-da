import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  'stories': ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  'addons': [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@storybook/experimental-addon-test',
  ],
  'framework': {
    'name': '@storybook/react-vite',
    'options': {},
  },
  staticDirs: ['../public'],
};
export default config;
