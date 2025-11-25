// src/components/FormGroup.tsx
import { YStack, XStack, Text } from "tamagui";
import { jsx, jsxs } from "react/jsx-runtime";
var COLORS = {
  label: "#191919",
  description: "#6F6F6F",
  error: "#D0021B",
  requiredRed: "#D0021B"
};
function FormGroup({ label, description, error, children }) {
  return (
    // use full prop name alignItems instead of shorthand `ai`
    /* @__PURE__ */ jsxs(YStack, { alignItems: "flex-start", gap: "$1", children: [
      label && /* @__PURE__ */ jsx(Text, { children: label }),
      description && /* @__PURE__ */ jsx(Text, { children: description }),
      children,
      error && /* @__PURE__ */ jsx(Text, { children: error })
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
  return /* @__PURE__ */ jsxs(YStack, { width: "100%", gap: "$2", marginBottom: spacing, children: [
    /* @__PURE__ */ jsxs(XStack, { alignItems: "center", gap: "$1", children: [
      /* @__PURE__ */ jsx(
        Text,
        {
          fontSize: 14,
          fontWeight: "600",
          color: COLORS.label,
          children: label
        }
      ),
      required && /* @__PURE__ */ jsx(
        Text,
        {
          fontSize: 14,
          fontWeight: "600",
          color: COLORS.requiredRed,
          children: "*"
        }
      )
    ] }),
    description && /* @__PURE__ */ jsx(
      Text,
      {
        fontSize: 13,
        color: COLORS.description,
        children: description
      }
    ),
    children,
    error && /* @__PURE__ */ jsx(
      Text,
      {
        fontSize: 13,
        color: COLORS.error,
        children: error
      }
    )
  ] });
};

export {
  FormGroup,
  FormGroupDXPlus
};
