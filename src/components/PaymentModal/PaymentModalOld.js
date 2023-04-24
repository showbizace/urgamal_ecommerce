{
  /* <Modal
  opened={opened}
  onClose={close}
  title="Төлбөр"
  centered
  size="md"
  closeOnClickOutside={false}
>
  <div className="flex flex-col gap-2">
    <Tabs
      defaultValue="qpay"
      variant="default"
      classNames={{
        panel: "my-8",
      }}
    >
      <Tabs.List grow>
        <Tabs.Tab value="qpay">Qpay- р төлөх</Tabs.Tab>
        <Tabs.Tab value="apps">Төлбөрийн апп-ууд</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="qpay" pt="xs">
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="relative h-60 w-60">
            <Image
              alt="qpay-qr"
              fill
              src={`data:image/jpeg;base64, ${paymentData?.qr_image}`}
            />
          </div>
          
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="apps" pt="xs">
        <div className="h-full w-full flex flex-col justify-center items-center">
          <Text align="center">
            Та доорх төлбөрийн апп-уудаар төлбөрөө гар утаснаасаа шууд хийх
            боломжтой.{" "}
          </Text>
          <div className="flex flex-wrap justify-center items-start gap-4 mt-6">
            {paymentData?.urls.map((payment) => {
              return (
                <div className="flex flex-col justify-center gap-3">
                  <Link href={payment.link}>
                    <div className="relative h-14 w-14">
                      <Image
                        alt="qpay-qr"
                        fill
                        loader={() => payment?.logo}
                        src={payment?.logo}
                        className="rounded-lg"
                      />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </Tabs.Panel>
    </Tabs>
    <Button variant="subtle" onClick={close}>
      Буцах
    </Button>
  </div>
</Modal> */
}
