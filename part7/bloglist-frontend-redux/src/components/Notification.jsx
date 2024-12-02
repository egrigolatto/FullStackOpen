import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  const notificationStyle =
    notification.type === "success" ? "alert-success" : "alert-danger";

  return (
    <div
      className={`alert ${notificationStyle} container mt-3`}
      role="alert"
      style={{ maxWidth: "600px" }}
    >
      {notification.message}
    </div>
  );
};

export { Notification };

