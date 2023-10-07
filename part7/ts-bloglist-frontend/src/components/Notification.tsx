import useNotification from "@/hooks/useNotification";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Notification = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  return (
    <Alert className="uppercase mt-10 mb-5">
      <AlertTitle
        className={`${
          notification.type === "success" ? "text-green-400" : "text-red-400"
        } font-bold text-xl`}
      >
        {notification.type}
      </AlertTitle>
      <AlertDescription>{notification.message}</AlertDescription>
    </Alert>
  );
};
export default Notification;
