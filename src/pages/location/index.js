import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";
import { useEffect } from "react";
import React, { Component } from "react";
import { IconLocation, IconPhoneCall, IconCalendar } from "@tabler/icons-react";
import BottomFooter from "@/components/Footer";
const Location = () => {
	useEffect(() => {
		window.dispatchEvent(new Event("storage"));
	});
	return (
		<div >
			<GlobalLayout  >
				<div className="sm:px-6 sm:py-6 bg-nav-background px-4 py-4 h-full" >
					<div className="flex sm:flex-row w-full flex-col">
						<div className="xl:w-5/12 xl:h-80 sm:w-5/12 sm:h-64 ">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.8686112477762!2d106.92975681516502!3d47.91957967429866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96930eab8c57d9%3A0xe8d4a5c07d31f1d2!2z0KLQsNGA0LjQvNCw0Lsg0KPRgNCz0LDQvNCw0Lsg0q_RgNC40LnQvSDQtNGN0LvQs9Kv0q_RgA!5e0!3m2!1smn!2smn!4v1680113146511!5m2!1smn!2smn"
								width="100%"
								height="100%"
								loading="lazy"
								referrerpolicy="no-referrer-when-downgrade"></iframe>
						</div>
						<div className="mt-2 flex flex-col lg:ml-4 lg:text-base text-sm sm:ml-4">
							<div className="flex flex-row items-center">
								<div className="w-4 h-4 lg:w-6 lg:h-6">
									<IconLocation width={25} height={25} color={"#f9bc60"} className="w-full h-full" />
								</div>
								<p className="ml-2">
									Хаяг :{" "}
									<span className="font-semibold">
										Баянзүрх дүүрэг, 1-р хороо, Энхтайваны өргөн чөлөө Улаанбаатар, хот
									</span>
								</p>
							</div>
							<div className="flex flex-row lg:mt-8 items-center sm:mt-6">
								<IconPhoneCall width={25} height={25} color={"#f9bc60"} className="w-4 h-4 lg:w-6 lg:h-6" />
								<p className="ml-2">
									Утас : <span className="font-semibold">72720808</span>
								</p>
							</div>
							<div className="flex flex-row mt-2 items-center lg:mt-8 sm:mt-6 ">
								<IconCalendar width={25} height={25} color={"#f9bc60"} className="w-4 h-4 lg:w-6 lg:h-6" />{" "}
								<p className="ml-2">
									Цагийн хуваарь : <span className="font-semibold">10:00-18:00</span>
								</p>
							</div>
						</div>
					</div>
					<div className="flex sm:flex-row w-full flex-col lg:mt-8 mt-3">
						<div className="xl:w-5/12 xl:h-80 sm:w-5/12 sm:h-64 ">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.8686112477762!2d106.92975681516502!3d47.91957967429866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96930eab8c57d9%3A0xe8d4a5c07d31f1d2!2z0KLQsNGA0LjQvNCw0Lsg0KPRgNCz0LDQvNCw0Lsg0q_RgNC40LnQvSDQtNGN0LvQs9Kv0q_RgA!5e0!3m2!1smn!2smn!4v1680113146511!5m2!1smn!2smn"
								width="100%"
								height="100%"
								loading="lazy"
								referrerpolicy="no-referrer-when-downgrade"></iframe>
						</div>
						<div className="mt-2 flex flex-col lg:ml-4 lg:text-base text-sm sm:ml-4">
							<div className="flex flex-row items-center">
								<div className="w-4 h-4 lg:w-6 lg:h-6">
									<IconLocation width={25} height={25} color={"#f9bc60"} className="w-full h-full" />
								</div>
								<p className="ml-2">
									Хаяг :{" "}
									<span className="font-semibold">
										Баянзүрх дүүрэг, 1-р хороо, Энхтайваны өргөн чөлөө Улаанбаатар, хот
									</span>
								</p>
							</div>
							<div className="flex flex-row lg:mt-8 items-center sm:mt-6">
								<IconPhoneCall width={25} height={25} color={"#f9bc60"} className="w-4 h-4 lg:w-6 lg:h-6" />
								<p className="ml-2">
									Утас : <span className="font-semibold">72720808</span>
								</p>
							</div>
							<div className="flex flex-row mt-2 items-center lg:mt-8 sm:mt-6 ">
								<IconCalendar width={25} height={25} color={"#f9bc60"} className="w-4 h-4 lg:w-6 lg:h-6" />{" "}
								<p className="ml-2">
									Цагийн хуваарь : <span className="font-semibold">10:00-18:00</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</GlobalLayout>
		</div>
	);
};

export default Location;
