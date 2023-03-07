import { useRef } from "react";
import axios from "axios";

const useApiService = () => {
  return useRef(
    axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    })
  ).current;
};

export default useApiService;
