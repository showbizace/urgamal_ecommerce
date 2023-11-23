/* eslint-disable react-hooks/exhaustive-deps */
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
  Textarea,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useEffect } from "react";

function ProductModal({
  initialData,
  isOpen,
  close,
  onSubmit,
  loading,
  handleClick,
}) {
  const route = useRouter();
  const form = useForm({
    initialValues: {
      name: initialData?.name,
      city: initialData?.city,
      province: initialData?.province,
      district: initialData?.district,
      committee: initialData?.committee,
      street: initialData?.street,
      fence: initialData?.fence,
      apartment: initialData?.apartment,
      number: initialData?.number,
      phone: initialData?.phone,
      type: false,
      note: initialData?.note,
    },
    validate: {
      name: isNotEmpty("Заавал бөглөх"),
      city: (value, values) =>
        !values.type && value === undefined ? "Заавал бөглөх city" : null,
      province: (value, values) =>
        values.type && value === undefined ? "Заавал бөглөх province" : null,
      district: isNotEmpty("Заавал бөглөх"),
      committee: isNotEmpty("Заавал бөглөх"),
      street: isNotEmpty("Заавал бөглөх"),
      apartment: isNotEmpty("Заавал бөглөх"),
      number: isNotEmpty("Заавал бөглөх"),
      phone: isNotEmpty("Заавал бөглөх"),
    },
    validateInputOnChange: true,
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
      centered
      closeOnClickOutside={false}
    >
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <form
        onSubmit={form.onSubmit(async (values, e) => {
          console.log(values, "inital on form");
          await onSubmit(values);
          form.setValues(initialData);
          // handleClick && handleClick();
          // close();
          // route.reload();
        })}
      >
        <Group position="center">
          <Grid grow>
            <Grid.Col span={12}>
              <Switch
                label="Орон нутаг"
                {...form.getInputProps("type", { type: "checkbox" })}
                color="teal"
                size="sm"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                withAsterisk
                id="input-name"
                label="Нэр"
                {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                className="w-full"
                label="Хот/Аймаг"
                placeholder="Хот / Аймаг сонгоно уу."
                required
                {...form.getInputProps(form.values.type ? "province" : "city")}
                withinPortal
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
                id="input-district"
                label="Дүүрэг / Сум"
                {...form.getInputProps("district")}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <TextInput
                className="w-full"
                withAsterisk
                id="input-committee"
                label="Хороо / Баг"
                {...form.getInputProps("committee")}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <TextInput
                className="w-full"
                withAsterisk
                id="input-street"
                label="Гудамж"
                {...form.getInputProps("street")}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <TextInput
                className="w-full"
                withAsterisk
                id="input-apartment"
                label="Байр / Байгуулга"
                {...form.getInputProps("apartment")}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <TextInput
                className="w-full"
                withAsterisk
                id="input-number"
                label="Тоот"
                {...form.getInputProps("number")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                className="w-full"
                withAsterisk
                id="input-phone"
                type="tel"
                label="Утасны дугаар"
                {...form.getInputProps("phone")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                className="w-full"
                withAsterisk
                id="input-note"
                label="Нэмэлт тайлбар"
                {...form.getInputProps("note")}
                maxLength={250}
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
