import { styled, Pressable, Text } from "tamagui";

// Colors and tokens from CSS
const COLORS = {
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
  disabledShadow: "none",
};

export const ButtonDXPlus = styled(Pressable, {
  name: "ButtonDXPlus",
  borderRadius: 8,
  display: "inline-flex",
  verticalAlign: "bottom",
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
        borderColor: COLORS.primary,
      },
      secondary: {
        backgroundColor: COLORS.secondary,
        borderWidth: 1,
        borderColor: COLORS.secondaryBorder,
      },
    },
    size: {
      s: { padding: ".1875rem .4375rem" },
      m: { padding: ".4375rem 1.4375rem" },
      l: { padding: ".625rem 1.4375rem" },
    },
    disabled: {
      true: {
        cursor: "not-allowed",
        boxShadow: COLORS.disabledShadow,
        backgroundColor: COLORS.primaryDisabled,
        color: "#fff",
        borderColor: COLORS.primaryDisabled,
      },
    },
    status: {
      default: {},
      success: {},
      error: {},
      warning: {},
    },
  },

  hoverStyle: {
    transform: "translateY(-.0625rem)",
    boxShadow: COLORS.shadow,
  },
  pressStyle: {
    transform: "none",
    boxShadow: "none",
  },
});

export function Button({
  children,
  variant = "primary",
  size = "m",
  status = "default",
  disabled = false,
  ...props
}) {
  // Compute colors based on status
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

    if (status === "success") borderColor = COLORS.primarySuccess;
    if (status === "error") borderColor = COLORS.primaryError;
    if (status === "warning") borderColor = COLORS.primaryWarning;
  }

  if (disabled) {
    bgColor = COLORS.primaryDisabled;
    textColor = "#fff";
    borderColor = COLORS.primaryDisabled;
  }

  return (
    <ButtonDXPlus
      variant={variant}
      size={size}
      disabled={disabled}
      style={{ backgroundColor: bgColor, borderColor }}
      {...props}
    >
      <Text
        style={{ color: textColor, textAlign: "center", fontWeight: 600 }}
      >
        {children}
      </Text>
    </ButtonDXPlus>
  );
}
