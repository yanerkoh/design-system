import {
  config
} from "./chunk-HQB4G7EQ.mjs";

// src/index.tsx
import { TamaguiProvider } from "tamagui";

// src/components/Button.tsx
import { styled, Button as TamaguiButton, Text } from "tamagui";
import { jsx } from "react/jsx-runtime";
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
var ButtonDXPlus = styled(TamaguiButton, {
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
  return /* @__PURE__ */ jsx(
    ButtonDXPlus,
    {
      variant,
      size,
      disabled,
      style: { backgroundColor: bgColor, borderColor },
      ...props,
      children: /* @__PURE__ */ jsx(Text, { fontWeight: 600, color: textColor, alignSelf: "center", children })
    }
  );
}

// src/components/StepIndicator.tsx
import { styled as styled2, XStack, YStack, Text as Text2, View } from "tamagui";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var StepCircle = styled2(View, {
  width: 32,
  height: 32,
  borderRadius: 9999,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 2,
  variants: {
    status: {
      inactive: {
        backgroundColor: "white",
        borderColor: "#C5C5C5"
        // DX+ grey
      },
      active: {
        backgroundColor: "white",
        borderColor: "#0355D0"
        // DX+ blue
      },
      completed: {
        backgroundColor: "#0355D0",
        // DX+ blue
        borderColor: "#0355D0"
      }
    }
  }
});
var StepConnector = styled2(View, {
  height: 2,
  flex: 1,
  variants: {
    active: {
      true: {
        backgroundColor: "#0355D0"
      },
      false: {
        backgroundColor: "#C5C5C5"
      }
    }
  }
});
function DXPlusStepIndicator({
  steps,
  current,
  labels
}) {
  return /* @__PURE__ */ jsx2(XStack, { alignItems: "center", gap: "$3", width: "100%", children: Array.from({ length: steps }).map((_, i) => {
    const index = i + 1;
    const status = index < current ? "completed" : index === current ? "active" : "inactive";
    return /* @__PURE__ */ jsxs(XStack, { flex: 1, alignItems: "center", children: [
      /* @__PURE__ */ jsxs(YStack, { alignItems: "center", gap: "$1", children: [
        /* @__PURE__ */ jsx2(StepCircle, { status, children: /* @__PURE__ */ jsx2(
          Text2,
          {
            color: status === "completed" ? "white" : "#191919",
            fontWeight: "600",
            children: index
          }
        ) }),
        labels && labels[i] && /* @__PURE__ */ jsx2(
          Text2,
          {
            fontSize: 13,
            color: status === "completed" || status === "active" ? "#191919" : "#6F6F6F",
            children: labels[i]
          }
        )
      ] }),
      index !== steps && /* @__PURE__ */ jsx2(StepConnector, { active: index < current })
    ] }, i);
  }) });
}

// src/components/FormGroup.tsx
import { YStack as YStack2, XStack as XStack2, Text as Text3 } from "tamagui";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var COLORS2 = {
  label: "#191919",
  description: "#6F6F6F",
  error: "#D0021B",
  requiredRed: "#D0021B"
};
function FormGroup({ label, description, error, children }) {
  return (
    // use full prop name alignItems instead of shorthand `ai`
    /* @__PURE__ */ jsxs2(YStack2, { alignItems: "flex-start", gap: "$1", children: [
      label && /* @__PURE__ */ jsx3(Text3, { children: label }),
      description && /* @__PURE__ */ jsx3(Text3, { children: description }),
      children,
      error && /* @__PURE__ */ jsx3(Text3, { children: error })
    ] })
  );
}
var FormGroupDXPlus = ({
  label,
  required = false,
  description,
  error,
  children,
  spacing = "$4"
  // default 16px spacing between groups
}) => {
  return /* @__PURE__ */ jsxs2(YStack2, { width: "100%", gap: "$2", marginBottom: spacing, children: [
    /* @__PURE__ */ jsxs2(XStack2, { alignItems: "center", gap: "$1", children: [
      /* @__PURE__ */ jsx3(
        Text3,
        {
          fontSize: 14,
          fontWeight: "600",
          color: COLORS2.label,
          children: label
        }
      ),
      required && /* @__PURE__ */ jsx3(
        Text3,
        {
          fontSize: 14,
          fontWeight: "600",
          color: COLORS2.requiredRed,
          children: "*"
        }
      )
    ] }),
    description && /* @__PURE__ */ jsx3(
      Text3,
      {
        fontSize: 13,
        color: COLORS2.description,
        children: description
      }
    ),
    children,
    error && /* @__PURE__ */ jsx3(
      Text3,
      {
        fontSize: 13,
        color: COLORS2.error,
        children: error
      }
    )
  ] });
};

// src/index.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var tamaguiConfig = config;
function DesignSystemProvider(props) {
  const providerProps = props;
  return /* @__PURE__ */ jsx4(TamaguiProvider, { ...providerProps, config: tamaguiConfig, children: props.children });
}
export {
  Button,
  ButtonDXPlus,
  DXPlusStepIndicator,
  DesignSystemProvider,
  FormGroup,
  FormGroupDXPlus
};
