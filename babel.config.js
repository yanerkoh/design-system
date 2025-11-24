export default {
  plugins: [
    [
      '@tamagui/babel-plugin',
      {
        exclude: /node_modules/,
        config: './tamagui.config.js',
        components: ['design-system', 'tamagui']
      },
    ],
  ],
}