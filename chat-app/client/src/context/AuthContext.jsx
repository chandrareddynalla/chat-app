import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { request } from "../api/http.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await request("/api/auth/me", { token });
        setUser(data.user);
      } catch (err) {
        setToken(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const login = async (email, password) => {
    const data = await request("/api/auth/login", {
      method: "POST",
      body: { email, password }
    });
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const register = async (name, email, password) => {
    const data = await request("/api/auth/register", {
      method: "POST",
      body: { name, email, password }
    });
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ token, user, loading, login, register, logout }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
