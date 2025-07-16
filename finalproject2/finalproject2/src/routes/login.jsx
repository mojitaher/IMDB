import { useState } from "react";
import BackGround from "../components/background";
import Logo from "../components/logo";
import { useAuth } from "../../authcontext/auth";
import { useNavigate } from "react-router-dom";
import PassSvg from "../components/passSvg";
import EmailSvg from "../components/emailSvg";
import { Button } from "flowbite-react";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassHide, setIsPassHide] = useState(true);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/");
    } catch {
      alert("username or password are not correct");
    }
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <BackGround />
      <div className="p-4">
        <Logo />
      </div>
      <div className="flex justify-center items-center ">
        <div className="w-[486px] h-[584px] relative">
          <div className="bg-dark-0 rounded-3xl  w-[300px] h-[500px]"></div>
          <img
            className=" absolute top-8 left-0 "
            src="src\img\loginimg.png"
            alt="loginimg"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between gap-4 items-start w-[485px]"
        >
          <h1 className="text-[#C3C8D4] text-[64px] font-semibold ">Login</h1>
          <div className="relative w-full">
            <div className=" absolute left-3 top-5">
              <EmailSvg />
            </div>
            <input
              className="bg-black/10 text-white/80 w-full h-16 rounded-lg px-10"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative w-full">
            <input
              className="bg-black/10 text-white/80 w-full h-16 rounded-lg px-10"
              type={isPassHide ? "password" : "text"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className=" absolute left-3 top-5">
              <PassSvg />
            </div>
            <button
              type="button"
              className="absolute top-4 right-2"
              onClick={() => setIsPassHide((prev) => !prev)}
            >
              {isPassHide ? "🔓" : "🔒"}
            </button>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary-0 p-3 rounded-xl"
            color="blue"
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
}
