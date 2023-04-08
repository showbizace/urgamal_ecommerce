import Image from "next/image";
import { forwardRef, useEffect, useState } from "react";
import { Autocomplete, Group, Avatar, Text, rem } from "@mantine/core";
import { useRouter } from "next/router";
const Search = () => {
  const router = useRouter();
  // const [data, setData] = useState()
  const charactersList = [
    {
      image: "/bundle-1.svg",
      label: "Энерген Экстра",
      description: "150000₮",
    },
    {
      image: "/bundle-1.svg",
      label: "Энерген Экстра",
      description: "150000₮",
    },
    {
      image: "/bundle-1.svg",
      label: "Энерген Экстра",
      description: "150000₮",
    },
    {
      image: "/bundle-1.svg",
      label: "Энерген Экстра",
      description: "150000₮",
    },
  ];
  const data = charactersList.map((item) => ({ ...item, value: item.label }));

  // useEffect(() => {
  //   getSearchData()
  // }, [])

  // const getSearchData = async () => {
  //   if (token !== undefined && token !== null && token !== "") {
  //     console.log(token, "token");
  //     var myHeaders = new Headers();
  //     myHeaders.append("Authorization", "Bearer " + token);
  //     myHeaders.append("Content-Type", "application/json");
  //     const requestOption = {
  //       method: "GET",
  //       headers: myHeaders,
  //     };
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/product/search?search=${data}`,
  //       requestOption
  //     );
  //     if (res.status === 200) {
  //       const data = await res.json();
  //       console.log(data, "data");
  //       if (data.success === true) {
  //         setData(data.data[10])
  //       }
  //     }
  //   }
  // }

  const Autocomplete2 = forwardRef((props, ref) => {
    return (
      <div ref={ref} style={{ padding: "10px", marginTop: "5px" }}>
        <Group noWrap>
          <Avatar src={props.image} />
          <div>
            <Text>{props.value}</Text>
            <Text size="xs" color="dimmed">
              {props.description}
            </Text>
          </div>
        </Group>
      </div>
    );
  });
  return (
    <div className="py-2 px-10 flex flex-row justify-between w-full">
      <div
        className="flex flex-row px-4 bg-background-sort py-2 justify-center items-center"
        style={{ borderRadius: "4.34402px", width: "10%" }}
      >
        <Image src={"/icons/cube.svg"} width={18} height={18} />
        <p className=" text-white ml-2 font-normal text-sm">Бүх ангилал</p>
      </div>
      <div className=" bg-search-background rounded-md ml-4 flex flex-row py-1 justify-between" style={{ width: "76%", }}>
        <div
          className="flex justify-center items-center flex-row px-4 my-1"
          style={{ borderRight: "1px solid rgba(0, 30, 29, 0.14)" }}
        >
          <p className="text-sm">Бүгд</p>
          <Image
            src="/icons/arrow-down-outline.svg"
            width={8}
            height={13}
            className="ml-1"
          />
        </div>

        <Autocomplete
          className="navbar-input"
          placeholder="Хүссэн бараагаа хайгаарай.."
          itemComponent={Autocomplete2}
          data={data !== undefined && data}
          styles={{
            root: {
              paddingLeft: "5px",
              paddingRight: "5px"
            },
            input: {
              border: "none",
              backgroundColor: "rgba(235, 239, 238, 0.9);",
            },
          }}
          oncha
          filter={(value, item) => {

          }
          }
        />
        <div className="flex justify-center items-center bg-background-sort p-2 rounded-md mr-1">
          <Image src="/icons/search.svg" width={20} height={20} />
        </div>
      </div>
      <div className="flex flex-row justify-end" style={{ width: "13%" }}>
        {/* <div className="flex gap-10">
          <div className="flex flex-row items-center">
            <Image src="/icons/sales.svg" width={25} height={25} />
            <p className="ml-2 text-sm">Онцлох хямдрал</p>
          </div>
          <div className="flex flex-row items-center">
            <Image src="/icons/new-prod.svg" width={25} height={25} />
            <p className="ml-2 text-sm">Шинэ бүтээгдэхүүн</p>
          </div>
        </div> */}
        <div className="flex flex-row items-center">
          <Image src="/icons/phone.svg" width={25} height={25} />
          <p className="ml-2 text-sm text-green">72720808 </p>
          <p
            className="text-sm font-light ml-1 text-[#696A6C] hover:text-black hover:font-semibold "
            onClick={() => router.push("/location")}
          >
            {" "}
            / Байршил
          </p>
        </div>
      </div>
    </div>
  );
};

export default Search;
