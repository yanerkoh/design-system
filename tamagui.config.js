// Re-export the built config so consumers (and Tamagui bundler) can resolve it from node_modules
// tsup produces CJS build as dist/tamagui.config.cjs (when built with --format esm,cjs)
module.exports = require('./dist/tamagui.config.cjs');