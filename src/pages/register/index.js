/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import {
  TextInput,
  Button,
  rem,
  PasswordInput,
  Text,
  Input,
} from "@mantine/core";
import React, { useState, useEffect, useContext } from "react";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { IconAt, IconLock, IconShieldLock } from "@tabler/icons-react";

import { fetchMethod } from "@/utils/fetch";
import { showNotification } from "@mantine/notifications";
import { UserConfigContext } from "@/utils/userConfigContext";
const icon = (
  <IconAt
    style={{ width: rem(16), height: rem(16), color: "green" }}
    stroke={1.5}
  />
);
const passIcon = (
  <IconLock
    style={{ width: rem(16), height: rem(16), color: "green" }}
    stroke={1.5}
  />
);

const shieldIcon = (
  <IconShieldLock
    style={{ width: rem(16), height: rem(16), color: "green" }}
    stroke={1.5}
  />
);

const Register = () => {
  const router = useRouter();
  const { login } = useContext(UserConfigContext);
  const [password, setPassowrd] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [email, setEmail] = useState("");
  const [errorPass, setErrorPass] = useState(false);
  const [errorConPass, setErrorConPass] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [checkUpper, setCheckUpper] = useState(false);
  const [checkLower, setCheckLower] = useState(false);
  const [checkSpecial, setCheckSpecial] = useState(false);
  const [checkCharacter, setCheckCharacter] = useState(false);
  const [checkSame, setCheckSame] = useState(false);
  const [show, setShow] = useState(false);

  const uppercase = /[A-Z]/;
  const lowercase = /[a-z]/;
  const special = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  const character = /.{8,}/;

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

  useEffect(() => {
    if (confirmPass.length > 0) {
      check("same", new RegExp(""));
    }
  }, [confirmPass]);

  const handleRegister = async () => {
    if (password.length === 0) {
      setErrorPass(true);
    } else {
      setErrorConPass(false);
    }
    if (email.length === 0) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }
    if (confirmPass.length === 0) {
      setErrorConPass(true);
    } else {
      setErrorConPass(false);
    }

    if (
      !errorConPass &&
      !errorEmail &&
      !errorPass &&
      checkUpper &&
      checkLower &&
      checkSpecial &&
      checkCharacter &&
      checkSame
    ) {
      const requestOption = {
        email,
        password,
        given_name: "test",
      };
      const data = await fetchMethod("POST", "auth", "", requestOption);
      if (data?.success) {
        const bigDate = 30 * 24 * 60 * 60 * 1000;
        login();
        const token = data.token;
        setCookie("token", token, {
          maxAge: bigDate,
        });
        setCookie("email", email, { maxAge: bigDate });
        router.push("/home");
        showNotification({
          message: "Амжилттай бүртгүүллээ.",
          color: "green",
        });
      } else {
        showNotification({
          message: data.message,
          color: "red",
        });
      }
    }
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

  const renderCheck = (state, text) => {
    return (
      <Text size={"sm"} color={state ? "#32D583" : "#F97066"}>
        {text}
      </Text>
    );
  };

  return (
    <div className="w-full h-full flex flex-row absolute">
      <div className="w-4/6 h-full relative">
        <Image fill src={"/plant.jpg"} alt="plant" objectFit="cover" />
      </div>
      <div className="flex flex-col relative items-center justify-center w-2/6">
        <Image src="/logo.png" width={100} height={100} alt="logo" />
        <p className="text-xl font-bold mt-4">Бүртгүүлэх</p>
        <div className="mt-5 w-4/6">
          <TextInput
            className="mt-2"
            label="Цахим шуудан"
            placeholder="Цахим шуудан"
            radius={"xl"}
            value={email}
            icon={icon}
            onChange={(event) => setEmail(event.currentTarget.value)}
            styles={(theme) => ({
              label: {
                marginBottom: rem(4),
                fontSize: rem(15),
                fontWeight: "400",
              },
              input: {
                "&:focus-within": {
                  outline: "0.01rem solid green",
                },
              },
            })}
          />
          {errorEmail && (
            <Input.Error className="mt-1">
              Цахим шуудан хоосон байна
            </Input.Error>
          )}
          <PasswordInput
            className="mt-2"
            label="Нууц үг"
            placeholder="*********"
            radius={"xl"}
            icon={passIcon}
            value={password}
            onChange={(event) => setPassowrd(event.currentTarget.value)}
            styles={(theme) => ({
              label: {
                marginBottom: rem(4),
                fontSize: rem(15),
                fontWeight: "400",
              },
              input: {
                "&:focus-within": {
                  outline: "0.01rem solid green",
                },
              },
            })}
          />
          {errorPass && (
            <Input.Error className="mt-1">Нууц үг хоосон байна</Input.Error>
          )}
          <PasswordInput
            className="mt-2"
            label="Нууц үг давтах"
            placeholder="*********"
            radius={"xl"}
            icon={shieldIcon}
            value={confirmPass}
            onChange={(event) => setConfirmPass(event.currentTarget.value)}
            styles={(theme) => ({
              label: {
                marginBottom: rem(4),
                fontSize: rem(15),
                fontWeight: "400",
              },
              input: {
                "&:focus-within": {
                  outline: "0.01rem solid green",
                },
              },
            })}
          />
          {errorConPass && (
            <Input.Error className="mt-1">
              Нууц үг давтах хоосон байна
            </Input.Error>
          )}
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
              {renderCheck(
                checkUpper,
                "Багадаа хаяж 1 том үсэг оруулсан байна"
              )}
              {renderCheck(
                checkLower,
                "Багадаа хаяж 1 жижиг үсэг оруулсан байна"
              )}
              {renderCheck(
                checkSpecial,
                "Багадаа  1 тусгай тэмдэгт оруулсан байна"
              )}
              {renderCheck(checkCharacter, "8-аас багагүй урттай байна")}
              {renderCheck(checkSame, "Нууц үг ижилхэн байна")}
            </div>
          )}
          <Button
            variant="outline"
            radius="xl"
            className="mt-8"
            w={"100%"}
            type="submit"
            onClick={() => handleRegister()}
          >
            Бүртгүүлэх
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
