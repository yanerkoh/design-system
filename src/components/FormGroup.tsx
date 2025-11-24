import { YStack, XStack, Text, styled } from "tamagui";

const COLORS = {
  label: "#191919",
  description: "#6F6F6F",
  error: "#D0021B",
  requiredRed: "#D0021B",
};

export const FormGroupDXPlus = ({
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
      <XStack ai="center" gap="$1">
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
