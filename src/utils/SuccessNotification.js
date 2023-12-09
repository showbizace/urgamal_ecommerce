import { IconCheck, IconAlertCircle } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";

module.exports = {
  SuccessNotification: ({ title, message }) => {
    showNotification({
      title,
      message: message,
      color: "green",
      icon: <IconCheck />,
    });
  },
  ErrorNotification: ({ title, message }) => {
    showNotification({
      title,
      message: message,
      color: "red",
      icon: <IconAlertCircle />,
    });
  },
};
