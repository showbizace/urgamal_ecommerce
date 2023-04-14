import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Button, Loader, Modal, Tabs, Text, TextInput } from "@mantine/core";
import Order from "../../../components/Profile/Order";
import { getCookie } from "cookies-next";
import useSWR from "swr";
import axios from "axios";
import { IconPackageOff } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

const MyOrder = () => {
	const [tabs, setTabs] = useState("all");
	const accessToken = getCookie("token");
	const config = {
		headers: { Authorization: `Bearer ${accessToken}` },
	};
	const fetcher = (url) => axios.get(url, config).then((res) => res.data.data);
	const {
		data: orders,
		error,
		isLoading,
	} = useSWR(
		`${process.env.NEXT_PUBLIC_API_URL}/user/order?status=${tabs === "all" ? "" : tabs}`,
		fetcher
	);

	// useEffect(() => {
	// }, []);
	const orderTypes = useMemo(
		() => [
			{ value: "all", title: "Бүгд" },
			{ value: "100", title: "Үүссэн" },
			{ value: "200", title: "Төлбөр хийгдсэн" },
			{ value: "201", title: "Хүлээн авсан" },
			{ value: "301", title: "Цуцалсан" },
		],
		[]
	);
	const [opened, { open, close }] = useDisclosure(false);
	const [paymentData, setPaymentData] = useState();
	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title="Төлбөр"
				centered
				size="md"
				closeOnClickOutside={false}>
				<div className="flex flex-col gap-2">
					<Tabs
						defaultValue="qpay"
						variant="default"
						classNames={{
							panel: "my-8",
						}}>
						<Tabs.List grow>
							<Tabs.Tab value="qpay">Qpay- р төлөх</Tabs.Tab>
							<Tabs.Tab value="apps">Төлбөрийн апп-ууд</Tabs.Tab>
						</Tabs.List>

						<Tabs.Panel value="qpay" pt="xs">
							<div className="h-full w-full flex flex-col justify-center items-center">
								<div className="relative h-60 w-60">
									<Image
										alt="qpay-qr"
										fill
										src={`data:image/jpeg;base64, ${paymentData?.qr_image}`}
									/>
								</div>
								{/* <Text>Захиалгын дүн: {JSON.stringify(Object.keys(paymentData))}</Text> */}
							</div>
						</Tabs.Panel>
						<Tabs.Panel value="apps" pt="xs">
							<div className="h-full w-full flex flex-col justify-center items-center">
								<Text align="center">
									Та доорх төлбөрийн апп-уудаар төлбөрөө гар утаснаасаа шууд хийх
									боломжтой.{" "}
								</Text>
								<div className="flex flex-wrap justify-center items-start gap-4 mt-6">
									{paymentData?.urls.map((payment) => {
										return (
											<div className="flex flex-col justify-center gap-3">
												<Link href={payment.link}>
													<div className="relative h-14 w-14">
														<Image
															alt="qpay-qr"
															fill
															loader={() => payment?.logo}
															src={payment?.logo}
															className="rounded-lg"
														/>
													</div>
												</Link>
												{/* <Text>{payment.description}</Text> */}
											</div>
										);
									})}
								</div>
							</div>
						</Tabs.Panel>
					</Tabs>
					<Button variant="subtle" onClick={close}>
						Буцах
					</Button>
				</div>
			</Modal>
			<Tabs
				variant="outline"
				value={tabs}
				onTabChange={setTabs}
				classNames={{
					root: "bg-white w-full rounded-md px-4 py-2 overflow-y-auto",
					panel: "my-4 pl-2 flex-grow h-full ",
				}}>
				<Tabs.List>
					{orderTypes.map((e) => (
						<Tabs.Tab key={e.title} value={e.value}>
							{e.title}
						</Tabs.Tab>
					))}
				</Tabs.List>
				{orderTypes.map((e) => (
					<Tabs.Panel key={e.title} value={e.value}>
						{isLoading && (
							<div className="h-full w-full flex items-center justify-center">
								<Loader color="yellow" variant="dots" />
							</div>
						)}
						{orders && orders.length === 0 ? (
							<div className="h-full w-full flex items-center justify-center">
								<div className="flex flex-col gap-2 items-center">
									<IconPackageOff size={"3rem"} stroke={1.2} />
									<Text span weight={500}>
										{orderTypes.find((types) => types.value === e.value).title}
									</Text>
									<Text size="sm">захиалга одоогоор байхгүй байна</Text>
								</div>
							</div>
						) : (
							orders?.map((e) => {
								return (
									<Order
										data={e}
										openPaymentModal={open}
										setPaymentData={setPaymentData}
									/>
								);
							})
						)}
					</Tabs.Panel>
				))}
			</Tabs>
		</>
	);
};

export default MyOrder;
