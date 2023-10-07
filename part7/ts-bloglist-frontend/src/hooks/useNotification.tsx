import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

const useNotification = () => {
  const notification = useContext(NotificationContext);

  if (!notification) {
    throw new Error(
      "useNotification must be used within a NotificationContextProvider"
    );
  }

  const handleNotification = (message: string, type: string) => {
    notification.setNotification({ message, type });
    setTimeout(() => {
      notification.clearNotification();
    }, 5000);
  };

  return { notification: notification.state, handleNotification };
};

export default useNotification;
