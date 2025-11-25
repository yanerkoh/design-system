"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/components/FormGroup.tsx
var _tamagui = require('tamagui');
var _jsxruntime = require('react/jsx-runtime');
var COLORS = {
  label: "#191919",
  description: "#6F6F6F",
  error: "#D0021B",
  requiredRed: "#D0021B"
};
function FormGroup({ label, description, error, children }) {
  return (
    // use full prop name alignItems instead of shorthand `ai`
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _tamagui.YStack, { alignItems: "flex-start", gap: "$1", children: [
      label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _tamagui.Text, { children: label }),
      description && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _tamagui.Text, { children: description }),
      children,
      error && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _tamagui.Text, { children: error })
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
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _tamagui.YStack, { width: "100%", gap: "$2", marginBottom: spacing, children: [
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _tamagui.XStack, { alignItems: "center", gap: "$1", children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        _tamagui.Text,
        {
          fontSize: 14,
          fontWeight: "600",
          color: COLORS.label,
          children: label
        }
      ),
      required && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        _tamagui.Text,
        {
          fontSize: 14,
          fontWeight: "600",
          color: COLORS.requiredRed,
          children: "*"
        }
      )
    ] }),
    description && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      _tamagui.Text,
      {
        fontSize: 13,
        color: COLORS.description,
        children: description
      }
    ),
    children,
    error && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      _tamagui.Text,
      {
        fontSize: 13,
        color: COLORS.error,
        children: error
      }
    )
  ] });
};




exports.FormGroup = FormGroup; exports.FormGroupDXPlus = FormGroupDXPlus;
