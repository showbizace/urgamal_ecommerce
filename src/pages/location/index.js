//packages
import { useEffect, useState } from "react";
import React from "react";
import {
  IconLocation,
  IconPhoneCall,
  IconEye,
  IconClock,
} from "@tabler/icons-react";
import { SegmentedControl, Center, Box, rem } from "@mantine/core";
import Image from "next/image";
import { Loader } from "@googlemaps/js-api-loader";

import GMap from "@/components/Maps";
import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";

let google_api = process.env.NEXT_APP_GOOGLE_API_URL;

const Location = ({ data }) => {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [loadMap, setLoadMap] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const location = data[selectedLocation];

  useEffect(() => {
    window.dispatchEvent(new Event("storage"));
  }, [selectedLocation]);

  useEffect(() => {
    const options = {
      apiKey: google_api || "AIzaSyAr7bE_xuIkoA7dOQplaM7DSd5y2Ij6en8",
      version: "weekly",
      libraries: ["geometry"],
    };

    new Loader(options)
      .load()
      .then(() => {
        setLoadMap(true);
      })
      .catch((e) => {
        console.error(
          "Sorry, something went wrong: Please try again later. Error:",
          e
        );
      });
  }, []);

  const handleLocationChange = (value) => {
    setLoadingData(true);

    const index = data.findIndex((location) => location.name === value);
    if (index !== -1) {
      setSelectedLocation(index);
      setLoadingData(false);
    }
  };

  if (!loadMap) {
    return <>Loading...</>;
  }

  return (
    <GlobalLayout>
      <div className="sm:px-6 sm:py-6 bg-nav-background px-4 py-4 h-full ">
        <div className="border rounded">
          <div className="p-4 md:p-10 flex flex-col gap-10">
            <div className="flex justify-center ">
              <div className="overflow-x-auto">
                <SegmentedControl
                  data={data.map((location, index) => ({
                    value: location.name,
                    label: (
                      <Center>
                        <Box ml={10}>{`Салбар ${index + 1}`}</Box>
                      </Center>
                    ),
                  }))}
                  color="yellow"
                  size="md"
                  radius="xl"
                  bg={"none"}
                  onChange={(value) => handleLocationChange(value)}
                />
              </div>
            </div>
            <div className="relative w-full h-80">
              <Image
                src={location?.image_url}
                alt="image"
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div className="relative flex h-full md:h-96 flex-col md:flex-row gap-10 justify-center items-center">
              <GMap lng={location.lng} lat={location.lat} />
              <ul className="h-full w-full md:text-lg list-none text-start">
                <li className="flex gap-4 gtext-start">
                  <div className="flex items-start gap-4 ">
                    <IconLocation
                      width={25}
                      height={25}
                      className="mt-1"
                      color={"#f9bc60"}
                    />
                    <span className="font-semibold">Хаяг:</span>
                  </div>
                  <span className="w-11/12">{location?.description}</span>
                </li>
                <li className="flex items-center gap-4 mt-5">
                  <IconPhoneCall width={25} height={25} color={"#f9bc60"} />{" "}
                  <span className="font-semibold">Утас :</span>{" "}
                  {location?.phone_number}
                </li>
                <li className="flex items-center gap-4 mt-5">
                  <IconClock width={25} height={25} color={"#f9bc60"} />{" "}
                  <span className="font-semibold">Цагийн хуваарь :</span>{" "}
                  {location?.work_time}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
};

export async function getServerSideProps() {
  try {
    const response = await fetch(`http://localhost:3000/api/location`);
    const data = await response.json();

    return {
      props: {
        data: data || null,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: null,
      },
    };
  }
}

export default Location;
