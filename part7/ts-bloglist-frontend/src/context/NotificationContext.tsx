import { createContext, useReducer } from "react";

export const NotificationContext = createContext<useReducerContextType | null>(
  null
);

type initialNotificationType = {
  message: string;
  type: string;
};

const initialNotification: initialNotificationType | null = null;

type ACTIONTYPE =
  | { type: "SET_NOTIFICATION"; payload: initialNotificationType }
  | { type: "CLEAR_NOTIFICATION" };

const notificationReducer = (
  state: initialNotificationType | null,
  action: ACTIONTYPE
) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const useReducerContext = () => {
  const [state, dispatch] = useReducer(
    notificationReducer,
    initialNotification
  );

  const setNotification = (data: initialNotificationType) => {
    dispatch({ type: "SET_NOTIFICATION", payload: data });
  };

  const clearNotification = () => {
    dispatch({ type: "CLEAR_NOTIFICATION" });
  };

  return { state, setNotification, clearNotification };
};

type useReducerContextType = ReturnType<typeof useReducerContext>;

const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <NotificationContext.Provider value={useReducerContext()}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
