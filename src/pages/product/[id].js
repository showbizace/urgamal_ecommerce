import Image from "next/image";
import { useEffect, useContext, useState } from "react";
import GlobalLayout from "../../components/GlobalLayout/GlobalLayout";
import ProductTypeChip from "../../components/ProductTypeChip/ProductTypeChip";
import Magnifier from "../../components/Magnifier/Magnifier";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProductCardExample from "../../components/ProductCardExample";
import {
	LoadingOverlay,
	Button,
	Badge,
	Divider,
	Loader,
	ThemeIcon,
	Text,
} from "@mantine/core";
import { Store } from "@/utils/Store";
import { getCookie } from "cookies-next";
import { SuccessNotification } from "../../utils/SuccessNotification";
import { IconHeart, IconPhotoOff } from "@tabler/icons-react";
import BottomFooter from "@/components/Footer";
import Category from "@/components/category";
import axios from "axios";
import ProductListWithCategory from "@/components/ProductListWithCategory/ProductListWithCategory";
export async function getServerSideProps({ params }) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/product/single?productid=${params.id}`
	);
	const data = await res.json();
	return {
		props: {
			product: data.data,
		},
	};
}

const ProductDetail = ({ product }) => {
	const { state, dispatch } = useContext(Store);
	const [loading, setLoading] = useState(false);
	const [main, setMain] = useState();
	const [parent, setParent] = useState();
	const [child, setChild] = useState();
	const addToCartHandler = async () => {
		setLoading(true);
		dispatch({
			type: "CART_ADD_ITEM",
			payload: { ...product, quantity: 1, purchaseCount: 1 },
		});
		const token = getCookie("token");
		var myHeaders = new Headers();
		myHeaders.append("Authorization", "Bearer " + token);
		myHeaders.append("Content-Type", "application/json");
		const requestOption = {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify({
				item_id: product.id,
				qty: 1,
				businessId: "local_test",
			}),
		};
		const addReq = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/cart/add/local`,
			requestOption
		);
		SuccessNotification({
			message: "Сагсанд амжилттай орлоо!",
			title: `${product?.name}`,
		});
		setLoading(false);
	};

	const getAllCategory = async () => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API_URL}/category/all?type=separate`, {
				headers: { "Content-Type": "application/json" },
			})
			.then((response) => {
				localStorage.setItem("main", JSON.stringify(response.data.data.mainCats));
				localStorage.setItem("parent", JSON.stringify(response.data.data.parentCats));
				localStorage.setItem("child", JSON.stringify(response.data.data.childCats));
				setMain(response.data.data.mainCats);
				setParent(response.data.data.parentCats);
				setChild(response.data.data.childCats);
			})
			.catch((error) => {
				if (error.response) {
				} else {
				}
			});
	};
	useEffect(() => {
		getAllCategory();
	}, []);
	return (
		<GlobalLayout title={product?.name}>
			<div className="flex flex-col w-full min-h-screen xl:px-10 lg:px-20 md:px-16 sm:px-11 lg:py-12  items-start py-4 px-4 ">
				<div className="flex w-full lg:gap-20 justify-start ">
					<div className="flex lg:gap-14 gap-4  justify-center xl:flex-row lg:flex-row md:flex-row  sm:flex-col xs:flex-col xs2:flex-col flex-col lg:none w-full">
						<div className="relative md:w-[33vw] md:h-[33vw] sm:w-[100%] sm:h-[66vw] xs:w-[100%] xs:h-[66vw]  xs2:w-[66vw] xs2:h-[66vw] bg-gray-100 border-2 rounded-md w-full">
							{product?.product_image !== null ? (
								<Image
									src={`${product?.product_image.images[0]}`}
									// loader={() =>
									// 	product?.product_image !== null
									// 		? `${product?.product_image.images[0]}`
									// 		: "/bundle-1.svg"
									// }
									fill
									// sizes="(max-width: 768px) 20vw,
									// (max-width: 1200px) 20vw,
									// (max-width: 1200px) 20vw,
									// 20vw"
									className="object-contain rounded-md"
								/>
							) : (
								<div className="h-full flex flex-col gap-2 justify-center items-center bg-gray-50 rounded-md">
									<ThemeIcon
										size="lg"
										variant="light"
										color="green"
									// gradient={{ from: "teal", to: "lime", deg: 105 }}
									>
										<IconPhotoOff size="80%" stroke={0.5} />
									</ThemeIcon>

									<Text size="sm" weight={300}>
										Зураггүй{" "}
									</Text>
								</div>
							)}
						</div>

						<div className="flex flex-col justify-between lg:gap-6">
							<div className="flex flex-col gap-6">
								<div className="lg:text-2xl text-lg font-semibold">{product?.name}</div>
								<div className="flex font-semibold gap-2">
									<span className="text-greenish-grey text-base">Ширхэгийн үнэ:</span>
									<span className="text-base">
										{Intl.NumberFormat("mn-MN").format(product?.price)}₮
									</span>
								</div>
								<div className="flex font-semibold gap-2">
									<span className="text-greenish-grey text-base  ">Бөөний үнэ:</span>
									<span className="text-greenish-grey line-through text-base ">
										{" "}
										{Intl.NumberFormat("mn-MN").format(product.price)}₮
									</span>
									<span className="text-greenish-grey text-base "> / </span>
									<span className="text-base"> {Intl.NumberFormat("mn-MN").format(product.promo_price)}₮</span>
								</div>
								<div className="flex font-semibold  gap-2 items-center">
									<span className="text-greenish-grey text-base  ">Үлдэгдэл:</span>
									{product.instock > 10 ? (
										<Badge color="teal">Хангалттай</Badge>
									) : product.instock == 0 ? (
										<Badge color="yellow">Үлдэгдэлгүй</Badge>
									) : (
										<span className="text-greenish-grey text-base  ">
											{product.instock} {product.unit}
										</span>
									)}
								</div>
								<div className="flex gap-2 font-semibold text-base flex-row ">
									<span className="text-greenish-grey text-base ">Төрөл:</span>
									{product.main_cat_id && (
										<span className="text-base">{product.main_cat_id?.[0].name}, </span>
									)}
									{product.parent_cat_id && (
										<span className="text-base">{product.parent_cat_id?.[0].name}, </span>
									)}
									{product.child_cat_id && (
										<span className="text-base	">{product.child_cat_id?.[0].name}</span>
									)}
								</div>
								{product.instruction ? (
									<div className="flex flex-col gap-4">
										<span className="flex font-semibold text-greenish-grey text-base">
											Хэрэглэх заавар
										</span>
										<textarea
											cols={60}
											rows={12}
											readOnly
											className=" overflow-x-hidden overflow-y-hidden focus: outline-0 py-3 px-3 rounded-md text-base"
											value={product.instruction}></textarea>
									</div>
								) : (
									<div></div>
								)}
							</div>

							<div className="flex gap-6 w-full mt-5">
								<Button
									variant={"outline"}
									rightIcon={<IconHeart size={20} stroke={2} />}
									size="md"
									styles={{
										label: { fontWeight: 500 },
									}}
									color={"red"}
									className="flex-grow flex justify-between items-center px-5 py-3 rounded-md">
									Хадгалах
								</Button>
								<Button
									variant={"filled"}
									size="md"
									color={"orange"}
									className="flex-grow flex justify-between items-center px-5 py-3 rounded-md"
									disabled={loading}
									rightIcon={
										loading ? (
											<Loader size="xs" color="yellow" />
										) : (
											<AiOutlineShoppingCart className="font-semibold" size={20} />
										)
									}
									onClick={addToCartHandler}>
									Сагсанд хийх
								</Button>
							</div>
						</div>
					</div>
				</div>

				<hr className="my-10" />
				<div className="w-full flex flex-col ">
					<ProductListWithCategory
						key={`recommended-list-${product?.name}`}
						categoryId={product.parent_cat_id?.[0].id}
						categoryName={"Санал болгож буй бүтээгдэхүүнүүд"}
						className="mt-12 "
					/>
				</div>
			</div>
		</GlobalLayout>
	);
};

export default ProductDetail;
