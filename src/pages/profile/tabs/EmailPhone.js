import { Button, TextInput } from "@mantine/core";
const EmailPhone = () => {
  return (
    <div style={{ width: "72.5%" }} className="flex flex-col">
      <div className=" bg-white ml-8 w-full rounded-md py-4 px-12 h-44">
        <p className="text-lg">Хувийн тохиргоо</p>
        <div className="mt-4 flex flex-row w-full gap-12">
          <div style={{ width: "50%" }}>
            <TextInput
              placeholder=""
              label="Цахим шуудан"
              styles={{
                label: {
                  color: "rgba(0, 30, 29, 0.45);",
                },
                input: {
                  backgroundColor: "#EBEFEE",
                  border: "none",
                },
              }}
            />
          </div>
          <div style={{ width: "50%" }}>
            <TextInput
              placeholder=""
              label="Утас"
              styles={{
                label: {
                  color: "rgba(0, 30, 29, 0.45);",
                },
                input: {
                  backgroundColor: "#EBEFEE",
                  border: "none",
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end mt-4 ml-8 w-full">
        <Button
          variant={"outline"}
          color={"red"}
          style={{ fontWeight: "normal" }}
        >
          Арилгах
        </Button>
        <Button
          variant={"filled"}
          className="ml-4"
          style={{ backgroundColor: "#F9BC60", fontWeight: "normal" }}
        >
          Хадгалах
        </Button>
      </div>
    </div>
  );
};

export default EmailPhone;
