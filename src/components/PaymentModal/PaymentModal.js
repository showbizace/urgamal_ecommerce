import { UserConfigContext } from "@/utils/userConfigContext";
import {
	ActionIcon,
	Button,
	Container,
	Divider,
	Group,
	Loader,
	PinInput,
	Stack,
	Tabs,
	Text,
	TextInput,
	Tooltip,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconRefresh, IconReload } from "@tabler/icons-react";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export default function PaymentModal({ context, id, paymentData }) {
	return <></>;
}
