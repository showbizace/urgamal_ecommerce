import Image from "next/image";
import { useRouter } from "next/router";
import {
	IconBrandInstagram,
	IconBrandFacebook,
	IconPhoneCall,
} from "@tabler/icons-react";
const BottomFooter = () => {
	const router = useRouter();

	return (
		<div className="flex flex-row px-16 border-t-1 border-black py-8 bg-green2  justify-between w-full max-xs:px-1 max-xs:py-4 max-xs:gap-2">
			<div className="flex flex-col items-center ">
				<Image src="/logo.png" width={62} height={116} className="mx-4 max-xs:w-4 max-xs:h-4" />
				<p className="text-sm mt-2 max-xs:text-sm-5 max-xs:text-center">“Таримал ургамал” ХХК</p>
				<div className="flex flex-row mt-4 gap-8 max-xs:gap-2">
					<IconPhoneCall width={25} height={25} className="max-xs:w-3 max-xs:h-3 " />
					<IconBrandInstagram width={25} height={25} className="hover:text-white max-xs:w-3 max-xs:h-3" />
					<IconBrandFacebook width={25} height={25} className="hover:text-white max-xs:w-3 max-xs:h-3" />
				</div>
			</div>
			<div className="flex flex-col">
				<p className="text-sm max-xs:text-sm-5">Бидний тухай</p>
				<p className="text-sm mt-2 max-xs:text-sm-5">Вэб үйлчилгээ</p>
				<p className="text-sm mt-2 max-xs:text-sm-5">Бүтээгдэхүүн үйлчилгээ</p>
			</div>
			<div className="flex flex-col">
				<p className="text-sm max-xs:text-sm-5">Тусламж</p>
				<p className="text-sm mt-2 max-xs:text-sm-5">Хэрэглэх заавар</p>
				<p className="text-sm mt-2 max-xs:text-sm-5">Түгээмэл асуулт</p>
				<p className="text-sm mt-2 max-xs:text-sm-5">Үйлчилгээний нөхцөл</p>
				<p className="text-sm mt-2 max-xs:text-sm-5">Нууцлалын баталгаа</p>
			</div>
			<div className="flex flex-col w-[30%] max-xs:w-56">
				<div
					className="flex flex-row items-start mt-1 hover:text-white"
					onClick={() => router.push("/location")}>
					<Image className="m-1 max-xs:w-3 max-xs:h-3" src={"/icons/location.svg"} width={20} height={20} />
					<p className="text-sm ml-2 max-xs:text-sm-5 ">
						Хаяг: Улаанбаатар хот, Баянзүрх дүүрэг, 12-р хороолол, 1-р хороо , 20/2 байр,
						Таримал ургамлын үрийн дэлгүүр
					</p>
				</div>
				<div className="flex flex-row items-center mt-2">
					<Image className="m-1 max-xs:w-3 max-xs:h-3" src={"/icons/call.svg"} width={18} height={18} />
					<p className="text-sm ml-2 max-xs:text-sm-5">Утас: 72720808</p>
				</div>
				<div className="flex flex-row items-start mt-1">
					<Image className="m-1 max-xs:w-3 max-xs:h-3  " src={"/icons/mail.svg"} width={20} height={20} />
					<p className="text-sm ml-2 max-xs:text-sm-5">И-мэйл хаяг: tarimalurgamal2016@gmail.com</p>
				</div>
			</div>
		</div>
	);
};

export default BottomFooter;
