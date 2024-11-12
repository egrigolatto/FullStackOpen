import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    margin: 10,
    background: "lightgrey",
    color: notification.type === "success" ? "green" : "red",
  };

  return <div style={style}>{notification.message}</div>;
};

export { Notification };
