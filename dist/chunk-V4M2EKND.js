"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/tamagui.config.ts
var _v4 = require('@tamagui/config/v4');
var _tamagui = require('tamagui');
var config = _tamagui.createTamagui.call(void 0, {
  ..._v4.defaultConfig,
  media: {
    ..._v4.defaultConfig.media
    // add your own media queries here, if wanted
  }
});
var tamagui_config_default = config;




exports.config = config; exports.tamagui_config_default = tamagui_config_default;
