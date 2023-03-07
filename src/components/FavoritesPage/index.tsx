import { FC, useMemo } from "react";
import { Fruit } from "@/api/useFetchFruits";
import useFavorites from "@/hooks/useFavorites";
import StorageUtil from "@/utils/storage-helper";
import { RiStarFill, RiStarLine } from "react-icons/ri";

type Nutrition = {
  carbohydrates: number;
  protein: number;
  fat: number;
  calories: number;
  sugar: number;
};

const FavoritesPage: FC = () => {
  const { favorites, setFavorites } = useFavorites();
  const onToggleFavorite = (fruit: Fruit) => {
    StorageUtil.toggleFavorite(fruit);
    setFavorites(StorageUtil.favorites());
  };
  const nutritionInfo = useMemo(() => {
    return favorites
      ?.map<Nutrition>((fruit) => {
        return JSON.parse(fruit.nutritions);
      })
      .reduce<Nutrition>(
        (previousValue, currentValue) => {
          return {
            carbohydrates:
              previousValue.carbohydrates + currentValue.carbohydrates,
            protein: previousValue.protein + currentValue.protein,
            fat: previousValue.fat + currentValue.fat,
            calories: previousValue.calories + currentValue.calories,
            sugar: previousValue.sugar + currentValue.sugar,
          };
        },
        {
          carbohydrates: 0,
          protein: 0,
          fat: 0,
          calories: 0,
          sugar: 0,
        }
      );
  }, [favorites]);
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="bg-white rounded shadow mt-6">
        <header className="flex justify-between px-6 py-5">
          <div className="text-lg font-medium">All Favorites</div>
        </header>
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="text-left border-y border-neutral-300">
              <th className="font-medium px-6 py-2">Name</th>
              <th className="font-medium px-3 py-2">Family</th>
              <th className="font-medium px-3 py-2">Genus</th>
              <th className="font-medium px-3 py-2">Order</th>
              <th className="w-12" />
            </tr>
          </thead>
          <tbody>
            {favorites && favorites.length > 0 ? (
              favorites.map((fruit, index) => (
                <tr key={index} className="border-y border-neutral-300">
                  <td className="px-6 py-2">{fruit.name}</td>
                  <td className="px-3 py-2">{fruit.family}</td>
                  <td className="px-3 py-2">{fruit.genus}</td>
                  <td className="px-3 py-2">{fruit.order}</td>
                  <td>
                    <button
                      onClick={() => {
                        onToggleFavorite(fruit);
                      }}
                    >
                      {favorites?.some((item) => item.id === fruit.id) ? (
                        <RiStarFill size={20} />
                      ) : (
                        <RiStarLine size={20} />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-neutral-500 text-center font-medium px-6 py-5"
                >
                  No favorites...
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <footer className="text-right mt-5 px-6 py-3">
          <div>Carbohydrates: {nutritionInfo?.carbohydrates.toFixed(2)}</div>
          <div>Protein: {nutritionInfo?.protein.toFixed(2)}</div>
          <div>Fat: {nutritionInfo?.fat.toFixed(2)}</div>
          <div>Calories: {nutritionInfo?.calories.toFixed(2)}</div>
          <div>Sugar: {nutritionInfo?.sugar.toFixed(2)}</div>
        </footer>
      </div>
    </div>
  );
};

export default FavoritesPage;
