import { useState } from "react";
import { regester } from "../components/regester";
import BackGround from "../components/background";

export default function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    try {
      regester(name, email, password);
      alert(name);
    } catch {
      alert("err");
    }
  };

  return (
    <>
      <BackGround />
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">signup</button>
      </form>
    </>
  );
}
