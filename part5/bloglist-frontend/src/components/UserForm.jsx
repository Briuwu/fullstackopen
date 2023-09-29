const UserForm = ({
  handleLogin,
  username,
  setUsername,
  setPassword,
  password,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username:{" "}
        <input
          type="text"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          type="password"
          id="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  );
};
export default UserForm;
