import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';
import { TamaguiProviderProps } from 'tamagui';
export { default as Button } from './components/Button.js';
export { FormGroup } from './components/FormGroup.js';
export { DXPlusStepIndicator as StepIndicator } from './components/StepIndicator.js';
import '@tamagui/core';

declare function DesignSystemProvider(props: Omit<TamaguiProviderProps, 'config'> & {
    children?: React.ReactNode;
}): react_jsx_runtime.JSX.Element;

export { DesignSystemProvider };
