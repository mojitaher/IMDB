import { useAuth } from "../../authcontext/auth";
import { Button } from "flowbite-react";

export default function Profile() {
  const { user, logout } = useAuth();
  return (
    <div className="flex justify-between items-center gap-5">
      <h2
        className="font-bold text-4xl h-11"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,212,255,0) 0%, rgba(0,212,255,0.7) 50%, rgba(0,212,255,1) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        wellcome {user}
      </h2>
      <Button onClick={logout} color="red">
        logout
      </Button>
    </div>
  );
}
