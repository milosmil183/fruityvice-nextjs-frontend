import { Fruit } from "@/api/useFetchFruits";

const StorageUtil = {
  favorites: () => {
    const json = localStorage.getItem("__favorites");
    const favorites: Fruit[] = [];
    if (json) {
      const result = JSON.parse(json);
      if (Array.isArray(result)) {
        favorites.push(...result);
      }
    }
    return favorites;
  },
  toggleFavorite: (fruit: Fruit) => {
    const favorites = StorageUtil.favorites();
    const index = favorites.findIndex((item) => item.id === fruit.id);
    if (index !== -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(fruit);
    }
    localStorage.setItem("__favorites", JSON.stringify(favorites));
  },
  isFavorite: (fruit: Fruit) => {
    const favorites = StorageUtil.favorites();
    return favorites.some((item) => item.id === fruit.id);
  },
};

export default StorageUtil;
