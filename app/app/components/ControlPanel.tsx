import { useState, useEffect } from "react";
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

import type { User } from "@/types";

type ControlMode = "userList" | "profile";

export const ControlPanel = () => {
  const [controlMode, setControlMode] = useState<ControlMode>("userList");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/fixtures/users.json');
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

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
          {(() => {
            switch (controlMode) {
              case "userList":
                return (
                  <ul>
                    {users.map((user) => (
                      <li key={user.id}>{user.name}</li>
                    ))}
                  </ul>
                );
              case "profile":
                return "Profile";
            }
          })()}
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};
