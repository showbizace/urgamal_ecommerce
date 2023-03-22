import {
  Modal,
  Button,
  Grid,
  Group,
  Switch,
  Select,
  Input,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

function ProductModal({ initialData, isOpen, close, onSubmit, loading }) {
  const [checked, setChecked] = useState(false);
  const form = useForm({
    initialValues: {
      city: initialData?.city,
      province: initialData?.province,
      district: initialData?.district,
      committee: initialData?.committee,
      street: initialData?.street,
      fence: initialData?.fence,
      apartment: initialData?.apartment,
      number: initialData?.number,
      phone: initialData?.phone,
      type: initialData?.type,
    },
    validate: {
      phone: (value) => (value ? null : "Утас оруулна уу!"),
    },
  });
  useEffect(() => {
    form.setValues(initialData);
    return () => {
      form.reset();
    };
  }, [initialData]);

  return (
    <Modal
      opened={isOpen}
      onClose={() => {
        form.setValues(initialData);
        close();
      }}
      title={initialData?.create ? "Шинэ хаяг нэмэх" : "Хаяг засах"}
      size="lg"
      closeOnClickOutside={false}
    >
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <form
        onSubmit={form.onSubmit(async (values, e) => {
          const a = await onSubmit(values);
          form.setValues(initialData);
          close();
        })}
      >
        <Group position="center">
          <Grid grow>
            <Grid.Col span={12}>
              <Switch
                checked={checked}
                label="Орон нутаг"
                {...form.getInputProps("type")}
                onChange={(event) => {
                  setChecked(event.currentTarget.checked);
                }}
                color="teal"
                size="sm"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                className="w-full"
                label="Хот/Аймаг"
                placeholder="Хот / Аймаг сонгоно уу."
                required
                {...form.getInputProps(checked ? "province" : "city")}
                defaultValue={"Улаанбаатар"}
                data={[
                  {
                    value: "Улаанбаатар",
                    label: "Улаанбаатар",
                    group: "Хот",
                  },
                  {
                    value: "Дархан",
                    label: "Дархан",
                    group: "Хот",
                  },
                  {
                    value: "Дундговь",
                    label: "Дундговь",
                    group: "Аймаг",
                  },
                  {
                    value: "Дорнод",
                    label: "Дорнод",
                    group: "Аймаг",
                  },
                ]}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Input.Wrapper
                className="w-full"
                id="input-demo"
                withAsterisk
                label="Дүүрэг / Сум"
              >
                <Input id="input-demo" {...form.getInputProps("district")} />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={2}>
              <Input.Wrapper
                className="w-full"
                id="input-demo"
                withAsterisk
                label="Хороо / Баг"
              >
                <Input id="input-demo" {...form.getInputProps("committee")} />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={2}>
              <Input.Wrapper
                className="w-full"
                id="input-demo"
                withAsterisk
                label="Гудамж"
              >
                <Input id="input-demo" {...form.getInputProps("street")} />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={2}>
              <Input.Wrapper
                className="w-full"
                id="input-demo"
                withAsterisk
                label="Байр / Байгуулга"
              >
                <Input id="input-demo" {...form.getInputProps("apartment")} />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={2}>
              <Input.Wrapper
                className="w-full"
                id="input-demo"
                withAsterisk
                label="Тоот"
              >
                <Input id="input-demo" {...form.getInputProps("number")} />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={12}>
              <Input.Wrapper
                className="w-full"
                id="input-demo"
                withAsterisk
                label="Утасны дугаар"
              >
                <Input id="input-demo" {...form.getInputProps("phone")} />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={12}>
              <Group position="right">
                <Button variant="subtle" size="xs" onClick={close}>
                  Цуцлах
                </Button>
                <Button size="xs" type="submit">
                  {initialData?.create ? "Үүсгэх" : "Хадгалах"}
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Group>
      </form>
    </Modal>
  );
}

export default ProductModal;
