import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";
import Category from "@/components/category";
import ProductCard from "@/components/product-card";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function SearchResult() {
  const router = useRouter();
  const { q } = router.query;
  const [main, setMain] = useState();
  const [parent, setParent] = useState();
  const [child, setChild] = useState();
  useEffect(() => {
    window.dispatchEvent(new Event("storage"));
    getAllCategory();
  }, []);
  const getAllCategory = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/category/all?type=separate`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        localStorage.setItem(
          "main",
          JSON.stringify(response.data.data.mainCats)
        );
        localStorage.setItem(
          "parent",
          JSON.stringify(response.data.data.parentCats)
        );
        localStorage.setItem(
          "child",
          JSON.stringify(response.data.data.childCats)
        );
        setMain(response.data.data.mainCats);
        setParent(response.data.data.parentCats);
        setChild(response.data.data.childCats);
      })
      .catch((error) => {
        if (error.response) {
          console.log();
        } else {
        }
      });
  };
  return (
    <GlobalLayout>
      <div className="flex w-full">
        <div className="max-w-[30vw]">
          <Category
            positionSticky={false}
            parent={parent}
            main={main}
            child={child}
          />
        </div>
        <ProductCard />
      </div>
    </GlobalLayout>
  );
}
