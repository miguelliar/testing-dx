import {
  Box,
  Button,
  ClientOnly,
  Group,
  Heading,
  Input,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import type { MetaFunction } from "@remix-run/node";
import { useState, useRef } from "react";

import { ColorModeButton } from "@/components/ui/color-mode";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const messages = [
  {
    id: "message-1",
    author: "Will",
    content: "This is a message",
  },
];

export default function Index() {
  const [nextId, setNextId] = useState(2);
  const messageRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (!messageRef.current?.value) return;

    messages.push({
      author: "Will",
      id: `message-${nextId}`,
      content: messageRef.current.value,
    });

    setNextId(nextId + 1);

    messageRef.current.value = "";
  };

  return (
    <Box textAlign="center" fontSize="xl" pt="30vh">
      <VStack gap="8">
        <Heading size="2xl" letterSpacing="tight">
          Testing DX Chat
        </Heading>

        <DataListRoot orientation="horizontal">
          {messages.map((message) => (
            <DataListItem
              key={message.id}
              label={message.author}
              value={message.content}
            />
          ))}
        </DataListRoot>

        <Group width="90%">
          <Input ref={messageRef} width="100%" />
          <Button onClick={sendMessage}>Send</Button>
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
