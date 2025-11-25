import { YStack, XStack, Text, styled } from "tamagui";
import React from 'react';

const COLORS = {
  label: "#191919",
  description: "#6F6F6F",
  error: "#D0021B",
  requiredRed: "#D0021B",
};

type FormGroupProps = {
  label?: string
  description?: string
  error?: string
  children?: React.ReactNode
}

export function FormGroup({ label, description, error, children }: FormGroupProps) {
  return (
    // use full prop name alignItems instead of shorthand `ai`
    <YStack alignItems="flex-start" gap="$1">
      {label && <Text>{label}</Text>}
      {description && <Text>{description}</Text>}
      {children}
      {error && <Text>{error}</Text>}
    </YStack>
  )
}

type FormGroupDXPlusProps = {
  label?: string
  required?: boolean
  description?: string
  error?: string
  children?: React.ReactNode
  spacing?: string | number
}

export const FormGroupDXPlus: React.FC<FormGroupDXPlusProps> = ({
  label,
  required = false,
  description,
  error,
  children,
  spacing = "$4", // default 16px spacing between groups
}) => {
  return (
    <YStack width="100%" gap="$2" marginBottom={spacing}>
      {/* Label + Required Asterisk */}
      <XStack alignItems="center" gap="$1">
        <Text
          fontSize={14}
          fontWeight="600"
          color={COLORS.label}
        >
          {label}
        </Text>

        {required && (
          <Text
            fontSize={14}
            fontWeight="600"
            color={COLORS.requiredRed}
          >
            *
          </Text>
        )}
      </XStack>

      {/* Optional Description */}
      {description && (
        <Text
          fontSize={13}
          color={COLORS.description}
        >
          {description}
        </Text>
      )}

      {/* The actual input component */}
      {children}

      {/* Optional Error Message */}
      {error && (
        <Text
          fontSize={13}
          color={COLORS.error}
        >
          {error}
        </Text>
      )}
    </YStack>
  );
};
