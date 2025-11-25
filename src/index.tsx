import React from 'react'
import { TamaguiProvider, TamaguiProviderProps } from 'tamagui'
export * from './components/Button'
export * from './components/StepIndicator'
export * from './components/FormGroup'
import { config as tamaguiConfig } from '../tamagui.config'

export function DesignSystemProvider(props: Omit<TamaguiProviderProps, 'config'> & { children?: React.ReactNode }) {
  const providerProps = props as TamaguiProviderProps
  return (
    <TamaguiProvider {...providerProps} config={tamaguiConfig}>
      {props.children}
    </TamaguiProvider>
  )
}