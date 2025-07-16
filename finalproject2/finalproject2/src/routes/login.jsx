import { useState } from "react";
import BackGround from "../components/background";
import Logo from "../components/logo";
import { useAuth } from "../../authcontext/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isPassHide, setIsPassHide] = useState(true);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(user, password);
      navigate("/");
    } catch {
      alert("username or password are not correct");
    }
    setUser("");
    setPassword("");
  }

  return (
    <>
      <BackGround />
      <div className="p-4">
        <Logo />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <div className="relative">
          <input
            type={isPassHide ? "password" : "text"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute top-2 left-40"
            onClick={() => setIsPassHide((prev) => !prev)}
          >
            {isPassHide ? "🔓" : "🔒"}
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
