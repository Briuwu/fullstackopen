import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const useUser = () => {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error("useUser must be used within a UserContextProvider");
  }

  const { state, login, logout, setUser } = user;

  return { state, login, logout, setUser };
};

export default useUser;
