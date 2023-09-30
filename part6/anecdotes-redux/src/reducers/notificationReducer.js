import { createSlice } from "@reduxjs/toolkit";

const notification = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification: (state, action) => action.payload,
    removeNotification: () => "",
  },
});

export const displayNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(setNotification(message));

    setTimeout(() => {
      dispatch(removeNotification());
    }, seconds * 1000);
  };
};

export const { setNotification, removeNotification } = notification.actions;
export default notification.reducer;
