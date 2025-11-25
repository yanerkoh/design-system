"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/components/Button.tsx
var _tamagui = require('tamagui');
var _jsxruntime = require('react/jsx-runtime');
var COLORS = {
  primary: "#ffc23e",
  primaryHover: "#ffc23e",
  primaryActive: "#ffc23e",
  primaryText: "#0c0d0d",
  primarySuccess: "#008700",
  primarySuccessHover: "#007200",
  primaryError: "#cc3123",
  primaryErrorHover: "#b02215",
  primaryWarning: "#c75000",
  primaryDisabled: "#d3d3d3",
  secondary: "#fff",
  secondaryBorder: "#c75000",
  secondaryText: "#c75000",
  secondaryDisabled: "#d3d3d3",
  shadow: "0 6px 10px rgba(0,0,0,.14),0 1px 18px rgba(0,0,0,.12)",
  disabledShadow: "none"
};
var ButtonDXPlus = _tamagui.styled.call(void 0, _tamagui.Button, {
  name: "ButtonDXPlus",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  outlineOffset: 0,
  userSelect: "none",
  transitionProperty: "box-shadow, transform",
  transitionDuration: ".175s",
  transitionTimingFunction: "ease",
  variants: {
    variant: {
      primary: {
        backgroundColor: COLORS.primary,
        borderWidth: 1,
        borderColor: COLORS.primary
      },
      secondary: {
        backgroundColor: COLORS.secondary,
        borderWidth: 1,
        borderColor: COLORS.secondaryBorder
      }
    },
    size: {
      s: { paddingVertical: 6, paddingHorizontal: 7 },
      m: { paddingVertical: 10, paddingHorizontal: 23 },
      l: { paddingVertical: 15, paddingHorizontal: 23 }
    },
    disabled: {
      true: {
        cursor: "not-allowed",
        boxShadow: COLORS.disabledShadow,
        backgroundColor: COLORS.primaryDisabled,
        color: "#fff",
        borderColor: COLORS.primaryDisabled
      }
    },
    status: {
      default: {},
      success: {},
      error: {},
      warning: {}
    }
  },
  hoverStyle: {
    transform: "translateY(-0.0625rem)",
    boxShadow: COLORS.shadow
  },
  pressStyle: {
    transform: "none",
    boxShadow: "none"
  }
});
function Button({
  children,
  variant = "primary",
  size = "m",
  status = "default",
  disabled = false,
  ...props
}) {
  let bgColor = COLORS.primary;
  let textColor = COLORS.primaryText;
  let borderColor = COLORS.primary;
  if (variant === "primary") {
    if (status === "success") {
      bgColor = COLORS.primarySuccess;
      textColor = "#fff";
      borderColor = COLORS.primarySuccess;
    } else if (status === "error") {
      bgColor = COLORS.primaryError;
      textColor = "#fff";
      borderColor = COLORS.primaryError;
    } else if (status === "warning") {
      bgColor = COLORS.primaryWarning;
      textColor = "#fff";
      borderColor = COLORS.primaryWarning;
    }
  }
  if (variant === "secondary") {
    bgColor = COLORS.secondary;
    textColor = COLORS.secondaryText;
    borderColor = COLORS.secondaryBorder;
    if (status === "success")
      borderColor = COLORS.primarySuccess;
    if (status === "error")
      borderColor = COLORS.primaryError;
    if (status === "warning")
      borderColor = COLORS.primaryWarning;
  }
  if (disabled) {
    bgColor = COLORS.primaryDisabled;
    textColor = "#fff";
    borderColor = COLORS.primaryDisabled;
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    ButtonDXPlus,
    {
      variant,
      size,
      disabled,
      style: { backgroundColor: bgColor, borderColor },
      ...props,
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _tamagui.Text, { fontWeight: 600, color: textColor, alignSelf: "center", children })
    }
  );
}
var Button_default = Button;





exports.ButtonDXPlus = ButtonDXPlus; exports.Button = Button; exports.Button_default = Button_default;
