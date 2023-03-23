import {
  Modal,
  Button,
  Grid,
  Group,
  Switch,
  Select,
  Input,
  TextInput,
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
      // phone: (value) => (value ? null : "Заавал бөглөх!"),
      // district: (value) => (value ? null : "Заавал бөглөх!"),
      // committee: (value) => (value ? null : "Заавал бөглөх!"),
      // street: (value) => (value ? null : "Заавал бөглөх!"),
      // fence: (value) => (value ? null : "Заавал бөглөх!"),
      // apartment: (value) => (value ? null : "Заавал бөглөх!"),
      // number: (value) => (value ? null : "Заавал бөглөх!"),
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
                {...form.getInputProps("type", { type: "checkbox" })}
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
              <TextInput
                className="w-full"
                withAsterisk
                id="input-demo"
                label="Дүүрэг / Сум"
                {...form.getInputProps("district")}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <TextInput
                className="w-full"
                withAsterisk
                id="input-demo"
                label="Хороо / Баг"
                {...form.getInputProps("committee")}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <TextInput
                className="w-full"
                withAsterisk
                id="input-demo"
                label="Гудамж"
                {...form.getInputProps("street")}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <TextInput
                className="w-full"
                withAsterisk
                id="input-demo"
                label="Байр / Байгуулга"
                {...form.getInputProps("apartment")}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <TextInput
                className="w-full"
                withAsterisk
                id="input-demo"
                label="Тоот"
                {...form.getInputProps("number")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                className="w-full"
                withAsterisk
                id="input-demo"
                label="Утасны дугаар"
                {...form.getInputProps("phone")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Group position="right">
                <Button variant="subtle" size="xs" color="red" onClick={close}>
                  Цуцлах
                </Button>
                <Button size="xs" type="submit" color="yellow">
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
