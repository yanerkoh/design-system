// tamagui.config.js
import { createTamagui } from 'tamagui'
import { themes, tokens, shorthands } from '@tamagui/core'

import { Button } from './src/components/Button'
import { FormGroup } from './src/components/FormGroup'
import { StepIndicator } from './src/components/StepIndicator'

export default createTamagui({
  themes,
  tokens,
  shorthands,
  components: {
    Button,
    FormGroup,
    StepIndicator,
  },
})
