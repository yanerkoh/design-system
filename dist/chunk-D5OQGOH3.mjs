// src/components/StepIndicator.tsx
import { styled, XStack, YStack, Text, View } from "tamagui";
import { jsx, jsxs } from "react/jsx-runtime";
var StepCircle = styled(View, {
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
var StepConnector = styled(View, {
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
  return /* @__PURE__ */ jsx(XStack, { alignItems: "center", gap: "$3", width: "100%", children: Array.from({ length: steps }).map((_, i) => {
    const index = i + 1;
    const status = index < current ? "completed" : index === current ? "active" : "inactive";
    return /* @__PURE__ */ jsxs(XStack, { flex: 1, alignItems: "center", children: [
      /* @__PURE__ */ jsxs(YStack, { alignItems: "center", gap: "$1", children: [
        /* @__PURE__ */ jsx(StepCircle, { status, children: /* @__PURE__ */ jsx(
          Text,
          {
            color: status === "completed" ? "white" : "#191919",
            fontWeight: "600",
            children: index
          }
        ) }),
        labels && labels[i] && /* @__PURE__ */ jsx(
          Text,
          {
            fontSize: 13,
            color: status === "completed" || status === "active" ? "#191919" : "#6F6F6F",
            children: labels[i]
          }
        )
      ] }),
      index !== steps && /* @__PURE__ */ jsx(StepConnector, { active: index < current })
    ] }, i);
  }) });
}

export {
  DXPlusStepIndicator
};
