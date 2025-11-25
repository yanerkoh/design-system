// tamagui.config.js
import { createTamagui } from 'tamagui'
import { themes, tokens, shorthands } from '@tamagui/core'

import { Button } from './src/components/Button'
import { FormGroup } from './src/components/FormGroup'
// import the actual export name and alias it for the config
import { DXPlusStepIndicator } from './src/components/StepIndicator'

export const config = createTamagui({
  themes,
  tokens,
  shorthands,
  components: {
    Button,
    FormGroup,
    // register the DXPlusStepIndicator under the StepIndicator key
    StepIndicator: DXPlusStepIndicator,
  },
})

export default config
