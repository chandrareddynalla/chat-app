import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const AuthForm = () => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Realtime Chat</h1>
          <p className="muted">Secure messaging with rooms and media.</p>
        </div>

        <div className="auth-tabs">
          <button 
            type="button" 
            className={`tab ${mode === 'login' ? 'active' : ''}`} 
            onClick={() => setMode('login')}
          >
            Sign In
          </button>
          <button 
            type="button" 
            className={`tab ${mode === 'register' ? 'active' : ''}`} 
            onClick={() => setMode('register')}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={onSubmit} className="auth-form">
          {mode === "register" && (
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
          )}

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="btn-primary auth-submit">
            {mode === "login" ? "Sign in to Workspace" : "Create your Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
