import {
  config
} from "./chunk-HQB4G7EQ.mjs";
import {
  Button
} from "./chunk-YN3OTW4H.mjs";
import {
  FormGroup
} from "./chunk-MY34L3OW.mjs";
import {
  DXPlusStepIndicator
} from "./chunk-D5OQGOH3.mjs";

// src/index.tsx
import { TamaguiProvider } from "tamagui";
import { jsx } from "react/jsx-runtime";
var tamaguiConfig = config;
function DesignSystemProvider(props) {
  const providerProps = props;
  return /* @__PURE__ */ jsx(TamaguiProvider, { ...providerProps, config: tamaguiConfig, children: props.children });
}
export {
  Button,
  DesignSystemProvider,
  FormGroup,
  DXPlusStepIndicator as StepIndicator
};
