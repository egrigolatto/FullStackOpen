import { useContext } from "react";
import { useNotificaction } from "../NotificationContextHooks";

const Notification = () => {
  const notification = useNotificaction();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!notification) return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;