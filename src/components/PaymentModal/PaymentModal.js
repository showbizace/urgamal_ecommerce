import { Button, Card, Stack, Tabs, Text } from "@mantine/core";
import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function PaymentModal({ context, id, innerProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const socket = io("https://api.urga.mn/dev");

    socket.emit("test", (message) => {
      console.log(message, "message");
    });

    socket.on("connection", () => console.log("Connected"));

    return () => {
      socket.disconnect();
    };
  }, []);

  const callInquiry = (invoiceId) => {
    setLoading(true);
    const userToken = getCookie("token");
    const axiosReqOption = {
      headers: {
        Authorization: "Bearer " + userToken,
        "Content-Type": "application/json",
      },
    };
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/order/payment/inquiry/${invoiceId}`,
        axiosReqOption
      )
      .then((_) => {})
      .catch((_) => {});
    setLoading(false);
  };
  return (
    <div className="flex flex-col mt-2 gap-4 items-center">
      <Tabs defaultValue="qpay" classNames={{ panel: "mt-6" }} color="yellow">
        <Tabs.List grow>
          <Tabs.Tab value="qpay">Qpay- р төлөх</Tabs.Tab>
          <Tabs.Tab value="others">Бусад апп</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="qpay">
          <Stack align="center">
            <Text size="sm">
              Та Qpay ашиглан төлбөрөө доорх зургийг уншуулан төлөөрэй
            </Text>
            <div className="relative w-64 h-64 lg:h-96 lg:w-96">
              <Image
                src={`data:image/png;base64,${innerProps.paymentData?.qr_image}`}
                alt="qpay QR"
                fill
              />
            </div>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="others">
          <Stack align="center">
            <Text size="sm">
              Та доорх төлбөрийн хэрэгслүүдээр төлбөрөө гар утаснаасаа шууд хийх
              боломжтой
            </Text>
            <div className="flex flex-wrap gap-4 justify-center">
              {innerProps.paymentData?.urls.map((e, index) => {
                return (
                  <Card component="a" href={e.link} radius="lg" key={index}>
                    <div
                      key={e.name}
                      className="flex flex-col gap-2 w-14 max-w-14 justify-center items-center"
                    >
                      <div className="relative h-12 w-12">
                        <Image
                          loader={() => e.logo}
                          src={e.logo}
                          alt={e.description}
                          fill
                          className="rounded-md"
                        />
                      </div>
                      <Text size="xs" align="center">
                        {e.description}
                      </Text>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Stack>
        </Tabs.Panel>
      </Tabs>
      <Button
        variant="subtle"
        color="yellow"
        fullWidth
        loading={loading}
        onClick={() => {
          callInquiry(innerProps.paymentData?.invoice_id);
          context.closeModal(id);
          if (innerProps.shouldRedirect) {
            router.push({
              pathname: "/profile",
              query: {
                cr: "order",
              },
            });
          }
        }}
      >
        Болсон
      </Button>
    </div>
  );
}
