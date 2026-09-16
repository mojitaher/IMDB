import Logo from "./logo";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../authcontext/auth";
import Profile from "./profile";

export function Header() {
  const { user, loading } = useAuth();
  if (loading) return <p>...</p>;
  return (
    <>
      <div className="mx-32 flex  justify-between gap-6">
        <Logo />
        {!user ? (
          <div className="flex p-3 gap-5 ">
            <Link to={"/Login"}>
              <Button
                color="yellow"
                className="bg-transparent text-white border-none hover:text-yellow-900 max-h-10"
              >
                Login
              </Button>
            </Link>
            <Link to={"/Signup"}>
              <Button className="bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 max-h-10 ">
                Signup
              </Button>
            </Link>
          </div>
        ) : (
          <Profile />
        )}
      </div>
    </>
  );
}
