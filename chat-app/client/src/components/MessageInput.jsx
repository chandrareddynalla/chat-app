import React, { useState } from "react";
import { useChat } from "../context/ChatContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { request } from "../api/http.js";

const MessageInput = () => {
  const { sendMessage, sendTyping } = useChat();
  const { token } = useAuth();
  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false);

  const onSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await sendMessage({ content: text.trim(), type: "text" });
    setText("");
  };

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const form = new FormData();
    form.append("file", file);

    try {
      const data = await request("/api/upload", {
        method: "POST",
        body: form,
        token,
        isForm: true
      });

      const type = file.type.startsWith("image/") ? "image" : "file";
      await sendMessage({ content: file.name, type, mediaUrl: data.url });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <form className="message-input" onSubmit={onSend}>
      <input
        type="text"
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => sendTyping(true)}
        onBlur={() => sendTyping(false)}
      />
      <label className="file-btn">
        {uploading ? "Uploading..." : "Attach"}
        <input type="file" onChange={onFile} hidden />
      </label>
      <button type="submit" className="btn-primary">Send</button>
    </form>
  );
};

export default MessageInput;
