import React from 'react';
import {
  SimpleGrid,
  Flex,
  Spinner,
  Heading,
  Text,
  Box,
  Card,
  CardBody,
  Stack,
  Image,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import Error from "./Error";
import { useSeatGeek } from "../utils/useSeatGeek";
import { formatDateTime } from "../utils/formatDateTime";
import FavouritesButton from "./FavouritesButton";
import FilterSection from "./FilterSection";
import useFilteredEvents from "../hooks/useFilteredEvents";

export interface Performers {
  image: string;
}

export interface Venue {
  name_v2: string;
  display_location: string;
  timezone: string;
}

export interface EventProps {
  id: number;
  short_title: string;
  datetime_utc: Date;
  performers: Performers[];
  venue: Venue;
}

interface EventItemProps {
  event: EventProps;
}

const Events: React.FC = () => {
  const { data, error } = useSeatGeek("/events", {
    type: "concert",
    sort: "score.desc",
    per_page: "24",
  });

  const {
    filteredEvents,
    searchQuery,
    setSearchQuery,
    filterOption,
    setFilterOption,
    sortOption,
    setSortOption,
  } = useFilteredEvents(data?.events);

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
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Events" }]} />

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
          { value: "nearest", label: "Date ascending" },
          { value: "furthest", label: "Date descending" },
        ]}
      />

      {filteredEvents.length === 0 ? (
        <Text align={"center"}>
          Sorry, no results found! Try resetting any filters.
        </Text>
      ) : (
        <SimpleGrid spacing="6" m="6" minChildWidth="350px">
          {filteredEvents.map((event: EventProps) => (
            <EventItem key={event.id.toString()} event={event} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

const EventItem: React.FC<EventItemProps> = ({ event }) => (
  <LinkBox
    as={Card}
    variant="outline"
    overflow="hidden"
    bg="gray.50"
    borderColor="gray.200"
    _hover={{ bg: "gray.100" }}
  >
    <Image src={event.performers[0].image} alt={`${event.short_title}`} />

    <CardBody>
      <Stack spacing="2">
        <Heading
          gap={2}
          size="md"
          display={"flex"}
          justifyContent={"space-between"}
          alignContent={"space-between"}
        >
          <LinkOverlay as={Link} to={`/events/${event.id}`}>
            {event.short_title}
          </LinkOverlay>
          <FavouritesButton
            id={event.id}
            name={event.short_title}
            type={"event"}
          />
        </Heading>

        <Box>
          <Text fontSize="sm" color="gray.600">
            {event.venue.name_v2}
          </Text>
          <Text fontSize="sm" color="gray.600" data-testid="event-location">
            {event.venue.display_location}
          </Text>
        </Box>
        <Text
          fontSize="sm"
          fontWeight="bold"
          color="gray.600"
          justifySelf={"end"}
        >
          {formatDateTime(event.datetime_utc)}
        </Text>
      </Stack>
    </CardBody>
  </LinkBox>
);

export default Events;