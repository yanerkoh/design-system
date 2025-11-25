// tamagui.config.js
import { createTamagui } from 'tamagui'
import { themes } from 'tamagui/themes'
import { tokens } from 'tamagui/tokens'
import { shorthands } from 'tamagui/shorthands'

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
