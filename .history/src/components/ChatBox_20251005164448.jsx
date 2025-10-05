import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import api from "../api/axios";
import dayjs from "dayjs";

// Connect once globally
const socket = io("http://localhost:3000");

const ChatBox = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [chatId, setChatId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // Register current user with socket.io when dashboard loads
  useEffect(() => {
    if (user?._id) {
      socket.emit("registerUser", user._id);
    }
  }, [user]);

  // Fetch all users (for demo, you can filter later)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/auth/users"); // 🔹 add this route later to fetch all users
        setUsers(res.data.filter((u) => u._id !== user._id));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // When a user is selected → load chat
  useEffect(() => {
    if (!selectedUser) return;
    const loadChat = async () => {
      const res = await api.post("/chat", { userId: selectedUser._id });
      setChatId(res.data._id);

      const msgRes = await api.get(`/chat/${res.data._id}`);
      setMessages(msgRes.data);
    };
    loadChat();
  }, [selectedUser]);

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      if (data.chatId === chatId) {
        setMessages((prev) => [
          ...prev,
          { text: data.message, sender: { _id: data.senderId } },
        ]);
      }
    });
    return () => socket.off("receiveMessage");
  }, [chatId]);

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
      {/* Users Sidebar */}
      <div className="flex-1 flex">
        <div className="w-1/3 bg-slate-900 border-r border-slate-800 overflow-y-auto">
          <h3 className="text-lg font-semibold text-teal-400 p-3 border-b border-slate-700">
            All Users
          </h3>
          {users.map((u) => (
            <div
              key={u._id}
              onClick={() => setSelectedUser(u)}
              className={`p-3 cursor-pointer hover:bg-slate-800 ${
                selectedUser?._id === u._id ? "bg-slate-800" : ""
              }`}
            >
              <p className="text-gray-200">{u.name}</p>
              <p className="text-xs text-gray-500">{u.email}</p>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div className="w-2/3 bg-slate-900/70 backdrop-blur-xl p-4 flex flex-col">
          {selectedUser ? (
            <>
              <h3 className="text-xl font-semibold text-orange-300 mb-4 border-b border-slate-800 pb-2">
                Chat with {selectedUser.name}
              </h3>

              <div className="flex-1 overflow-y-auto space-y-2 mb-3">
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

              <div className="flex mt-auto">
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
