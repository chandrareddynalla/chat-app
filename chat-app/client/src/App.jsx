import React from "react";
import AuthForm from "./components/AuthForm.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { ChatProvider } from "./context/ChatContext.jsx";
import "./styles/app.css";

const Shell = () => {
  const { token, loading } = useAuth();

  if (loading) return <div className="loading">Loading...</div>;
  if (!token) return <AuthForm />;

  return (
    <div className="layout">
      <Sidebar />
      <ChatWindow />
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <ChatProvider>
      <Shell />
    </ChatProvider>
  </AuthProvider>
);

export default App;
