import ShippingAddressCard from "@/components/ShippingAddressCard/ShippingAddressCard";
import { Button, Flex, Group, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCirclePlus } from "@tabler/icons-react";
const ProfileInfo = ({ givenName, familyName, mobile, email }) => {
	const form = useForm({
		initialValues: {
			givenName,
			familyName,
			mobile,
		},
	});
	return (
		<div className="flex justify-stretcha items-start gap-2 w-full ">
			<div>
				<Title order={4}>Хувийн мэдээлэл</Title>
				<Text size="xs" c="dimmed">
					Та хувийн мэдээллээ доорх талбаруудаар засварлаарай
				</Text>
				<form className="mt-6">
					<TextInput size="sm" label="Нэр" {...form.getInputProps("givenName")} />
					<TextInput size="sm" label="Овог" {...form.getInputProps("familyName")} />
					<TextInput size="sm" label="Гар утас" {...form.getInputProps("mobile")} />
				</form>
			</div>
			<div>
				<Title order={4}>Хүргэлтийн хаяг</Title>
				<Text size="xs" c="dimmed">
					Та хүргэлтийн хаягаа оруулж захиалгаа хялбар хийгээрэй
				</Text>
				<div className="mt-12">
					<div className="flex flex-col items-end gap-3">
						<Stack justify="stretch" w={"100%"}>
							<ShippingAddressCard name={"Гэр"} address={{}} />
							<ShippingAddressCard name={"Ажил"} address={{}} />
						</Stack>
						<Button
							leftIcon={<IconCirclePlus size={20} />}
							variant="subtle"
							onClick={(e) => {
								e.preventDefault();
								openProductEditingModal({}, "creation");
							}}>
							Шинэ хаяг нэмэх
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileInfo;
