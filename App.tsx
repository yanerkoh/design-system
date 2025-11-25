import { TamaguiProvider, View } from '@tamagui/core'
import type { TamaguiInternalConfig } from '@tamagui/web'
import { config } from './src/tamagui.config' // your configuration

export default function App() {
  return (
    <TamaguiProvider config={config as unknown as TamaguiInternalConfig}>
      <View width={200} height={200} backgroundColor="$background" />
    </TamaguiProvider>
  )
}