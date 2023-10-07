import useUser from "@/hooks/useUser";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Notification from "./Notification";

const LoginForm = () => {
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.target as HTMLFormElement).username.value;
    const password = (e.target as HTMLFormElement).password.value;
    login(username, password);
  };

  return (
    <main className="max-w-7xl mx-auto">
      <Notification />
      <h1 className="text-4xl font-bold pt-10 pb-5">Login</h1>
      <form onSubmit={handleSubmit} className="grid max-w-sm gap-5">
        <div className="grid gap-3">
          <Label htmlFor="username">username</Label>
          <Input type="text" id="username" name="username" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">password</Label>
          <Input type="password" id="password" name="password" />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </main>
  );
};
export default LoginForm;
