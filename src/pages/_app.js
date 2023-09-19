import "@/styles/globals.css";
import { StoreProvider } from "@/utils/Store";
import { MantineProvider, createEmotionCache, rem } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
const appendCache = createEmotionCache({ key: "mantine", prepend: false });
import { ModalsProvider } from "@mantine/modals";
import LoginModal from "@/components/LoginModal/LoginModal";
import { UserConfigProvider } from "@/utils/userConfigProvider";
import CategoryContextProvider from "@/utils/categoryContext";
import PaymentModal from "@/components/PaymentModal/PaymentModal";

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      emotionCache={appendCache}
      theme={{
        colorScheme: "light",
        focusRingStyles: {
          styles: (theme) => ({ outline: `${rem(2)} solid #f9bc609d` }),
          inputStyles: (theme) => ({ outline: `${rem(2)} solid #f9bc609d` }),
        },
      }}
    >
      <Notifications />
      <UserConfigProvider>
        <ModalsProvider modals={{ login: LoginModal, payment: PaymentModal }}>
          <CategoryContextProvider>
            <StoreProvider>
              <Component {...pageProps} />
            </StoreProvider>
          </CategoryContextProvider>
        </ModalsProvider>
      </UserConfigProvider>
    </MantineProvider>
  );
}
