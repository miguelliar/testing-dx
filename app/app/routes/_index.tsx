import {
  Box,
  Button,
  Checkbox,
  ClientOnly,
  Group,
  HStack,
  Heading,
  Input,
  Progress,
  RadioGroup,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import type { MetaFunction } from "@remix-run/node";
import { ColorModeButton } from "../components/ui/color-mode";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Box textAlign="center" fontSize="xl" pt="30vh">
      <VStack gap="8">
        <Heading size="2xl" letterSpacing="tight">
          Welcome to Chakra UI v3 + Remix
        </Heading>

        <HStack gap="10">
          <Checkbox.Root defaultChecked>
            <Checkbox.HiddenInput />
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label>Checkbox</Checkbox.Label>
          </Checkbox.Root>

          <RadioGroup.Root display="inline-flex" defaultValue="1">
            <RadioGroup.Item value="1" mr="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl>
                <RadioGroup.ItemIndicator />
              </RadioGroup.ItemControl>
              <RadioGroup.ItemText lineHeight="1">Radio</RadioGroup.ItemText>
            </RadioGroup.Item>

            <RadioGroup.Item value="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl>
                <RadioGroup.ItemIndicator />
              </RadioGroup.ItemControl>
              <RadioGroup.ItemText lineHeight="1">Radio</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        </HStack>

        <Progress.Root width="300px" value={65} striped animated>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>

        <HStack>
          <Button>Lets go</Button>
          <Button variant="outline">bun install @chakra-ui/react</Button>
        </HStack>

        <Group width="90%">
          <Input width="100%" />
          <Button>Send</Button>
        </Group>
      </VStack>

      <Box pos="absolute" top="4" right="4">
        <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
          <ColorModeButton />
        </ClientOnly>
      </Box>
    </Box>
  );
}
