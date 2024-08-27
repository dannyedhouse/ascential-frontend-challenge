import { useState, useMemo } from "react";
import { VenueProps } from "../components/Venues";

const useFilteredVenues = (venues: VenueProps[] | undefined) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [sortOption, setSortOption] = useState("name_asc");

  const filteredVenues = useMemo(() => {
    let filtered = venues || [];

    // Search query
    filtered = filtered.filter((venue) => {
      return (
        venue.name_v2.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.display_location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    // Filter
    if (filterOption) {
      filtered = filtered.filter((venue) =>
        venue.display_location
          .toLowerCase()
          .includes(filterOption.toLowerCase())
      );
    }

    // Sorting logic
    if (sortOption === "name_asc") {
      filtered.sort((a, b) => a.name_v2.localeCompare(b.name_v2));
    } else if (sortOption === "name_desc") {
      filtered.sort((a, b) => b.name_v2.localeCompare(a.name_v2));
    } else if (sortOption === "num_events_desc") {
      filtered.sort((a, b) => b.num_upcoming_events - a.num_upcoming_events);
    } else if (sortOption === "num_events_asc") {
      filtered.sort((a, b) => a.num_upcoming_events - b.num_upcoming_events);
    }

    return filtered;
  }, [venues, searchQuery, filterOption, sortOption]);

  return {
    filteredVenues,
    searchQuery,
    setSearchQuery,
    filterOption,
    setFilterOption,
    sortOption,
    setSortOption,
  };
};

export default useFilteredVenues;
