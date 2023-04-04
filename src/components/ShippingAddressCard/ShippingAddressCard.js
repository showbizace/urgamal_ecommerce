import {
	ActionIcon,
	Button,
	Collapse,
	Group,
	Paper,
	Text,
	Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import React from "react";

export default function ShippingAddressCard({ name, address }) {
	const [opened, { toggle }] = useDisclosure(false);

	return (
		<Paper component="button" onClick={toggle} withBorder p="xs" w={"100%"}>
			<Group position="apart">
				<Text>{name}</Text>
				{opened ? <IconChevronUp size="1.3rem" /> : <IconChevronDown size="1.3rem" />}
			</Group>
			<Collapse in={opened}>
				<div className="flex flex-col items-start gap-3 w-full">
					<div className="flex flex-col gap-2 w-full">
						{address.type ? (
							<div className="flex flex-row justify-between items-center">
								{/* <Text fw={500}>{item.type}</Text>  */}
								<Badge color="teal" variant="filled">
									Орон нутаг
								</Badge>
							</div>
						) : (
							<div className="flex flex-row justify-between items-center">
								{/* <Text fw={500}>{item.type}</Text>  */}
								<Text fw={500}>Улаанбаатар</Text>
							</div>
						)}
					</div>
					{/* <Radio value={item.id} /> */}
					<div className="flex flex-col gap-1 w-full">
						<div className="flex flex-row justify-between gap-20 w-full">
							{address.type ? (
								<>
									<Text fz="md" c="dimmed" className="flex flex-row break-word">
										Хот:
									</Text>
									<Text fz="md" sx={{ lineBreak: "anywhere" }}>
										{address.city}
									</Text>
								</>
							) : (
								<>
									<Text fz="md" c="dimmed" className="flex flex-row break-word">
										Аймаг:
									</Text>
									<Text fz="md" sx={{ lineBreak: "anywhere" }}>
										{address.province}
									</Text>
								</>
							)}
						</div>
						<div className="flex flex-row justify-between gap-20 w-full">
							<>
								<Text fz="md" c="dimmed" className="flex flex-row">
									Дүүрэг:
								</Text>
								<Text fz="md" sx={{ lineBreak: "anywhere" }}>
									{address.district}
								</Text>
							</>
						</div>
						<div className="flex flex-row justify-between gap-20 w-full">
							<>
								<Text fz="md" c="dimmed" className="flex flex-row ">
									Хороо:
								</Text>
								<Text fz="md">{address.committee}</Text>
							</>
						</div>
						<div className="flex flex-row justify-between w-full">
							<Text fz="md" c="dimmed" className="flex flex-row ">
								Гудамж, хороолол:
							</Text>
							<Text fz="md">{address.street}</Text>
						</div>
						<div className="flex flex-row justify-between w-full">
							<Text fz="md" c="dimmed" className="flex flex-row ">
								Хашаа, байр:
							</Text>
							<Text fz="md">{address.apartment}</Text>
						</div>
						<div className="flex flex-row justify-between w-full">
							<Text fz="md" c="dimmed" className="flex flex-row ">
								Тоот:
							</Text>
							<Text fz="md">{address.number}</Text>
						</div>
						<div className="flex flex-row justify-between w-full">
							<Text fz="md" c="dimmed" className="flex flex-row ">
								Утас:
							</Text>
							<Text fz="md">{address.phone}</Text>
						</div>
					</div>
				</div>
				<div className="flex flex-row mt-4 gap-8 justify-center">
					<Button
						variant="subtle"
						color="red"
						onClick={(e) => {
							e.stopPropagation();
							// openDeleteConfirmation(item.id);
						}}>
						Устгах
					</Button>
					<Button
						variant="light"
						color="yellow"
						onClick={(e) => {
							e.stopPropagation();
							// openProductEditingModal(item);
						}}>
						Засах
					</Button>
				</div>
			</Collapse>
		</Paper>
	);
}
