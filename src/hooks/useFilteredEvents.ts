import { useState, useMemo } from "react";
import { EventProps } from "../components/Events";

const useFilteredEvents = (events: EventProps[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [sortOption, setSortOption] = useState("");

  const filteredEvents = useMemo(() => {
    let filtered = events || [];

    // Search query
    filtered = filtered.filter((event) => {
      return (
        event.short_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.display_location
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    });

    // Filter
    if (filterOption) {
      filtered = filtered.filter((event) =>
        event.venue.display_location
          .toLowerCase()
          .includes(filterOption.toLowerCase())
      );
    }

    // Sort
    if (sortOption === "name_asc") {
      filtered.sort((a, b) => a.short_title.localeCompare(b.short_title));
    } else if (sortOption === "name_desc") {
      filtered.sort((a, b) => b.short_title.localeCompare(a.short_title));
    } else if (sortOption === "nearest") {
      filtered.sort(
        (a, b) =>
          new Date(a.datetime_utc).getTime() -
          new Date(b.datetime_utc).getTime()
      );
    } else if (sortOption === "furthest") {
      filtered.sort(
        (a, b) =>
          new Date(b.datetime_utc).getTime() -
          new Date(a.datetime_utc).getTime()
      );
    }

    return filtered;
  }, [events, searchQuery, filterOption, sortOption]);

  return {
    filteredEvents,
    searchQuery,
    setSearchQuery,
    filterOption,
    setFilterOption,
    sortOption,
    setSortOption,
  };
};

export default useFilteredEvents;
