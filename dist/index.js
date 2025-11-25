"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkV4M2EKNDjs = require('./chunk-V4M2EKND.js');


var _chunkK6JYV22Vjs = require('./chunk-K6JYV22V.js');


var _chunkYG7RJOJNjs = require('./chunk-YG7RJOJN.js');


var _chunkKD6A6CYYjs = require('./chunk-KD6A6CYY.js');

// src/index.tsx
var _tamagui = require('tamagui');
var _jsxruntime = require('react/jsx-runtime');
var tamaguiConfig = _chunkV4M2EKNDjs.config;
function DesignSystemProvider(props) {
  const providerProps = props;
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _tamagui.TamaguiProvider, { ...providerProps, config: tamaguiConfig, children: props.children });
}





exports.Button = _chunkK6JYV22Vjs.Button; exports.DesignSystemProvider = DesignSystemProvider; exports.FormGroup = _chunkYG7RJOJNjs.FormGroup; exports.StepIndicator = _chunkKD6A6CYYjs.DXPlusStepIndicator;
