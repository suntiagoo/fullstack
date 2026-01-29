import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const Notification = () => {
  const { notification } = useContext(NotificationContext);

  if (!notification) {
    return null;
  }
  return (
    <div>
      <p>{notification}</p>
    </div>
  );
};

export default Notification;
