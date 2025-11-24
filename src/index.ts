import React from 'react'
import { TamaguiProvider, TamaguiProviderProps } from 'tamagui'
export * from './components/Button'
export * from './components/StepIndicator'
export * from './components/FormGroup'
export { config as tamaguiConfig } from '../tamagui.config'

export function DesignSystemProvider(props: Omit<TamaguiProviderProps, 'config'> & { children?: React.ReactNode }) {
  // consumers can use this to ensure the provider uses your config
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <TamaguiProvider {...(props as TamaguiProviderProps)} config={require('../tamagui.config').config}>{props.children}</TamaguiProvider>
}