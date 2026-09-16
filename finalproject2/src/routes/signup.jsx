import { useState } from "react";
import { regester } from "../components/regester";
import BackGround from "../components/background";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authcontext/auth";
import Logo from "../components/logo";
import EmailSvg from "../components/emailSvg";
import PassSvg from "../components/passSvg";
import { Button } from "flowbite-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await regester(name, email, password);
      await login(email, password);
      navigate("/");
    } catch {
      alert("please try again something went wrong");
    }
  };

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
            className="absolute top-10 left-0 w-[400px] h-[500px] "
            src="src\img\signupimg.png"
            alt="loginimg"
          />
        </div>

        <form
          onSubmit={handleRegister}
          className="flex flex-col justify-between gap-4 items-start w-[485px]"
        >
          <h1 className="text-[#C3C8D4] text-[64px] font-semibold ">Signup</h1>
          <input
            className="bg-black/10 text-white/80 w-full h-16 rounded-lg px-10"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className=" absolute left-3 top-5">
              <PassSvg />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary-0 p-3 rounded-xl"
            color="blue"
          >
            sign
          </Button>
        </form>
      </div>
    </>
  );
}
