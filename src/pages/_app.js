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
import { useMantineTheme } from '@mantine/core';

export default function App({ Component, pageProps }) {
  const theme = useMantineTheme();

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
              <div style={{ background: theme.colors.blue[5] }}>
                <Component {...pageProps} />
              </div>
            </StoreProvider>
          </CategoryContextProvider>
        </ModalsProvider>
      </UserConfigProvider>
    </MantineProvider>
  );
}
