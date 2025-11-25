import { defaultConfig } from '@tamagui/config/v4'
import { createTamagui } from 'tamagui'

export const config = createTamagui(({
  ...(defaultConfig as any),
  media: {
    ...(defaultConfig as any).media,
    // add your own media queries here, if wanted
  },
}) as any)

export default config
