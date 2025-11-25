// tamagui.config.js
import { createTamagui } from 'tamagui'
import { themes, tokens, shorthands } from '@tamagui/core'

import { Button } from './dist/components/Button'
import { FormGroup } from './dist/components/FormGroup'
import { StepIndicator } from './dist/components/StepIndicator'

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
