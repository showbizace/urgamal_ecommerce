import "@/styles/globals.css";
import { StoreProvider } from "@/utils/Store";
import { UserProvider } from "@/utils/userProvider";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { getCookie } from "cookies-next";
import Router from "next/router";
import { useState, useEffect, use } from "react";
const appendCache = createEmotionCache({ key: "mantine", prepend: false });
import { ModalsProvider } from "@mantine/modals";
import LoginModal from "@/components/LoginModal/LoginModal";

// function Loading() {
//   const [loading, setLoading] = useState(false);

Router.onRouteChangeStart = () => {
  console.log("onRouteChangeStart triggered");
};

Router.onRouteChangeComplete = () => {
  console.log("onRouteChangeComplete triggered");
};

Router.onRouteChangeError = () => {
  console.log("onRouteChangeError triggered");
};
// return loading && (
//   <div className='w-48 h-48 fixed flex justify-center items-center top-0 left-0 bg-white z-10'>
//     <div className='absolute' style={{ left: "50%", top: "50%" }}>
//       loading....
//     </div>
//   </div>
// )

export default function App({ Component, pageProps, userInfo }) {
  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      emotionCache={appendCache}
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
      }}
    >
      <Notifications />
      {/* <Loading /> */}
      <ModalsProvider modals={{ login: LoginModal }}>
        <UserProvider userInfo={userInfo}>
          <StoreProvider>
            <Component {...pageProps} />
          </StoreProvider>
        </UserProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

App.getInitialProps = async ({ req, res }) => {
  const userToken = getCookie("token", { req, res });
  if (!userToken) {
    return {
      userInfo: null,
    };
  }
  try {
    const result = await fetch(`${process.env.API_URL}/user/profile`, {
      headers: {
        Authorization: userToken,
      },
    });
    const jsonData = await result.json();
    const userData = jsonData.data;
    return {
      userInfo: {
        givenName: userData.given_name,
        familyName: userData.family_name,
        email: userData.email,
        mobile: userData.mobile,
      },
    };
  } catch (error) {
    return {
      userInfo: null,
    };
  }
};
