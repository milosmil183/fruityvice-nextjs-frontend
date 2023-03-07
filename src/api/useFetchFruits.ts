import useApiService from "@/api/useApiService";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Fruit = {
  id: number;
  name: string;
  family: string;
  genus: string;
  order: string;
  nutritions: string;
};

type FruitsData = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  data: Fruit[];
};

const useFetchFruits = () => {
  const apiService = useApiService();
  const [fruitsData, setFruitsData] = useState<FruitsData>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { count, page } = router.query as Record<string, string>;
  useEffect(() => {
    apiService
      .get<FruitsData>(`/fruits?page=${page || 1}&count=${count || 10}`)
      .then(({ data }) => {
        setFruitsData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [apiService, count, page]);
  return {
    loading,
    fruits: fruitsData?.data,
    page: fruitsData?.current_page || 1,
    lastPage: fruitsData?.last_page || 1,
    total: fruitsData?.total || 0,
    count: fruitsData?.per_page || 0,
  };
};

export default useFetchFruits;
