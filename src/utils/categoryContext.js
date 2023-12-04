const { createContext, useState } = require("react");
import axios from "axios";
import useSWR from "swr";
import { fetcher } from "./fetch";

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const { data, error, isLoading, isValidating } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/product/cats`,
    fetcher,
    { refreshInterval: 0 }
  );

  const [categories, setCategories] = useState([]);
  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};
export default CategoryContextProvider;
