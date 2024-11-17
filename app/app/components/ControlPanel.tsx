import { useState } from "react";
import { LuUserCircle, LuUsers } from "react-icons/lu";
import { Group } from "@chakra-ui/react";

import { Button } from "@/components/ui/button";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type ControlMode = "userList" | "profile";

export const ControlPanel = () => {
  const [controlMode, setControlMode] = useState<ControlMode>("userList");

  return (
    <DrawerRoot>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Group attached>
          <Button size="sm" onClick={() => setControlMode("userList")}>
            <LuUsers />
          </Button>
          <Button size="sm" onClick={() => setControlMode("profile")}>
            <LuUserCircle />
          </Button>
        </Group>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {(() => {
              switch (controlMode) {
                case "userList":
                  return "User List";
                case "profile":
                  return "Profile";
              }
            })()}
          </DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <p>
            {(() => {
              switch (controlMode) {
                case "userList":
                  return "User List";
                case "profile":
                  return "Profile";
              }
            })()}
          </p>
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};
