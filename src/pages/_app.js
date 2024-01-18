import "@/styles/globals.css";
import { MantineProvider, createEmotionCache, rem } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
const appendCache = createEmotionCache({ key: "mantine", prepend: false });
import { ModalsProvider } from "@mantine/modals";
import LoginModal from "@/components/LoginModal/LoginModal";
import { UserConfigProvider } from "@/utils/userConfigProvider";
import CategoryContextProvider from "@/utils/categoryContext";
import PaymentModal from "@/components/PaymentModal/PaymentModal";
import { useMantineTheme } from "@mantine/core";
import { Open_Sans } from "@next/font/google";

const sans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <main
                className={`${sans.variable}`}
                style={{ width: "100%", height: "100%" }}
              >
                <Component {...pageProps} />
              </main>
            </div>
          </CategoryContextProvider>
        </ModalsProvider>
      </UserConfigProvider>
    </MantineProvider>
  );
}
