import { IconButton } from "@chakra-ui/react";
import { FavouritesItem, useFavourites } from "../context/FavouritesContext";
import { StarIcon } from "@chakra-ui/icons";

const FavouritesButton: React.FC<FavouritesItem> = ({
  id,
  name,
  type,
}: FavouritesItem) => {
  const { favourites, addFavourite, removeFavourite } = useFavourites();
  const isFavourite = favourites.some((item) => item.id === id);

  function onFavouriteClick() {
    if (isFavourite) {
      removeFavourite(id);
    } else {
      addFavourite({ id, name, type });
    }
  }

  return (
    <IconButton
      onClick={onFavouriteClick}
      isRound={true}
      variant="solid"
      colorScheme={isFavourite ? "yellow" : "gray"}
      aria-label="Add to favourites"
      fontSize="20px"
      title="Add to favourites"
      icon={<StarIcon />}
      position="absolute"
      top="8px"
      right="8px"
    />
  );
};

export default FavouritesButton;
