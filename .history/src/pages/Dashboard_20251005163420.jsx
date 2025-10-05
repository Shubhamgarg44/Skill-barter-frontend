import React, { useEffect, useState } from "react";
import {
  LogOut,
  Wallet,
  Briefcase,
  Repeat,
  Menu,
  X,
  Plus,
  Handshake,
} from "lucide-react";
import api from "../api/axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { User } from "lucide-react";

const Dashboard = () => {
  const [wallet, setWallet] = useState(0);
  const [skills, setSkills] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("wallet");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState({
    title: "",
    description: "",
    tokens: "",
  });
  const [transactionFilter, setTransactionFilter] = useState("all");
  const [requestFilter, setRequestFilter] = useState("all");
  const [summary, setSummary] = useState({ earned: 0, spent: 0 });

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  // ---------------- Fetch dashboard data ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const loggedUser = JSON.parse(localStorage.getItem("user"));
        if (!loggedUser || !loggedUser._id) {
          console.warn("No user found in localStorage. Skipping fetch.");
          setLoading(false);
          return;
        }

        const [walletRes, skillsRes, txnRes, reqRes] = await Promise.all([
          api.get("/wallet").catch(() => ({ data: { balance: 100 } })),
          api.get("/skills").catch(() => ({ data: [] })),
          api.get("/transactions/my").catch(() => ({ data: [] })),
          api.get("/skills/requests/my").catch(() => ({ data: [] })),
        ]);

        setWallet(walletRes?.data?.balance || 100);

        const allSkills = skillsRes?.data || [];
        const mySkills = allSkills.filter((skill) => {
          if (!skill.offeredBy) return false;
          if (typeof skill.offeredBy === "object") {
            return (
              skill.offeredBy._id === loggedUser._id ||
              skill.offeredBy.id === loggedUser.id ||
              skill.offeredBy.email === loggedUser.email
            );
          }
          return (
            skill.offeredBy === loggedUser._id ||
            skill.offeredBy === loggedUser.id ||
            skill.offeredBy === loggedUser.email
          );
        });

        setSkills(mySkills);
        setTransactions(txnRes?.data || []);
        setRequests(reqRes?.data || []);
        calculateSummary(txnRes?.data || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        toast.error("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ---------------- Calculate Summary ----------------
  const calculateSummary = (transactionsList) => {
    if (!transactionsList || transactionsList.length === 0) {
      setSummary({ earned: 0, spent: 0 });
      return;
    }
    let earned = 0;
    let spent = 0;
    transactionsList.forEach((txn) => {
      if (txn.status === "completed") {
        if (txn.seller === user.email) earned += txn.tokens;
        if (txn.buyer === user.email) spent += txn.tokens;
      }
    });
    setSummary({ earned, spent });
  };

  // ---------------- Logout ----------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // ---------------- Offer skill ----------------
  const handleOfferSkill = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/skills/offer", newSkill);
      toast.success("✅ Skill added successfully!");
      setShowModal(false);
      setNewSkill({ title: "", description: "", tokens: "" });
      setSkills((prev) => [...prev, response.data.skill]);
    } catch (error) {
      console.error("Error offering skill:", error);
      toast.error("Failed to add skill.");
    }
  };

  // ---------------- Accept Request ----------------
  const handleAcceptRequest = async (id) => {
    try {
      await api.patch(`/skills/request/${id}/accept`);
      toast.success("✅ Request accepted!");
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "Accepted" } : r))
      );
    } catch (error) {
      console.error("Accept error:", error);
      toast.error("Failed to accept request.");
    }
  };

  // ---------------- Complete Request ----------------
  const handleCompleteRequest = async (id) => {
    try {
      const res = await api.patch(`/skills/request/${id}/complete`);
      toast.success("🎉 Course completed and transaction processed!");

      const walletRes = await api.get("/wallet");
      const txnRes = await api.get("/transactions/my");

      setWallet(walletRes.data.balance);
      setTransactions(txnRes.data);
      calculateSummary(txnRes.data);

      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "Completed" } : r))
      );
    } catch (error) {
      console.error("Complete error:", error);
      toast.error("Error completing request.");
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="flex h-[calc(100vh-80px)] w-full bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute gradient-blob w-[400px] h-[400px] bg-teal-500 top-[-100px] left-[-100px] blur-3xl opacity-30 z-0"></div>
      <div className="absolute gradient-blob w-[500px] h-[500px] bg-orange-400 bottom-[-150px] right-[-150px] blur-3xl opacity-20 z-0"></div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-20 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 h-full w-64 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } flex flex-col justify-between p-6`}
      >
        <div>
          <h2 className="text-2xl font-semibold text-teal-400 mb-10 text-center">
            SkillBarter
          </h2>
          <nav className="space-y-4">
            {[
              { key: "wallet", icon: <Wallet size={18} />, label: "Wallet" },
              {
                key: "skills",
                icon: <Briefcase size={18} />,
                label: "My Skills",
              },
              {
                key: "requests",
                icon: <Handshake size={18} />,
                label: "Skill Requests",
              },
              {
                key: "transactions",
                icon: <Repeat size={18} />,
                label: "Transactions",
              },
              { key: "profile",
               icon: <User size={18} />,
                label: "Profile" },
            ].map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  activeSection === key
                    ? "bg-teal-500/20 text-teal-300"
                    : "hover:bg-slate-800/70 text-gray-300"
                }`}
              >
                {icon} {label}
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 mt-10 bg-slate-800/70 hover:bg-slate-700 rounded-lg text-gray-300 hover:text-red-400 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Hamburger */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-4 left-4 md:hidden z-30 bg-slate-900/70 p-2 rounded-lg"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto relative z-10">
        {loading ? (
          <div className="flex justify-center items-center h-full text-gray-400 animate-pulse text-lg">
            Loading dashboard data...
          </div>
        ) : (
          <>
            {/* Wallet Section */}
            {activeSection === "wallet" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-semibold text-teal-400 mb-4">
                  Welcome back, {user.name?.split(" ")[0] || "User"} 👋
                </h1>
                <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <h2 className="text-xl mb-2 font-semibold text-orange-300">
                    Wallet Balance
                  </h2>
                  <p className="text-4xl font-bold text-white">
                    💰 {wallet} Tokens
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Use your tokens to request or offer skills!
                  </p>
                </div>
              </div>
            )}

            {/* ✅ My Skills Section */}
            {activeSection === "skills" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-teal-400">
                    My Offered Skills
                  </h2>
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-teal-500/20 hover:bg-teal-600/30 px-4 py-2 rounded-lg text-teal-300"
                  >
                    <Plus size={18} /> Offer Skill
                  </button>
                </div>

                {skills.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill) => (
                      <div
                        key={skill._id}
                        className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-lg"
                      >
                        <h3 className="text-xl font-semibold text-orange-300 mb-2">
                          {skill.title}
                        </h3>
                        <p className="text-gray-400 mb-3">
                          {skill.description}
                        </p>
                        <p className="text-sm text-teal-300 font-medium">
                          💎 {skill.tokens} Tokens
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">
                    You haven’t offered any skills yet.
                  </p>
                )}
              </div>
            )}

            {/* ✅ Skill Requests Section */}
            {activeSection === "requests" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-teal-400">
                    Skill Requests
                  </h2>
                  <select
                    value={requestFilter}
                    onChange={(e) => setRequestFilter(e.target.value)}
                    className="bg-slate-800 border border-slate-700 text-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All</option>
                    <option value="day">Today</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>

                {requests.length > 0 ? (
                  <div className="space-y-4">
                    {requests
                      .filter((r) => {
                        if (requestFilter === "all") return true;
                        const date = dayjs(r.createdAt);
                        const now = dayjs();
                        if (requestFilter === "day")
                          return date.isAfter(now.startOf("day"));
                        if (requestFilter === "month")
                          return date.isAfter(now.startOf("month"));
                        if (requestFilter === "year")
                          return date.isAfter(now.startOf("year"));
                        return true;
                      })
                      .map((r) => (
                        <div
                          key={r._id}
                          className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-xl p-4 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium text-gray-200 mb-1">
                              {r.skill?.title || "Untitled Skill"} —{" "}
                              <span className="text-orange-300">
                                {r.status}
                              </span>
                            </p>
                            <p className="text-sm text-gray-400">
                              Requested by{" "}
                              <span className="text-teal-400">
                                {r.requester?.name}
                              </span>{" "}
                              → Provider:{" "}
                              <span className="text-orange-400">
                                {r.provider?.name}
                              </span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              📅{" "}
                              {dayjs(r.createdAt).format(
                                "DD MMM YYYY, hh:mm A"
                              )}
                            </p>
                          </div>
                          {r.provider?._id === user._id &&
                            r.status === "Pending" && (
                              <button
                                onClick={() => handleAcceptRequest(r._id)}
                                className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-md"
                              >
                                Accept
                              </button>
                            )}
                          {r.requester?._id === user._id &&
                            r.status === "Accepted" && (
                              <button
                                onClick={() => handleCompleteRequest(r._id)}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md"
                              >
                                Finish Course
                              </button>
                            )}
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No skill requests yet.</p>
                )}
              </div>
            )}

            {/* ✅ Profile Section */}
            {activeSection === "profile" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-teal-400 mb-4">
                  My Profile
                </h2>

                <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center gap-6">
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-orange-400 flex items-center justify-center text-3xl font-bold text-slate-900">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-orange-300">
                        {user.name || "User"}
                      </h3>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                      <p className="text-gray-400 text-sm mt-1">
                        Member since:{" "}
                        {dayjs(user.createdAt || new Date()).format("MMM YYYY")}
                      </p>
                    </div>
                  </div>

                  {/* Wallet Summary */}
                  <div className="mt-6 md:mt-0 text-center md:text-right">
                    <p className="text-gray-400 text-sm">Wallet Balance</p>
                    <p className="text-3xl font-bold text-teal-400">
                      💰 {wallet} Tokens
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Earned:{" "}
                      <span className="text-green-400">+{summary.earned}</span>{" "}
                      | Spent:{" "}
                      <span className="text-orange-400">-{summary.spent}</span>
                    </p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-semibold text-teal-400 mb-4">
                    My Offered Skills
                  </h3>
                  {skills.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {skills.map((skill) => (
                        <div
                          key={skill._id}
                          className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 shadow-md"
                        >
                          <h4 className="text-lg font-semibold text-orange-300 mb-2">
                            {skill.title}
                          </h4>
                          <p className="text-gray-400 text-sm mb-2">
                            {skill.description}
                          </p>
                          <p className="text-teal-400 text-sm font-semibold">
                            💎 {skill.tokens} Tokens
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">
                      You haven’t offered any skills yet.
                    </p>
                  )}
                </div>
                {/* ✅ Bio Section */}
                <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-semibold text-teal-400 mb-3">
                    Bio
                  </h3>

                  {/* Textarea */}
                  <textarea
                    value={user.bio || ""}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white resize-none"
                    rows="4"
                    placeholder="Write something about yourself..."
                  />

                  {/* Save Button */}
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={async () => {
                        try {
                          const res = await api.patch("/auth/update-bio", {
                            bio: user.bio,
                          });
                          toast.success("✅ Bio updated successfully!");
                          localStorage.setItem(
                            "user",
                            JSON.stringify(res.data.user)
                          ); // ✅ persist
                        } catch (error) {
                          console.error("Error updating bio:", error);
                          toast.error("Failed to update bio.");
                        }
                      }}
                      className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg"
                    >
                      Save Bio
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ✅ Transactions Section (unchanged) */}
            {activeSection === "transactions" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-teal-400">
                    Recent Transactions
                  </h2>
                  <select
                    value={transactionFilter}
                    onChange={async (e) => {
                      const range = e.target.value;
                      setTransactionFilter(range);
                      try {
                        const url =
                          range === "all"
                            ? "/transactions/my"
                            : `/transactions/my?range=${range}`;
                        const res = await api.get(url);
                        setTransactions(res.data);
                        calculateSummary(res.data);
                      } catch (error) {
                        console.error("Filter error:", error);
                        toast.error("Failed to fetch filtered transactions");
                      }
                    }}
                    className="bg-slate-800 border border-slate-700 text-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All</option>
                    <option value="day">Today</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>

                {/* ✅ Summary Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
                  <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Total Earned</p>
                    <p className="text-teal-400 text-2xl font-bold">
                      +{summary.earned} 💎
                    </p>
                  </div>
                  <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Total Spent</p>
                    <p className="text-orange-400 text-2xl font-bold">
                      {summary.spent} 💎
                    </p>
                  </div>
                  <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Net Earned Balance</p>
                    <p
                      className={`text-2xl font-bold ${
                        summary.earned - summary.spent >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {summary.earned - summary.spent} 💰
                    </p>
                  </div>
                </div>

                {transactions.length > 0 ? (
                  <div className="space-y-4">
                    {transactions.map((txn) => (
                      <div
                        key={txn._id}
                        className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-xl p-4 flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium text-gray-200 mb-1">
                            {txn.skill || "Unknown Skill"} —{" "}
                            <span className="text-orange-300">
                              {txn.status}
                            </span>
                          </p>
                          <p className="text-sm text-gray-400">
                            Buyer:{" "}
                            <span className="text-teal-400">{txn.buyer}</span> |
                            Seller:{" "}
                            <span className="text-orange-400">
                              {txn.seller}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            📅 {dayjs(txn.date).format("DD MMM YYYY, hh:mm A")}
                          </p>
                        </div>
                        <div className="text-teal-400 font-semibold">
                          💰 {txn.tokens} Tokens
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No transactions found yet.</p>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
