import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import useUser from "@/hooks/useUser";
import { Button } from "./ui/button";

const Navbar = () => {
  const { logout, state: user } = useUser();

  if (!user) return null;

  return (
    <NavigationMenu className="py-5">
      <NavigationMenuList className="gap-5">
        <NavigationMenuItem>
          <Link to="/">Blogs</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/users">Users</Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="items-center flex gap-3">
          <span className="font-bold uppercase text-xl">{user.name}</span>{" "}
          logged in <Button onClick={logout}>logout</Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default Navbar;
