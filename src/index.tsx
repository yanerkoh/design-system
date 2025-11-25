import React from 'react'
import { TamaguiProvider, type TamaguiProviderProps, type TamaguiInternalConfig } from 'tamagui'

export * from './components/Button'
export * from './components/StepIndicator'
export * from './components/FormGroup'

import * as tamaguiConfigModule from './tamagui.config'
const tamaguiConfig = (tamaguiConfigModule as any).config as unknown as TamaguiInternalConfig

export function DesignSystemProvider(props: Omit<TamaguiProviderProps, 'config'> & { children?: React.ReactNode }) {
  const providerProps = props as TamaguiProviderProps
  return (
    <TamaguiProvider {...providerProps} config={tamaguiConfig}>
      {props.children}
    </TamaguiProvider>
  )
}