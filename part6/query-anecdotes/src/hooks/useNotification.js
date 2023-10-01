import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

const useNotification = () => {
  const { state, setNotification, clearNotification } =
    useContext(NotificationContext);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      clearNotification();
    }, 5000);
  };

  return { notification: state, showNotification };
};

export default useNotification;
