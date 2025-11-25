// tamagui.config.js
import { createTamagui } from 'tamagui'
import { themes, tokens, shorthands } from '@tamagui/core'

import { Button } from './dist/components/Button'
import { FormGroup } from './dist/components/FormGroup'
import { DXPlusStepIndicator } from './dist/components/StepIndicator'

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
