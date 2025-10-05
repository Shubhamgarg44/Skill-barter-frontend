import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import api from "../api/axios";
import dayjs from "dayjs";

const socket = io("http://localhost:3000");

const ChatBox = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      const res = await api.post("/chat", { userId: selectedUser._id });
      const chatId = res.data._id;
      const msgRes = await api.get(`/chat/${chatId}`);
      setMessages(msgRes.data);

      socket.emit("registerUser", user._id);

      socket.on("receiveMessage", (data) => {
        if (data.chatId === chatId)
          setMessages((prev) => [...prev, { text: data.message, sender: { _id: data.senderId } }]);
      });
    };

    fetchMessages();
  }, [selectedUser]);

  const handleSend = async () => {
    if (!text.trim()) return;
    const chatRes = await api.post("/chat", { userId: selectedUser._id });
    const chatId = chatRes.data._id;

    const msgRes = await api.post("/chat/send", { chatId, text });
    setMessages((prev) => [...prev, msgRes.data]);

    socket.emit("sendMessage", {
      chatId,
      senderId: user._id,
      receiverId: selectedUser._id,
      message: text,
    });
    setText("");
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 h-[500px] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-xs ${
              msg.sender._id === user._id
                ? "bg-teal-600 ml-auto text-white"
                : "bg-slate-700 mr-auto text-gray-100"
            }`}
          >
            <p>{msg.text}</p>
            <p className="text-xs text-gray-400 text-right mt-1">
              {dayjs(msg.createdAt).format("hh:mm A")}
            </p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 bg-slate-800 text-white p-2 rounded-l-lg border border-slate-700"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-teal-500 hover:bg-teal-600 px-4 rounded-r-lg text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
