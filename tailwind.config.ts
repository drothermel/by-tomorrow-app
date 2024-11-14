import { skeleton } from '@skeletonlabs/tw-plugin';

export default {
  content: ['./src/**/*.{html,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    skeleton({
      themes: {
        preset: ['skeleton'],
      },
    }),
  ],
};