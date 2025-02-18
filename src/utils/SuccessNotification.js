import { IconCheck, IconAlertCircle } from "@tabler/icons-react";
import { notifications, showNotification } from "@mantine/notifications";

module.exports = {
  SuccessNotification: ({ title, message }) => {
    showNotification({
      title,
      message: message,
      color: "green",
      icon: <IconCheck />,
    });
  },
  ErrorNotificatipon: ({ title, message }) => {
    showNotification({
      title,
      message: message,
      color: "red",
      icon: <IconAlertCircle />,
    });
  },
};
