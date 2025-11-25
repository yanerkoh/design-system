import * as react_jsx_runtime from 'react/jsx-runtime';
import * as _tamagui_core_types from '@tamagui/core/types';
import * as tamagui from 'tamagui';
import * as _tamagui_web_types from '@tamagui/web/types';
import React from 'react';

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

export { Button, ButtonDXPlus, Button as default };
