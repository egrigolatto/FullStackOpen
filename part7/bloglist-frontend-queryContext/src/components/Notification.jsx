import { useNotificaction } from "../NotificationContext";

const Notification = () => {
  const notification = useNotificaction();

  if (!notification) return null;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    color: notification.type === "success" ? "green" : "red",
    borderColor: notification.type === "success" ? "green" : "red",
  };

  return <div style={style}>{notification.message}</div>;
};

export { Notification };
