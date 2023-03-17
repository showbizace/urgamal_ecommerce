import Head from "next/head";

import Category from "../components/category";
import FeatureBundle from "../components/feature-bundle";
import FeatureProduct from "../components/feature-product";
import Image from "next/image";

import ProductCard from "../components/product-card";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import GlobalLayout from "../components/GlobalLayout/GlobalLayout";
import FeatureProductList from "../components/feature-product-list";
import NewProduct from "../components/new-product";
import Banner from "../components/banner";
import BottomFooter from "../components/Footer";
import { useRouter } from 'next/router'
import { useEffect } from "react";

export async function getStaticProps() {

    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ limit: 20, offset: 0 })
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/local`, requestOption)
    const data = await res.json()
    return {
        props: {
            data,
        }
    }
}

export default function Home({ data }) {

    const router = useRouter()

    const clickProduct = (id) => {
        router.push({
            pathname: "/product/[id]",
            query: { id: id }
        })
    }
    return (
        <div>
            <GlobalLayout>
                <Banner />
                <div className="px-32 mb-16">
                    <FeatureProduct />
                    <FeatureBundle />
                    <div className="flex flex-row">
                        <div style={{ width: "30%", height: "80%" }}>
                            <Category />
                        </div>
                        <div className="flex flex-col ml-12 " style={{ width: "70%" }}>
                            <FeatureProductList />
                            <NewProduct />
                            <div
                                style={{ width: "100%", gap: "30px", flexWrap: "wrap" }}
                                className="flex flex-row mt-12"
                            >
                                {data.data.map((e) => {
                                    return (
                                        <div style={{ width: "22.3%", }} onClick={() => { clickProduct(e.id) }}>
                                            <ProductCard
                                                src={"/bundle-1.svg"}
                                                name={e.name}
                                                count={e.instock}
                                                price={e.price}
                                            />
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                </div>
                <BottomFooter />
            </GlobalLayout>
        </div>
    );
}
