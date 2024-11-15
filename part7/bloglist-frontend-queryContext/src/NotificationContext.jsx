import { createContext, useReducer } from "react";
import { useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
  case "SET":
    return action.payload;
  case "CLEAR":
    return null;
  default:
    return state;
  }
};

const NotificationContext = createContext();

export const useNotificaction = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const useShowNotification = () => {
  const notificationDispatch = useNotificationDispatch();
  return (message, type = "success", duration = 5000) => {
    notificationDispatch({ type: "SET", payload: { message, type } });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, duration);
  };
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
