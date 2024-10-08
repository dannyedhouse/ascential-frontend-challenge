import React from 'react';
import {
  SimpleGrid,
  Flex,
  Spinner,
  Heading,
  Text,
  Box,
  Badge,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { Link as BrowserLink } from "react-router-dom";
import { useSeatGeek } from "../utils/useSeatGeek";
import Error from "./Error";
import Breadcrumbs from "./Breadcrumbs";
import FavouritesButton from "./FavouritesButton";
import useFilteredVenues from "../hooks/useFilteredVenues";
import FilterSection from "./FilterSection";

export interface VenueProps {
  id: number;
  has_upcoming_events: boolean;
  num_upcoming_events: number;
  name_v2: string;
  display_location: string;
}

interface VenuItemProps {
  venue: VenueProps;
}

const Venues: React.FC = () => {
  const { data, error } = useSeatGeek("/venues", {
    sort: "score.desc",
    per_page: "24",
  });

  const {
    filteredVenues,
    searchQuery,
    setSearchQuery,
    filterOption,
    setFilterOption,
    sortOption,
    setSortOption,
  } = useFilteredVenues(data?.venues);

  if (error) return <Error />;

  if (!data) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Venues" }]} />
      <FilterSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
        sortOption={sortOption}
        setSortOption={setSortOption}
        sortOptions={[
          { value: "name_asc", label: "Name ascending" },
          { value: "name_desc", label: "Name descending" },
          { value: "num_events_desc", label: "Most upcoming events" },
          { value: "num_events_asc", label: "Least upcoming events" },
        ]}
      />

      {filteredVenues.length === 0 ? (
        <Text align={"center"}>
          Sorry, no results found! Try resetting any filters.
        </Text>
      ) : (
        <SimpleGrid spacing="6" m="6" minChildWidth="350px">
          {filteredVenues.map((venue: VenueProps) => (
            <VenueItem key={venue.id.toString()} venue={venue} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

const VenueItem: React.FC<VenuItemProps> = ({ venue }) => (
  <LinkBox>
    <Box
      p={[4, 6]}
      bg="gray.50"
      borderColor="gray.200"
      borderWidth="1px"
      justifyContent="center"
      alignContent="center"
      rounded="lg"
      _hover={{ bg: "gray.100" }}
    >
      <Badge colorScheme={venue.has_upcoming_events ? "green" : "red"} mb="2">
        {`${
          venue.has_upcoming_events ? venue.num_upcoming_events : "No"
        } Upcoming Events`}
      </Badge>
      <Heading
        size="sm"
        noOfLines={1}
        display={"flex"}
        justifyContent={"space-between"}
        alignContent={"space-between"}
      >
        <LinkOverlay as={BrowserLink} to={`/venues/${venue.id}`}>
          {venue.name_v2}
        </LinkOverlay>
        <FavouritesButton id={venue.id} name={venue.name_v2} type={"venue"} />
      </Heading>
      <Text fontSize="sm" color="gray.500" data-testid="venue-location">
        {venue.display_location}
      </Text>
    </Box>
  </LinkBox>
);

export default Venues;