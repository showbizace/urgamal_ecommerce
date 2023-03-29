import Image from 'next/image'
import GlobalLayout from '../../components/GlobalLayout/GlobalLayout'
import { Collapse, Text, Grid } from "@nextui-org/react";
import Category from '@/components/category'
import ProductCard from '../../components/product-card'
import { Footer, Skeleton } from '@mantine/core'
import BottomFooter from '../../components/Footer'
import ProductCardExample from '../../components/ProductCardExample'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';


const CategoryPage = () => {
    const router = useRouter()
    const { id } = router.query

    const [main, setMain] = useState()
    const [parent, setParent] = useState()
    const [child, setChild] = useState()
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        window.dispatchEvent(new Event('storage'))
        getLocalCat()
        getProduct()
        setLoading(false)
    }, [])

    const getLocalCat = () => {
        const data = JSON.parse(localStorage.getItem("main"))
        setMain(data)
        const data2 = JSON.parse(localStorage.getItem("parent"))
        setParent(data2)
        const data3 = JSON.parse(localStorage.getItem("child"))
        setChild(data3)
    }

    const getProduct = async () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json',);
        const requestOption = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "main_cat_id": id,
                "limit": 20,
                "offset": 0
            })
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/local`, requestOption)
        if (res.status === 200) {
            setLoading(true)
            const data = await res.json()
            if (data.success === true) {
                setProduct(data.data)
                setLoading(false)
            }
        }
    }

    const getMainProduct = async (id, val) => {
        console.log(id, "val")
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json',);
        const requestOption = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "main_cat_id": id,
                "limit": 20,
                "offset": 0
            })
        }
        if (val === true) {
            setLoading(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/local`, requestOption)
            if (res.status === 200) {
                const data = await res.json()
                if (data.success === true) {
                    setProduct(data.data)
                    setLoading(false)
                }
            }
        }
    }

    const mainCategory = (ids) => {
        switch (ids) {
            case "1": return (<p className='text-sm  text-grey'>Өрхийн тариаланч</p>)
            case "2": return <p className='text-sm  text-grey'>Мэргэжлийн тариаланч</p>
            case "3": return <p className='text-sm  text-grey'>Хэрэглэгч ангилал</p>
        }
    }


    return (
        <div>
            <GlobalLayout />
            <div className=' px-32 bg-nav-background h-full flex flex-col'>
                <div className='flex flex-row py-12 w-full  '>
                    <div style={{ width: "28%", height: "80%" }}>
                        <div
                            className={"rounded-md bg-white"}
                        // fixed top-40 w-80
                        >
                            <Grid.Container
                                style={{ borderRadius: "5px !important", boxShadow: "none" }}
                            >
                                <div
                                    className="flex flex-row justify-between px-4 py-4 w-full mx-4"
                                    style={{ borderBottom: "1px solid rgba(132, 132, 132, 0.18)" }}
                                >
                                    <p className="font-semibold text-lg">Ангилал</p>
                                    <Image
                                        src={"/icons/plant.svg"}
                                        width={25}
                                        height={25}
                                        color={"#8DC57F"}
                                    />
                                </div>
                                <Grid style={{ width: "100%" }} grow gutter="xs">
                                    <Collapse.Group divider={false} css={{ marginTop: "0px" }} >
                                        {main !== undefined && main.map((e) => {
                                            if (e.id == id) {
                                                return (
                                                    <Collapse title={e.name} style={{ width: "100%", }} cs={{ paddingTop: "0px" }} expanded={true} onChange={(el, value, val) => { getMainProduct(e.id, val) }} >
                                                        {parent !== undefined && parent.map((el) => {
                                                            if (e.id === el.main_cat_id) {
                                                                return (
                                                                    <Collapse.Group divider={false}>
                                                                        <Collapse title={el.name}>
                                                                            <Text>{el.name}</Text>
                                                                            <div className="max-h-64 overflow-auto scrollbar-hide">
                                                                                {child !== undefined && child.map((item) => {
                                                                                    if (e.id === item.main_cat_id && el.id === item.parent_id) {
                                                                                        return (
                                                                                            <Text style={{ width: "100%" }}>{item.name}</Text>
                                                                                        )
                                                                                    }
                                                                                })}
                                                                            </div>
                                                                        </Collapse>
                                                                    </Collapse.Group>
                                                                )
                                                            }
                                                        })}
                                                    </Collapse>
                                                )
                                            } else {
                                                return (
                                                    <Collapse title={e.name} style={{ width: "100%", }} cs={{ paddingTop: "0px" }}
                                                        onChange={(el, value, val) => { getMainProduct(e.id, val) }}
                                                    >
                                                        {parent !== undefined && parent.map((el) => {
                                                            if (e.id === el.main_cat_id) {
                                                                return (
                                                                    <Collapse.Group divider={false}>
                                                                        <Collapse title={el.name}>
                                                                            <div className="max-h-64 overflow-auto scrollbar-hide">
                                                                                {child !== undefined && child.map((item) => {
                                                                                    if (e.id === item.main_cat_id && el.id === item.parent_id) {
                                                                                        return (

                                                                                            <Text style={{ width: "100%" }}>{item.name}</Text>

                                                                                        )
                                                                                    }
                                                                                })}
                                                                            </div>
                                                                        </Collapse>
                                                                    </Collapse.Group>
                                                                )
                                                            }
                                                        })}
                                                    </Collapse>
                                                )
                                            }
                                        })}
                                    </Collapse.Group>
                                </Grid>
                            </Grid.Container>
                        </div>
                    </div>
                    <div className='flex flex-col ml-6' style={{ width: "70%" }}>
                        <div className='flex flex-row justify-between w-full'>
                            <div className='flex flex-row items-center'>
                                <p className='text-sm text-grey'>Нүүр</p>
                                <Image width={18} height={18} src={"/icons/arrow-right-outline.svg"} />
                                {mainCategory(id)}

                            </div>
                            <div className='flex justify-center items-center bg-white flex-row  px-4 py-2'>
                                <p className='font-semibold text-sm text-[#3E503C]'>Эрэмбэлэх</p>
                                <Image width={13} height={13} src={'/icons/arrow-down-outline.svg'} className="ml-2 mt-1" />
                            </div>
                        </div>
                        {loading === true ? <div
                            style={{ width: "100%", gap: "30px", flexWrap: "wrap", height: "600px" }}
                            className="flex flex-row mt-12"
                        ><Skeleton style={{ width: "100%", height: "100%" }} /></div> : product !== undefined && product.length > 0 ? <div
                            style={{ width: "100%", gap: "30px", flexWrap: "wrap" }}
                            className="flex flex-row mt-12"
                        >
                            {product !== undefined && product.map((e) => {
                                return (
                                    <div style={{ width: "22.3%", }} onClick={() => clickProduct(e)}
                                        className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
                                    >
                                        <ProductCard
                                            src={e.product_image !== null && e.product_image.images[0] !== null ? `http://${e.product_image.images[0]}` : "/bundle-1.svg"}
                                            data={e}
                                        />
                                    </div>
                                )
                            })}
                        </div> : <div style={{ width: "100%", height: "600px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Таны бараа олдсонгүй.!
                        </div>}

                    </div>
                </div>
            </div>
            <BottomFooter />
        </div >
    )
}

export default CategoryPage