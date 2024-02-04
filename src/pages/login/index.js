/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import { TextInput, Button, rem, PasswordInput } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import { IconAt, IconLock } from "@tabler/icons-react";
import { Buttons } from "./component";
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

const Login = () => {
  const router = useRouter();
  const { login } = useContext(UserConfigContext);
  const token = getCookie("token");
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        value.length > 0
          ? /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)
            ? null
            : "Цахим шуудан буруу байна."
          : "Цахим шуудан хоосон байна",
      password: (value) =>
        value.length > 0
          ? value.length < 4 && "Нууц үг хамгийн багадаа 4 үсэгтэй байна"
          : "Нууц үг хоосон байна",
    },
  });

  const handleRegister = () => {
    router.push("register");
  };

  const handleOTP = () => {
    router.push("login/otp");
  };

  const getQueryParams = async () => {
    try {
      const requestOption = {
        "Content-Type": "application/json",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback?code=${router.query.code}&scope=${router.query.scope}&authuser=${router.query.authuser}&prompt=${router.query.prompt}`,
        requestOption
      );
      const data = await res.json();

      if (data.success) {
        const bigDate = 30 * 24 * 60 * 60 * 1000;

        setCookie("token", data.token, {
          maxAge: bigDate,
        });
        router.push("/home");
      } else {
        console.log("error in else");
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  useEffect(() => {
    if (
      router.query.code &&
      router.query.scope &&
      router.query.authuser &&
      router.query.prompt
    ) {
      getQueryParams();
    }
  }, [router.query]);

  const loginFetchData = async (values) => {
    const requestOption = { email: values.email, password: values.password };
    const data = await fetchMethod("POST", `auth/login`, "", requestOption);
    if (data?.success) {
      const bigDate = 30 * 24 * 60 * 60 * 1000;
      login();
      const token = data.token;
      setCookie("token", token, {
        maxAge: bigDate,
      });
      setCookie("email", form.values.email, { maxAge: bigDate });
      router.push("/home");
      showNotification({
        message: "Амжилттай нэвтэрлээ.",
        color: "green",
      });
    } else {
      showNotification({
        message: data.message,
        color: "red",
      });
    }
  };

  const handleFacebook = async () => {
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`);
  };

  const handleGoogle = async () => {
    location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="w-full h-full flex flex-row absolute">
      <div className="w-4/6 h-full relative">
        <Image fill src={"/plant.jpg"} alt="plant" objectFit="cover" />
      </div>
      <div className="flex flex-col relative items-center justify-center w-2/6">
        <Image src="/logo.png" width={100} height={100} alt="logo" />
        <p className="text-xl font-bold mt-4">Нэвтрэх</p>
        <div className="mt-5 w-4/6">
          <form onSubmit={form.onSubmit((values) => loginFetchData(values))}>
            <TextInput
              label="Цахим шуудан"
              placeholder="Цахим шуудан"
              radius={"xl"}
              icon={icon}
              {...form.getInputProps("email")}
              styles={(theme) => ({
                label: {
                  marginBottom: rem(10),
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
            <PasswordInput
              className="mt-4"
              label="Нууц үг"
              placeholder="*********"
              radius={"xl"}
              icon={passIcon}
              {...form.getInputProps("password")}
              styles={(theme) => ({
                label: {
                  marginBottom: rem(10),
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
            <Button
              variant="outline"
              color="green"
              radius="xl"
              className="mt-4"
              w={"100%"}
              type="submit"
            >
              Нэвтрэх
            </Button>
          </form>
          <Buttons
            handleOTP={handleOTP}
            handleRegister={handleRegister}
            handleFacebook={handleFacebook}
            handleGoogle={handleGoogle}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
