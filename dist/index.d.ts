import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';
import * as tamagui from 'tamagui';
import { TamaguiProviderProps } from 'tamagui';
import * as _tamagui_core_types from '@tamagui/core/types';
import * as _tamagui_web_types from '@tamagui/web/types';

declare const ButtonDXPlus: tamagui.TamaguiComponent<_tamagui_web_types.TamaDefer, tamagui.TamaguiElement, _tamagui_core_types.RNTamaguiViewNonStyleProps & tamagui.TextContextStyles & {
    textProps?: Partial<tamagui.SizableTextProps>;
    noTextWrap?: boolean;
} & _tamagui_web_types.ThemeableProps & {
    icon?: React.JSX.Element | React.FunctionComponent<{
        color?: any;
        size?: any;
    }> | ((props: {
        color?: any;
        size?: any;
    }) => any) | null;
    iconAfter?: React.JSX.Element | React.FunctionComponent<{
        color?: any;
        size?: any;
    }> | ((props: {
        color?: any;
        size?: any;
    }) => any) | null;
    scaleIcon?: number;
    spaceFlex?: number | boolean;
    scaleSpace?: number;
    unstyled?: boolean;
}, _tamagui_web_types.StackStyleBase, {
    size?: number | tamagui.SizeTokens | undefined;
    variant?: "outlined" | undefined;
    disabled?: boolean | undefined;
    elevation?: number | tamagui.SizeTokens | undefined;
    inset?: number | tamagui.SizeTokens | {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    } | null | undefined;
    unstyled?: boolean | undefined;
    transparent?: boolean | undefined;
    fullscreen?: boolean | undefined;
    circular?: boolean | undefined;
    hoverTheme?: boolean | undefined;
    pressTheme?: boolean | undefined;
    focusTheme?: boolean | undefined;
    elevate?: boolean | undefined;
    bordered?: number | boolean | undefined;
    backgrounded?: boolean | undefined;
    radiused?: boolean | undefined;
    padded?: boolean | undefined;
    chromeless?: boolean | "all" | undefined;
}, _tamagui_web_types.StaticConfigPublic>;
type Props = {
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary';
    size?: 's' | 'm' | 'l';
    status?: 'default' | 'success' | 'error' | 'warning';
    disabled?: boolean;
    [key: string]: any;
};
declare function Button({ children, variant, size, status, disabled, ...props }: Props): react_jsx_runtime.JSX.Element;

declare function DXPlusStepIndicator({ steps, current, labels, }: {
    steps: number;
    current: number;
    labels?: string[];
}): react_jsx_runtime.JSX.Element;

type FormGroupProps = {
    label?: string;
    description?: string;
    error?: string;
    children?: React.ReactNode;
};
declare function FormGroup({ label, description, error, children }: FormGroupProps): react_jsx_runtime.JSX.Element;
type FormGroupDXPlusProps = {
    label?: string;
    required?: boolean;
    description?: string;
    error?: string;
    children?: React.ReactNode;
    spacing?: string | number;
};
declare const FormGroupDXPlus: React.FC<FormGroupDXPlusProps>;

declare function DesignSystemProvider(props: Omit<TamaguiProviderProps, 'config'> & {
    children?: React.ReactNode;
}): react_jsx_runtime.JSX.Element;

export { Button, ButtonDXPlus, DXPlusStepIndicator, DesignSystemProvider, FormGroup, FormGroupDXPlus };
