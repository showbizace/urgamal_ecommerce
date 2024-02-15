import { Button, Popover, rem } from "@mantine/core";
import Image from "next/image";
import React from "react";

const Notification = ({ icon }) => {
  const NotificationButtonImage = () => {
    return (
      <>
        <Image
          alt="notification"
          src="/icons/notification.svg"
          width={25}
          height={23}
          className="max-xs:w-6 h-6"
        />
        <div className="absolute">
          {/* {wishlist.get.length > 0 && (
                <div className="w-3.5 h-3.5 bg-number flex justify-center items-center text-white -mt-5 rounded-full text-xs ml-4">
                  <p className="text-sm-5">{wishlist.get.length}</p>
                </div>
              )} */}
        </div>
      </>
    );
  };

  return (
    <Popover position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button
          variant={"transparent"}
          styles={() => ({
            root: { paddingLeft: 0, paddingRight: rem(13), margin: 0 },
          })}
          leftIcon={<NotificationButtonImage />}
        />
      </Popover.Target>
      <Popover.Dropdown>
        <div className="w-80">
          <div></div>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default Notification;
