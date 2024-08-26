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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useFavourites } from "../context/FavouritesContext";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FavouritesDrawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
}: DrawerProps) => {
  const { favourites, removeFavourite } = useFavourites();
  const navigate = useNavigate();

  function onNavigate(id: number, type: "event" | "venue") {
    navigate(`/${type}s/${id}`);
    onClose();
  }

  const eventFavourites = favourites.filter((item) => item.type === "event");
  const venueFavourites = favourites.filter((item) => item.type === "venue");

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Favourites</DrawerHeader>

        <DrawerBody>
          {favourites.length === 0 ? (
            <Text align={"center"} data-testid="empty-favourites-drawer">
              You currently have no favourites! Click on the star icon next to
              an event or venue to add one.
            </Text>
          ) : (
            <Tabs variant="enclosed">
              <TabList>
                <Tab>Events</Tab>
                <Tab>Venues</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  {eventFavourites.length === 0 ? (
                    <Text align={"center"}>No favourite events yet.</Text>
                  ) : (
                    <List gap={2}>
                      {eventFavourites.map((item) => (
                        <ListItem key={item.id} p={1}>
                          <Flex justify="space-between" align="left">
                            <Button
                              variant="link"
                              onClick={() => onNavigate(item.id, "event")}
                            >
                              <Text isTruncated> {item.name}</Text>
                            </Button>
                            <IconButton
                              onClick={() => removeFavourite(item.id)}
                              icon={<DeleteIcon />}
                              aria-label={"Remove favourite"}
                            />
                          </Flex>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </TabPanel>

                <TabPanel>
                  {venueFavourites.length === 0 ? (
                    <Text align={"center"}>No favourite venues yet.</Text>
                  ) : (
                    <List gap={2}>
                      {venueFavourites.map((item) => (
                        <ListItem key={item.id}>
                          <Flex justify="space-between" align="left">
                            <Button
                              variant="link"
                              onClick={() => onNavigate(item.id, "venue")}
                            >
                              {item.name}
                            </Button>
                            <IconButton
                              onClick={() => removeFavourite(item.id)}
                              icon={<DeleteIcon />}
                              aria-label={"Remove favourite"}
                            />
                          </Flex>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
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

export default FavouritesDrawer;
