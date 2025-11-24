export default {
  plugins: [
    [
      '@tamagui/babel-plugin',
      {
        exclude: /node_modules/,
        config: './tamagui.config.ts',
        components: ['@design-system', 'tamagui']
      },
    ],
  ],
}