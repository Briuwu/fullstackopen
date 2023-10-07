import { ReactNode, createContext, useReducer } from "react";
import useNotification from "@/hooks/useNotification";
import loginService from "@/services/login";
import blogService from "@/services/blogs";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext<useReducerContextType | null>(null);

type initialUserType = {
  name: string;
  username: string;
  token: string;
  id: string;
};

const initialUser: initialUserType | null = null;

type ACTIONTYPE =
  | { type: "SET_USER"; payload: initialUserType }
  | { type: "LOGOUT" }
  | { type: "LOGIN"; payload: { username: string; password: string } };

const userReducer = (state: initialUserType | null, action: ACTIONTYPE) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "LOGOUT":
      localStorage.removeItem("user");
      return null;
    default:
      return state;
  }
};

const useReducerContext = () => {
  const [state, dispatch] = useReducer(userReducer, initialUser);
  const { handleNotification } = useNotification();
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    try {
      const user = await loginService.login({ username, password });
      dispatch({ type: "SET_USER", payload: user });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      handleNotification(`user ${user.name} logged in`, "success");
    } catch (error) {
      handleNotification("wrong username or password", "error");
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("loggedBlogAppUser");
    navigate("/");
  };

  const setUser = (data: initialUserType) => {
    dispatch({ type: "SET_USER", payload: data });
  };

  return { state, login, logout, setUser };
};

type useReducerContextType = ReturnType<typeof useReducerContext>;

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserContext.Provider value={useReducerContext()}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
