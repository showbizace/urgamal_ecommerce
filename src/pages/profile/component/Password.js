/* eslint-disable react-hooks/exhaustive-deps */
import { fetchMethod } from "@/utils/fetch";
import {
  Button,
  Center,
  Group,
  Input,
  Loader,
  PasswordInput,
  PinInput,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import {
  IconLock,
  IconShieldLock,
  IconDeviceMobile,
  IconSend,
  IconCircleXFilled,
  IconCheck,
} from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

const Password = (props) => {
  const { setTabs } = props;
  const [seconds, setSeconds] = useState(60);
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [errorPass, setErrorPass] = useState(false);
  const [errorConPass, setErrorConPass] = useState(false);
  const [checkUpper, setCheckUpper] = useState(false);
  const [checkLower, setCheckLower] = useState(false);
  const [checkSpecial, setCheckSpecial] = useState(false);
  const [checkCharacter, setCheckCharacter] = useState(false);
  const [checkSame, setCheckSame] = useState(false);
  const [show, setShow] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);

  const uppercase = /[A-Z]/;
  const lowercase = /[a-z]/;
  const special = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  const character = /.{8,}/;

  useEffect(() => {
    if (otpRequested) {
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
    }
  }, [seconds, otpRequested]);

  useEffect(() => {
    if (confirmPass.length > 0) {
      check("same", new RegExp(""));
    }
  }, [confirmPass]);

  useEffect(() => {
    if (password.length > 0) {
      setShow(true);
      check("upper", uppercase);
      check("lower", lowercase);
      check("special", special);
      check("character", character);
    } else {
      setShow(false);
    }
  }, [password]);

  const fetchOTP = async () => {
    setLoading(true);
    try {
      const data = await fetchMethod("GET", `auth/code?mobile=${number}`);
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

  const check = (type, regex) => {
    switch (type) {
      case "upper":
        regex.test(password) ? setCheckUpper(true) : setCheckUpper(false);
        break;
      case "lower":
        regex.test(password) ? setCheckLower(true) : setCheckLower(false);
        break;
      case "special":
        regex.test(password) ? setCheckSpecial(true) : setCheckSpecial(false);
        break;
      case "character":
        regex.test(password)
          ? setCheckCharacter(true)
          : setCheckCharacter(false);
        break;
      case "same":
        password === confirmPass ? setCheckSame(true) : setCheckSame(false);
        break;
    }
  };

  const handleSave = async () => {
    if (password.length === 0) {
      setErrorPass(true);
    } else {
      setErrorPass(false);
    }
    if (confirmPass.length === 0) {
      setErrorConPass(true);
    } else {
      setErrorConPass(false);
    }

    if (
      !errorConPass &&
      !errorPass &&
      checkUpper &&
      checkLower &&
      checkSpecial &&
      checkCharacter &&
      checkSame
    ) {
      const token = getCookie("token");
      const requestOption = {
        code: otp,
        newpassword: password,
      };
      try {
        const data = await fetchMethod(
          "POST",
          "auth/changepass",
          token,
          requestOption
        );
        if (data.success) {
          setTabs("info");
          setOtp("");
          setPassword("");
          confirmPass("");
          showNotification({
            message: "Таны нууц үг амжилттай солигдлоо.!",
            color: "green",
          });
        } else {
          showNotification({
            message: data.message,
            color: "red",
            icon: (
              <IconCircleXFilled
                style={{
                  width: rem(30),
                  height: rem(30),
                }}
              />
            ),
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const renderCheck = (state, text) => {
    return (
      <Text size={"sm"} color={state ? "#32D583" : "#F97066"} fw={600}>
        - {text}
      </Text>
    );
  };

  const handleSend = async () => {
    if (number.length < 8) {
      showNotification({
        message: "Дугаар буруу байна.!",
        color: "red",
        icon: (
          <IconCircleXFilled
            style={{
              width: rem(30),
              height: rem(30),
            }}
          />
        ),
      });
    } else {
      setLoading(true);
      try {
        const data = await fetchMethod("GET", `auth/code?mobile=${number}`);
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
    }
  };

  return (
    <div className="mt-4">
      <div className="w-full flex flex-col gap-8 mt-4 py-10">
        <Center>
          <Stack justify="center">
            <Center>
              <IconDeviceMobile
                style={{ width: rem(46), height: rem(46), color: "#F9BC60" }}
                stroke={2}
              />
            </Center>
            <Center>
              <Text size="md" fw={600}>
                {otpRequested ? "Нэг удаагийн кодэ" : "Утасны дугаар"}
              </Text>
            </Center>
            <Center>
              <Text size="sm" c="dimmed">
                {otpRequested
                  ? "Та 6 оронтой кодэ оруулна уу"
                  : "Та нэг удаагийн кодэ авах дугаараа оруулна уу"}
              </Text>
            </Center>
            <Center>
              <Group justify="center">
                {otpRequested ? (
                  <PinInput
                    id="otp-input"
                    oneTimeCode
                    inputMode="decimal"
                    type="number"
                    length={6}
                    size="md"
                    value={otp}
                    onChange={setOtp}
                  />
                ) : (
                  <PinInput
                    id="number"
                    oneTimeCode
                    inputMode="decimal"
                    type="number"
                    placeholder=""
                    length={8}
                    size="md"
                    value={number}
                    onChange={setNumber}
                  />
                )}
              </Group>
            </Center>
            {otpRequested ? (
              seconds === 0 ? (
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
                <Center>
                  <Text size="xs" color="orange">
                    {seconds} секунд хүлээнэ үү
                  </Text>
                </Center>
              )
            ) : (
              <Button
                onClick={() => handleSend()}
                variant="outline"
                color="orange"
                styles={(theme) => ({
                  root: {
                    marginTop: rem(10),
                    borderColor: "#F9BC60",
                  },
                  label: {
                    color: "#F9BC60",
                  },
                })}
                leftIcon={
                  <IconSend
                    style={{
                      width: rem(20),
                      height: rem(20),
                      color: "#F9BC60",
                    }}
                    stroke={2}
                  />
                }
              >
                SMS илгээх
              </Button>
            )}
          </Stack>
        </Center>
      </div>
      <div className="w-full flex flex-row gap-8">
        <div className="w-full">
          <PasswordInput
            disabled={otp?.length < 6}
            size="sm"
            label="Шинэ нууц үг"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            icon={
              <IconLock
                style={{ width: rem(20), height: rem(20), color: "#F9BC60" }}
                stroke={2}
              />
            }
            placeholder="*********"
            styles={(theme) => ({
              label: {
                marginBottom: rem(4),
                fontSize: rem(15),
                fontWeight: "400",
              },
            })}
          />
          {errorPass && (
            <Input.Error className="mt-1">
              Шинэ нууц үг хоосон байна
            </Input.Error>
          )}
        </div>
        <div className="w-full">
          <PasswordInput
            value={confirmPass}
            disabled={otp?.length < 6}
            size="sm"
            label="Шинэ нууц үг давтах"
            onChange={(event) => setConfirmPass(event.currentTarget.value)}
            placeholder="*********"
            icon={
              <IconShieldLock
                style={{ width: rem(20), height: rem(20), color: "#F9BC60" }}
                stroke={2}
              />
            }
            styles={(theme) => ({
              label: {
                marginBottom: rem(4),
                fontSize: rem(15),
                fontWeight: "400",
              },
            })}
          />
          {errorConPass && (
            <Input.Error className="mt-1">
              Шинэ нууц үг давтах хоосон байна
            </Input.Error>
          )}
        </div>
      </div>
      {show && (
        <div
          className="w-full py-2 px-4 rounded-lg mt-2"
          style={{
            backgroundColor:
              checkUpper &&
              checkLower &&
              checkSpecial &&
              checkCharacter &&
              checkSame
                ? "#D1FADF"
                : "#FEE4E2",
          }}
        >
          {renderCheck(checkUpper, "Багадаа хаяж 1 том үсэг оруулсан байна")}
          {renderCheck(checkLower, "Багадаа хаяж 1 жижиг үсэг оруулсан байна")}
          {renderCheck(
            checkSpecial,
            "Багадаа  1 тусгай тэмдэгт оруулсан байна"
          )}
          {renderCheck(checkCharacter, "8-аас багагүй урттай байна")}
          {renderCheck(checkSame, "Нууц үг ижилхэн байна")}
        </div>
      )}
      <div className="w-full flex flex-row justify-end gap-8 mt-4">
        <Button variant="outline" color="red">
          Арилгах
        </Button>
        <Button
          variant="filled"
          color="orange"
          onClick={() => handleSave()}
          styles={(theme) => ({
            root: {
              backgroundColor: "#F9BC60",
            },
          })}
        >
          Хадгалах
        </Button>
      </div>
    </div>
  );
};

export default Password;
