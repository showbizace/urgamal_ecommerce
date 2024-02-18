/* eslint-disable react-hooks/exhaustive-deps */
import useSocket from "@/hooks/useSocket";
import { tokenDecode } from "@/utils/utils";
import { Button, Popover, rem } from "@mantine/core";
import { getCookie } from "cookies-next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";

const Notification = () => {
  const socketContext = useSocket();
  const [list, setList] = useState([]);

  const handleNew = (data) => {
    console.log(data, "new data");
    // setList(data);
  };
  const handleData = (data) => {
    console.log(data, "data");
    setList(data);
  };

  useEffect(() => {
    if (socketContext.status) {
      const token = getCookie("token");
      if (token) {
        const decode = tokenDecode(token);
        socketContext?.socket?.emit("myNotification", {
          userid: decode.userid,
          limit: 10,
          offset: 0,
        });
        socketContext?.socket.on("newNotification", function (data) {
          handleNew(data);
        });
        socketContext?.socket.on("notificationData", function (data) {
          console.log(data, "data");
          handleData(data);
        });
      }
    }
    return () => socketContext?.socket?.off;
  }, []);

  return (
    <Popover position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button variant="transparent">
          <NotificationButtonImage list={list} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="w-80 flex flex-col gap-2 max-h-96 overflow-auto">
          {list?.map((item, index) => (
            <NotificationItem key={index} data={item} index={index} />
          ))}
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

const NotificationButtonImage = ({ list }) => {
  return (
    <div>
      <Image
        alt="notification"
        src="/icons/notification.svg"
        width={25}
        height={23}
        className="max-xs:w-6 h-6"
      />
      <div className="absolute">
        {list?.length > 0 && (
          <div className="w-3.5 h-3.5 bg-number flex justify-center items-center text-white -mt-8 rounded-full text-xs ml-4">
            <p className="text-sm-5">{list?.length}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Notification;
