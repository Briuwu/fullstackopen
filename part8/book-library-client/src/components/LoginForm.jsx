import { useEffect, useState } from "react";
import { LOGIN } from "../queries";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]);

  const submit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
    navigate("/");
  };

  return (
    <form onSubmit={submit}>
      <div>
        username{" "}
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};
export default LoginForm;
