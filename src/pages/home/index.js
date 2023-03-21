import Head from "next/head";

import Category from "../../components/category";
import FeatureBundle from "../../components/feature-bundle";
import FeatureProduct from "../../components/feature-product";
import Image from "next/image";

import ProductCard from "../../components/product-card";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import GlobalLayout from "../../components/GlobalLayout/GlobalLayout";
import FeatureProductList from "../../components/feature-product-list";
import NewProduct from "../../components/new-product";
import Banner from "../../components/banner";
import BottomFooter from "../../components/Footer";
import { useRouter } from 'next/router'
import { useEffect, useCallback, useState } from "react";
import { useSearchParams } from 'next/navigation'

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

    const [positionSticky, setPositionSticky] = useState(false)

    const onScroll = useCallback(event => {
        const { pageYOffset, scrollY } = window;
        const bottom = document.documentElement.scrollHeight;
        if ((pageYOffset >= 1308 || scrollY >= 1308) && (pageYOffset < bottom - 800 || scrollY < bottom - 800)) {
            setPositionSticky(true)
        } else {
            setPositionSticky(false)
        }
    }, []);

    useEffect(() => {
        //add eventlistener to window
        window.addEventListener("scroll", onScroll, { passive: true });
        // remove event on unmount to prevent a memory leak with the cleanup
        window.dispatchEvent(new Event('storage'))
        return () => {
            window.removeEventListener("scroll", onScroll, { passive: true });
        }
    }, []);

    const router = useRouter()
    const clickProduct = (e) => {
        router.push({
            shallow: true,
            pathname: "/product/[id]",
            query: { id: e.id, data: e },
        },)
    }
    return (
        <div>
            <GlobalLayout>
                <Banner />
                <div className="px-32 mb-16">
                    <FeatureProduct />
                    <FeatureBundle />
                    <div className="flex flex-row">
                        <div style={{ width: "30%", height: "80%", position: "relative" }}>
                            <Category positionSticky={positionSticky} />
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
                                        <div style={{ width: "22.3%", }} onClick={() => clickProduct(e)}
                                            className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
                                        >
                                            <ProductCard
                                                src={"/bundle-1.svg"}
                                                data={e}
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
