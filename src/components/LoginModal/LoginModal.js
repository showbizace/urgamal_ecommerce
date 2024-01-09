import { fetchMethod } from "@/utils/fetch";
import { UserConfigContext } from "@/utils/userConfigContext";
import { tokenDecode } from "@/utils/utils";
import { jwtDecode } from "jwt-decode";
import {
  ActionIcon,
  Button,
  Container,
  Divider,
  Group,
  Input,
  Loader,
  PinInput,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconRefresh, IconReload } from "@tabler/icons-react";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useContext, useEffect, useState } from "react";
import { createConnection } from "@/utils/Socket";

export default function LoginModal({ context, id }) {
  const { login } = useContext(UserConfigContext);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const fetchOTP = async () => {
    setLoading(true);
    try {
      const data = await fetchMethod("GET", `auth/code?mobile=${mobileNumber}`);
      if (data.success) {
        setOtpRequested(true);
        setSeconds(60);
        showNotification({
          message: "Таны утсанд 6 оронтой код амжилттай илгээлээ.!",
          color: "green",
        });
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const handleLogin = async () => {
    setLoading(true);
    const requestOption = { mobile: mobileNumber, code: otp };
    const res = await fetchMethod("POST", "auth/login/code", "", requestOption);
    if (res?.success) {
      const bigDate = 30 * 24 * 60 * 60 * 1000;
      const socket = createConnection();
      login();
      const token = res.token;
      const decoded = jwtDecode(token);
      setCookie("token", token, {
        maxAge: bigDate,
      });
      setCookie("number", mobileNumber, { maxAge: bigDate });
      setCookie("addToCart", true);
      const userid = tokenDecode(token);
      socket.emit("storeMyId", userid);

      showNotification({
        message: "Амжилттай нэвтэрлээ",
        color: "green",
      });
      context.closeModal(id);
    } else {
      showNotification({
        message: "Код буруу эсвэл хүчинтэй хугацаа дууссан байна.",
        color: "red",
      });
    }

    setLoading(false);
  };
  return (
    <Container>
      <Stack spacing="lg">
        <Stack mt="lg" spacing={8}>
          <label for="mobile-number-input">
            <Text weight={500}>Утасны дугаар</Text>
          </label>
          <Input
            id="mobile-number-input"
            inputMode="tel"
            type="number"
            length={8}
            autoFocus
            value={mobileNumber}
            onChange={(event) => setMobileNumber(event.currentTarget.value)}
          />
        </Stack>
        {otpRequested && <Divider />}
        {otpRequested && (
          <Stack mt="md" spacing={8} align="center">
            <label for="otp-input">
              <Text weight={500}>Нэг удаагийн нууц үг</Text>
            </label>
            <Group position="center">
              <PinInput
                id="otp-input"
                oneTimeCode
                inputMode="decimal"
                type="number"
                placeholder=""
                length={6}
                size="md"
                value={otp}
                onChange={setOtp}
              />
              {/* <Button size="xs">Дахин илгээх</Button> */}
              <Group position="right">
                <Text size="xs">Код очоогүй юу?</Text>

                {/* <ActionIcon size="lg">
                    <IconReload size="1.6rem" />
                  </ActionIcon> */}

                {seconds === 0 ? (
                  loading ? (
                    <Loader variant="dots" color="yellow" />
                  ) : (
                    <Text
                      size="xs"
                      underline
                      color="yellow"
                      component="button"
                      onClick={() => {
                        setOtp("");
                        fetchOTP();
                      }}
                    >
                      Дахин авах
                    </Text>
                  )
                ) : (
                  <Text size="xs" color="orange">
                    {seconds} секунд хүлээнэ үү
                  </Text>
                )}
              </Group>
              {/* <Stack spacing={0}>
                <Text size="sm">Дахин илгээх</Text>
                <Text size="sm">60</Text>
              </Stack> */}
            </Group>
          </Stack>
        )}
        <Button
          mt="md"
          color="yellow"
          loading={loading}
          onClick={otpRequested ? handleLogin : fetchOTP}
        >
          {otpRequested ? "Нэвтрэх" : "Үргэлжлүүлэх"}
        </Button>
      </Stack>
    </Container>
  );
}
