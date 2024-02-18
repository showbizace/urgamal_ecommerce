/* eslint-disable react-hooks/exhaustive-deps */
import socket from "@/utils/Socket";
import { tokenDecode } from "@/utils/utils";
import { Button, Popover, rem } from "@mantine/core";
import { getCookie } from "cookies-next";
import Image from "next/image";
import React, { useEffect } from "react";

const Notification = ({ icon }) => {
  useEffect(() => {
    const token = getCookie("token");
    let decode = "";
    if (token) {
      decode = tokenDecode(token);
    }

    console.log(socket, "connected true");
    socket.on("connection", () => {
      console.log("connected");
    });
    socket.on("notificationData", (data) => {
      console.log(data, "data notification");
    });

    socket.emit("myNotification", {
      userid: decode.userid,
      limit: 10,
      offset: 0,
    });
  }, []);

  return (
    <Popover position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button variant="transparent">
          <NotificationButtonImage />
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="w-80">
          <div></div>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

const NotificationButtonImage = () => {
  return (
    <div>
      <Image
        alt="notification"
        src="/icons/notification.svg"
        width={25}
        height={23}
        className="max-xs:w-6 h-6"
      />
      {/* <div className="absolute">
        {wishlist.get.length > 0 && (
          <div className="w-3.5 h-3.5 bg-number flex justify-center items-center text-white -mt-5 rounded-full text-xs ml-4">
            <p className="text-sm-5">{wishlist.get.length}</p>
          </div>
        )}
      </div> */}
    </div>
  );
};
export default Notification;
