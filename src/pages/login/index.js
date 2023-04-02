import Image from "next/image";
import backImage from "../../../public/plant.jpg";
import { TextInput, Button, createStyles, rem, PinInput, Group } from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
const Login = () => {
	const pinCode = React.createRef();
	const router = useRouter();
	// const numberRef = React.createRef("")
	const [isNumber, setIsNumber] = useState(false);
	const [number, setNumber] = useState("");
	const [error, setError] = useState(true);
	const [message, setMessage] = useState("");
	const form = useForm({
		initialValues: {
			number: "",
		},

		validate: {
			number: (value) => (/[0-9]{8}$/.test(value) ? null : "Invalid email"),
		},
	});

	const fetchData = async (value) => {
		let { number } = value;
		console.log(number, "numbers");
		if (number !== "" && ((number !== undefined) !== number) !== null) {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/code?mobile=${number}`
			);
			if (res.status === 200) {
				const data = await res.json();
				setIsNumber(true);
				setNumber(number);
			}
		}
	};

	const pinCodeFetch = async (value) => {
		let code = value;
		console.log(typeof code);
		if (code.length === 6) {
			setError(false);
			const requestOption = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ mobile: number, code }),
			};
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/login/code`,
				requestOption
			);
			if (res.status === 200) {
				const data = await res.json();
				setCookie("token", data.token);
				setCookie("number", number);
				setCookie("addCart", true);
				router.push("/cart/cartItem");
			} else {
				const data = await res.json();
				setMessage(data.message);
			}
		} else {
			setError(true);
		}
	};
	return (
		<div className="w-full h-full flex flex-row absolute">
			<div style={{ width: "65%", height: "100%", position: "relative" }}>
				<Image fill src={"/plant.jpg"} />
			</div>
			<div
				className="flex flex-col relative items-center justify-center  "
				style={{ width: "35rem" }}>
				<Image src="/logo.png" width={100} height={100} />
				<p className="text-xl font-bold mt-4">Нэвтрэх</p>
				<div style={{ width: "60%" }} className="mt-5">
					<form onSubmit={form.onSubmit((values) => fetchData(values))}>
						<TextInput
							label="Утасны дугаар"
							placeholder="88888888"
							{...form.getInputProps("number")}
							styles={(theme) => ({
								label: {
									marginBottom: rem(10),
								},
							})}
						/>
						{isNumber === true ? (
							<div className="w-full mt-4">
								<Group position="center">
									<PinInput
										length={6}
										ref={pinCode}
										error={error}
										manageFocus={true}
										type={"number"}
										onChange={(value) => {
											pinCodeFetch(value);
										}}
									/>
								</Group>
							</div>
						) : (
							<div></div>
						)}
						{message !== "" ? (
							<p className="text-xs font-bold text-center text-rose-500 mt-4">
								{message}
							</p>
						) : (
							<div></div>
						)}
						<Button
							variant="outline"
							color="green"
							radius="xl"
							className="mt-8"
							w={"100%"}
							type="submit">
							Нэвтрэх
						</Button>
					</form>
				</div>
				<p className="mt-4">Эсвэл</p>
				<div className="flex flex-row justify-center mt-4">
					<Image src="/icons/facebook2.svg" width={30} height={30} className="mr-10" />
					<Image src="/icons/gmail.svg" width={30} height={30} />
				</div>
			</div>
		</div>
	);
};

export default Login;
