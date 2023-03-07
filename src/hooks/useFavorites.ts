import { useEffect, useState } from "react";
import { Fruit } from "@/api/useFetchFruits";
import StorageUtil from "@/utils/storage-helper";

const useFavorites = () => {
  const [favorites, setFavorites] = useState<Fruit[]>();
  useEffect(() => {
    setFavorites(StorageUtil.favorites());
  }, []);
  return { favorites, setFavorites };
};

export default useFavorites;
