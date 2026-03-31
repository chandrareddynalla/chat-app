import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { API_URL } from "../api/http.js";

export const useSocket = (token) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!token) return;

    const s = io(API_URL, {
      auth: { token },
      transports: ["websocket"]
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [token]);

  return useMemo(() => socket, [socket]);
};
