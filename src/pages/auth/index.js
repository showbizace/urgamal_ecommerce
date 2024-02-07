/* eslint-disable react-hooks/exhaustive-deps */
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Auth = () => {
  const router = useRouter();
  const [data, setData] = useState();
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
        window.close();
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

  return <div>{data}</div>;
};

export default Auth;
