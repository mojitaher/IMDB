import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Provider
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          "https://moviesapi.codingfront.dev/api/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Login response data:", res.data.name);
        setUser(res.data.name);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkUser();
  }, [token]);

  const login = async (email, password) => {
    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("username", email);
    params.append("password", password);

    const res = await axios.post(
      "https://moviesapi.codingfront.dev/oauth/token",
      params,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const accessToken = res.data.access_token;
    setToken(accessToken);
    localStorage.setItem("token", accessToken);
  };

  // خروج از حساب کاربری
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
