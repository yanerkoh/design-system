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
var tamagui_config_default = config;

export {
  config,
  tamagui_config_default
};
