import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "../reducers/notificationReducer";
import { useEffect } from "react";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch(clearNotification());
      }, 1000);
    }
  }, [notification, dispatch]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    margin: 10,
    background: "lightgrey",
  };

  if (!notification) {
    return null; 
  }

  return <div style={style}>{notification}</div>;
};

export default Notification;
