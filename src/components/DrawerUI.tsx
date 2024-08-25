import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  List,
  Text,
  ListItem,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { useFavourites } from "../context/FavouritesContext";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerUI: React.FC<DrawerProps> = ({ isOpen, onClose }: DrawerProps) => {
  const { favourites, removeFavourite } = useFavourites();
  const navigate = useNavigate();

  function onNavigate(id: string, type: "event" | "venue") {
    navigate(`/${type}s/${id}`);
    onClose();
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Favourites</DrawerHeader>

        <DrawerBody>
          {favourites.length === 0 ? (
            <Text align={"center"}>
              You currently have no favourites! Click on the star icon next to
              an event or venue to add one.
            </Text>
          ) : (
            <List gap={2}>
              {favourites.map((item) => (
                <ListItem key={item.id}>
                  <Button
                    variant="link"
                    onClick={() => onNavigate(item.id, item.type)}
                  >
                    {item.name}
                  </Button>
                  <IconButton
                    onClick={() => removeFavourite(item.id)}
                    icon={<DeleteIcon />}
                    aria-label={"remove favourite"}
                  ></IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" onClick={onClose} w={"100%"}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerUI;
