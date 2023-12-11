//packages
import { useEffect, useState } from "react";
import React from "react";
import { IconLocation, IconPhoneCall, IconClock } from "@tabler/icons-react";
import { SegmentedControl, Center, Box, rem } from "@mantine/core";
import Image from "next/image";
import sanitizeHtml from "sanitize-html";
import Map from "@/components/Map";
import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";
import axios from "axios";
import { Carousel } from "@mantine/carousel";

const Location = ({ data }) => {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingMap, setLoadingMap] = useState(false);
  const location = data[selectedLocation];
  const [loc, setLoc] = useState([]);

  useEffect(() => {
    window.dispatchEvent(new Event("storage"));
  }, [selectedLocation]);

  const handleLocationChange = (value) => {
    setLoadingData(true);

    const index = data.findIndex((location) => location.name === value);
    if (index !== -1) {
      setSelectedLocation(index);
      setLoadingData(false);
    }
  };

  useEffect(() => {
    setLoadingMap(true);
    setLoc([location?.latitute, location?.longtitute]);
    setLoadingMap(false);
  }, [location]);

  const htmlFrom = (htmlString) => {
    const cleanHtmlString = sanitizeHtml(htmlString);
    return cleanHtmlString;
  };

  return (
    <GlobalLayout>
      <div className="sm:px-6 sm:py-6 bg-nav-background px-4 py-4 h-full ">
        <div className="border rounded">
          <div className="p-4 md:p-10 flex flex-col gap-10">
            <div className="flex justify-center ">
              <div className="overflow-x-auto">
                <SegmentedControl
                  data={data?.map((location, index) => ({
                    value: location?.name,
                    label: (
                      <Center key={index}>
                        <Box key={index}>{`${location?.name}`}</Box>
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

            <Carousel
              withIndicators
              height={"100%"}
              style={{ flex: 1 }}
              slideSize="100%"
              sx={{ flex: 1 }}
              loop
            >
              {location?.img_url.map((el, idx) => {
                return (
                  <Carousel.Slide key={(el, idx)}>
                    <div className="relative w-full h-80" key={el}>
                      <Image
                        key={el}
                        src={el}
                        alt="image"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </Carousel.Slide>
                );
              })}
            </Carousel>
            <div className="relative flex h-full md:h-96 flex-col md:flex-row gap-10 justify-center items-center">
              <div className="w-full h-80 md:h-full rounded-lg border shadow-lg">
                {!loadingMap && (
                  <Map center={loc} zoom={14} key={location?.name}>
                    {({ TileLayer, Marker, Popup }) => (
                      <>
                        <TileLayer
                          key={location?.name}
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />

                        <Marker position={loc} key={location?.name}>
                          <Popup key={location?.name}>{location?.name}</Popup>
                        </Marker>
                      </>
                    )}
                  </Map>
                )}
              </div>
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
                  <span
                    className="w-11/12"
                    dangerouslySetInnerHTML={{
                      __html: htmlFrom(location?.address),
                    }}
                  />
                </li>
                <li className="flex items-center gap-4 mt-5">
                  <IconPhoneCall width={25} height={25} color={"#f9bc60"} />{" "}
                  <span className="font-semibold">Утас :</span>{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: htmlFrom(location?.phone),
                    }}
                  />
                </li>
                <li className="flex items-center gap-4 mt-5">
                  <IconClock width={25} height={25} color={"#f9bc60"} />{" "}
                  <span className="font-semibold">Цагийн хуваарь :</span>{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: htmlFrom(location?.time_table),
                    }}
                  />
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
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/config/branch`
    );
    const data = await response?.data?.data;

    return {
      props: {
        data: data || null,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
      },
    };
  }
}

export default Location;
