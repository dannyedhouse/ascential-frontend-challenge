import { Box, Flex, Input, Select } from "@chakra-ui/react";

interface FilterSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterOption: string;
  setFilterOption: (option: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  sortOptions: { value: string; label: string }[];
}

const FilterSection: React.FC<FilterSectionProps> = ({
  searchQuery,
  setSearchQuery,
  filterOption,
  setFilterOption,
  sortOption,
  setSortOption,
  sortOptions,
}) => {
  return (
    <Box m="6">
      <Flex
        align={{ md: "center" }}
        justify={{ md: "space-between" }}
        gap={{ base: 0, md: "4" }}
        direction={{ base: "column", md: "row" }}
      >
        <Input
          w={{ base: "100%", md: "25%" }}
          placeholder="Search by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Flex
          direction={{ base: "row", md: "row" }}
          gap={4}
          width={{ base: "100%", md: "auto" }}
          mt={{ base: 4, md: 0 }}
          justify={{ md: "flex-end" }}
        >
          <Select
            w={"50%"}
            placeholder="All locations"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option value="arlington">Arlington</option>
            <option value="new york">New York</option>
            <option value="los angeles">Los Angeles</option>
            <option value="nashville">New York</option>
            <option value="boston">Boston</option>
            <option value="chicago">Chicago</option>
            <option value="san francisco">San Francisco</option>
          </Select>

          <Select
            w={"50%"}
            placeholder="Sort by..."
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
    </Box>
  );
};

export default FilterSection;
