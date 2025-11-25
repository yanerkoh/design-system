import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import * as tamagui from 'tamagui';
import * as _tamagui_core from '@tamagui/core';
import { GetProps } from '@tamagui/core';

declare const ButtonDXPlus: tamagui.TamaguiComponent<_tamagui_core.TamaDefer, tamagui.TamaguiElement, _tamagui_core.RNTamaguiViewNonStyleProps & tamagui.TextContextStyles & {
    textProps?: Partial<tamagui.SizableTextProps>;
    noTextWrap?: boolean;
} & _tamagui_core.ThemeableProps & {
    icon?: react.JSX.Element | react.FunctionComponent<{
        color?: any;
        size?: any;
    }> | ((props: {
        color?: any;
        size?: any;
    }) => any) | null;
    iconAfter?: react.JSX.Element | react.FunctionComponent<{
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
}, _tamagui_core.StackStyleBase, {
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
}, _tamagui_core.StaticConfigPublic>;
type BaseButtonProps = GetProps<typeof ButtonDXPlus>;
type ButtonProps = Omit<BaseButtonProps, 'variant' | 'size' | 'status'> & {
    variant?: 'primary' | 'secondary';
    size?: 's' | 'm' | 'l';
    status?: 'default' | 'success' | 'error' | 'warning';
};
declare function Button({ children, variant, size, status, disabled, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;

export { Button, ButtonDXPlus, ButtonProps, Button as default };
