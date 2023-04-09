import {
  ActionIcon,
  Button,
  Container,
  Divider,
  Group,
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
import { useEffect, useState } from "react";

export default function LoginModal({ context, id }) {
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/code?mobile=${mobileNumber}`
      );
      if (res.status === 200) {
        setOtpRequested(true);
        setSeconds(60);
      }
    } catch {}
    setLoading(false);
  };
  const handleLogin = async () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login/code`,
        { mobile: mobileNumber, code: otp },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res.status === 200) {
          setCookie("token", res.data.token);
          setCookie("number", mobileNumber);
          setCookie("addCart", true);
          showNotification({
            message: "Амжилттай нэвтэрлээ",
            color: "green",
          });
          context.closeModal(id);
        }
      })
      .catch((error) => {
        showNotification({
          message: "Код буруу эсвэл хүчинтэй хугацаа дууссан байна.",
          color: "red",
        });
      });
  };
  return (
    <Container>
      <Stack spacing="lg">
        <Stack mt="lg" spacing={8}>
          <label for="mobile-number-input">
            <Text weight={500}>Утасны дугаар</Text>
          </label>
          <PinInput
            id="mobile-number-input"
            inputMode="tel"
            type="number"
            placeholder=""
            length={8}
            autoFocus
            size="md"
            value={mobileNumber}
            onChange={setMobileNumber}
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
