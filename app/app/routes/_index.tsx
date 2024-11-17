import type { MetaFunction } from "@remix-run/node";
import { useState, useRef } from "react";

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

import { ColorModeButton } from "@/components/ui/color-mode";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";

import { ControlPanel } from "@/components/ControlPanel";

export const meta: MetaFunction = () => {
  return [
    { title: "Testing DX Chat" },
    { name: "description", content: "Let's awesome tests!" },
  ];
};

const messages = [
  {
    id: "message-1",
    author: "Will",
    content: "This is a message",
    timeCreated: Date.now() - 3000,
  },
  {
    id: "message-2",
    author: "Will",
    content:
      "This is a really long message. It will wrap a couple lines so we can see how the max width looks.",
    timeCreated: Date.now() - 2000,
  },
  {
    id: "message-3",
    author: "Will",
    content: "This will be a reply",
    timeCreated: Date.now() - 1000,
    parentMessage: "message-2",
  },
];

const reactions = [];

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

export default function Index() {
  const [nextId, setNextId] = useState(3);
  const messageRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (!messageRef.current?.value) return;

    messages.push({
      author: "Will",
      id: `message-${nextId}`,
      content: messageRef.current.value,
      timeCreated: Date.now(),
    });

    setNextId(nextId + 1);

    messageRef.current.value = "";
  };

  return (
    <Box fontSize="xl" pt="30vh">
      <VStack gap="8">
        <Heading size="2xl" letterSpacing="tight">
          Testing DX Chat
        </Heading>

        <DataListRoot orientation="horizontal" width={600}>
          {messages.map((message) => (
            <DataListItem
              key={message.id}
              label={
                message.author + " at " + dateFormat.format(message.timeCreated)
              }
              value={message.content}
            />
          ))}
        </DataListRoot>

        <Group width="90%" justifyContent="center">
          <Input ref={messageRef} width="100%" maxWidth={600} />
          <Button onClick={sendMessage}>Send</Button>
        </Group>
      </VStack>

      <Box pos="absolute" top="4" right="4">
        <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
          <ColorModeButton />
          <ControlPanel />
        </ClientOnly>
      </Box>
    </Box>
  );
}
