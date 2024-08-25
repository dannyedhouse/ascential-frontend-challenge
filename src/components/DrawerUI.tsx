import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@chakra-ui/react";
import React from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerUI: React.FC<DrawerProps> = ({ isOpen, onClose }: DrawerProps) => (
  <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>Favourites</DrawerHeader>

      <DrawerBody></DrawerBody>

      <DrawerFooter>
        <Button variant="outline" onClick={onClose} w={"100%"}>
          Close
        </Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

export default DrawerUI;
