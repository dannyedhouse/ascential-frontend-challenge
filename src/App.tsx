import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Venues from "./components/Venues";
import Venue from "./components/Venue";
import Events from "./components/Events";
import Event from "./components/Event";
import { Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import DrawerUI from "./components/DrawerUI";
import { StarIcon } from "@chakra-ui/icons";
import { FavouritesProvider } from "./context/FavouritesContext";

const App: React.FC = () => (
  <FavouritesProvider>
    <Router>
      <Nav />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/venues" Component={Venues} />
        <Route path="/venues/:venueId" Component={Venue} />
        <Route path="/events" Component={Events} />
        <Route path="/events/:eventId" Component={Event} />
      </Routes>
    </Router>
  </FavouritesProvider>
);

const Nav: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      bg="gray.700"
      color="white"
      padding="24px"
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Heading size="md">Ascential Front End Challenge</Heading>
      <Button onClick={onOpen} leftIcon={<StarIcon />} colorScheme="yellow">
        Favourites
      </Button>
      <DrawerUI isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default App;
