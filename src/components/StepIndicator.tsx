import { styled, XStack, YStack, Text, View } from "tamagui";

const StepCircle = styled(View, {
  width: 32,
  height: 32,
  borderRadius: 9999,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 2,

  variants: {
    status: {
      inactive: {
        backgroundColor: "white",
        borderColor: "#C5C5C5", // DX+ grey
      },
      active: {
        backgroundColor: "white",
        borderColor: "#0355D0", // DX+ blue
      },
      completed: {
        backgroundColor: "#0355D0", // DX+ blue
        borderColor: "#0355D0",
      },
    },
  },
});

const StepConnector = styled(View, {
  height: 2,
  flex: 1,

  variants: {
    active: {
      true: {
        backgroundColor: "#0355D0",
      },
      false: {
        backgroundColor: "#C5C5C5",
      },
    },
  },
});

export function DXPlusStepIndicator({
  steps,
  current,
  labels,
}: {
  steps: number;
  current: number;
  labels?: string[];
}) {
  return (
    <XStack alignItems="center" gap="$3" width="100%">
      {Array.from({ length: steps }).map((_, i) => {
        const index = i + 1;

        const status =
          index < current
            ? "completed"
            : index === current
            ? "active"
            : "inactive";

        return (
          <XStack key={i} flex={1} alignItems="center">
            <YStack alignItems="center" gap="$1">
              <StepCircle status={status}>
                <Text
                  color={
                    status === "completed" ? "white" : "#191919"
                  }
                  fontWeight="600"
                >
                  {index}
                </Text>
              </StepCircle>

              {/* Optional step label below */}
              {labels && labels[i] && (
                <Text
                  fontSize={13}
                  color={
                    status === "completed" || status === "active"
                      ? "#191919"
                      : "#6F6F6F"
                  }
                >
                  {labels[i]}
                </Text>
              )}
            </YStack>

            {/* Connectors (skip last circle) */}
            {index !== steps && (
              <StepConnector active={index < current} />
            )}
          </XStack>
        );
      })}
    </XStack>
  );
}
