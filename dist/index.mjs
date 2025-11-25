import {
  Button
} from "./chunk-I66ZWTEH.mjs";
import {
  FormGroup
} from "./chunk-MY34L3OW.mjs";
import {
  DXPlusStepIndicator
} from "./chunk-D5OQGOH3.mjs";
import "./chunk-EXJ4UK7Q.mjs";

// src/index.tsx
import { TamaguiProvider } from "tamagui";

// src/tamagui.config.ts
import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";
var config = createTamagui({
  ...defaultConfig,
  media: {
    ...defaultConfig.media
    // add your own media queries here, if wanted
  }
});

// src/index.tsx
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
