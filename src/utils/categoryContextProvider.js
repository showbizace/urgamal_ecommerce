const { createContext, useState, useEffect } = require("react");
import axios from "axios";
import useSWR from "swr";
import { fetchMethod, fetcher } from "./fetch";
import { getCookie } from "cookies-next";

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const getCats = async () => {
    const data = await fetchMethod("GET", "product/cats");
    console.log(data, "data");
    if (data?.success) {
      console.log(data?.categories);
      setCategories(data?.categories);
    }
  };

  useEffect(() => {
    getCats();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
export default CategoryContextProvider;
