import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import api from "../api/axios";
import dayjs from "dayjs";

// ✅ connect once globally
const socket = io("http://localhost:3000", { autoConnect: true });

const ChatBox = ({ onUnreadChange = () => {} }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [chatId, setChatId] = useState(null);
  const [unreadCounts, setUnreadCounts] = useState({}); // userId → count
  const user = JSON.parse(localStorage.getItem("user"));
  const messagesEndRef = useRef(null);

  // 🔹 Register user when connected
  useEffect(() => {
    if (user?._id) {
      socket.emit("registerUser", user._id);
    }
  }, [user]);

  // 🔹 Fetch all users except current
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/auth/users");
        setUsers(res.data.filter((u) => u._id !== user._id));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [user]);

  // 🔹 Load chat messages when selecting user
  useEffect(() => {
    if (!selectedUser) return;
    const loadChat = async () => {
      try {
        const res = await api.post("/chat", { userId: selectedUser._id });
        setChatId(res.data._id);

        const msgRes = await api.get(`/chat/${res.data._id}`);
        setMessages(msgRes.data || []);

        // reset unread for that user
        setUnreadCounts((prev) => {
          const updated = { ...prev };
          delete updated[selectedUser._id];
          onUnreadChange(
            Object.values(updated).reduce((a, b) => a + b, 0)
          );
          return updated;
        });
      } catch (error) {
        console.error("Error loading chat:", error);
      }
    };
    loadChat();
  }, [selectedUser]);

  // 🔹 Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Listen for incoming messages
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      const { chatId: incomingChatId, senderId, message } = data;

      if (incomingChatId === chatId) {
        // if same chat open → just append
        setMessages((prev) => [
          ...prev,
          { text: message, sender: { _id: senderId }, createdAt: new Date() },
        ]);
      } else {
        // message from other chat → unread
        setUnreadCounts((prev) => {
          const updated = { ...prev };
          updated[senderId] = (updated[senderId] || 0) + 1;
          onUnreadChange(
            Object.values(updated).reduce((a, b) => a + b, 0)
          );
          return updated;
        });
      }
    });

    return () => socket.off("receiveMessage");
  }, [chatId]);

  // 🔹 Send Message
  const handleSend = async () => {
    if (!text.trim() || !chatId) return;
    try {
      const msgRes = await api.post("/chat/send", { chatId, text });
      setMessages((prev) => [...prev, msgRes.data]);
      socket.emit("sendMessage", {
        chatId,
        senderId: user._id,
        receiverId: selectedUser._id,
        message: text,
      });
      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-[80vh]">
      <div className="flex flex-1 border border-slate-800 rounded-xl overflow-hidden">
        {/* 🔹 Users List */}
        <div className="w-1/3 bg-slate-900 border-r border-slate-800 overflow-y-auto">
          <h3 className="text-lg font-semibold text-teal-400 p-3 border-b border-slate-700">
            All Users
          </h3>
          {users.map((u) => {
            const unread = unreadCounts[u._id] || 0;
            const selected = selectedUser?._id === u._id;
            return (
              <div
                key={u._id}
                onClick={() => setSelectedUser(u)}
                className={`p-3 cursor-pointer flex justify-between items-center hover:bg-slate-800 ${
                  selected ? "bg-slate-800" : ""
                }`}
              >
                <div>
                  <p className="text-gray-200">{u.name}</p>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </div>
                {/* 🔴 Unread badge per user */}
                {unread > 0 && (
                  <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {unread}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* 🔹 Chat Window */}
        <div className="w-2/3 bg-slate-900/70 backdrop-blur-xl p-4 flex flex-col">
          {selectedUser ? (
            <>
              <h3 className="text-xl font-semibold text-orange-300 mb-4 border-b border-slate-800 pb-2">
                Chat with {selectedUser.name}
              </h3>
              <div className="flex-1 overflow-y-auto space-y-2">
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
                <div ref={messagesEndRef} />
              </div>

              <div className="flex mt-3">
                <input
                  type="text"
                  className="flex-1 bg-slate-800 text-white p-2 rounded-l-lg border border-slate-700"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type a message..."
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className="bg-teal-500 hover:bg-teal-600 px-4 rounded-r-lg text-white"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center flex-1 text-gray-500">
              Select a user to start chatting 💬
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
