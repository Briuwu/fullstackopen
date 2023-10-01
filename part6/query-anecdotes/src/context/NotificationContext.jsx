import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  return (
    <NotificationContext.Provider value={useNotificationReducer()}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotificationReducer = () => {
  const [state, dispatch] = useReducer(reducer, null);

  const setNotification = (message) => {
    dispatch({ type: "SET_NOTIFICATION", payload: message });
  };

  const clearNotification = () => {
    dispatch({ type: "CLEAR_NOTIFICATION" });
  };

  return { state, setNotification, clearNotification };
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationProvider;
