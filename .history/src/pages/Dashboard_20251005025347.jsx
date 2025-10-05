import React, { useEffect, useState } from "react";
import { LogOut, Wallet, Briefcase, Repeat } from "lucide-react";
import api from "../api/axios";

const Dashboard = () => {
  const [wallet, setWallet] = useState(0);
  const [skills, setSkills] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("wallet");

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const walletRes = await api.get("/wallet");
        const skillsRes = await api.get("/skills");
        const txnRes = await api.get("/transactions/my");

        setWallet(walletRes.data.balance);
        setSkills(skillsRes.data);
        setTransactions(txnRes.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute gradient-blob w-[400px] h-[400px] bg-teal-500 top-[-100px] left-[-100px] blur-3xl opacity-30 z-0"></div>
      <div className="absolute gradient-blob w-[500px] h-[500px] bg-orange-400 bottom-[-150px] right-[-150px] blur-3xl opacity-20 z-0"></div>

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/70 backdrop-blur-xl p-6 flex flex-col justify-between border-r border-slate-800 h-full z-10">
        <div>
          <h2 className="text-2xl font-semibold text-teal-400 mb-10 text-center">
            SkillBarter
          </h2>
          <nav className="space-y-4">
            <button
              onClick={() => setActiveSection("wallet")}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                activeSection === "wallet"
                  ? "bg-teal-500/20 text-teal-300"
                  : "hover:bg-slate-800/70 text-gray-300"
              }`}
            >
              <Wallet size={18} /> Wallet
            </button>
            <button
              onClick={() => setActiveSection("skills")}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                activeSection === "skills"
                  ? "bg-teal-500/20 text-teal-300"
                  : "hover:bg-slate-800/70 text-gray-300"
              }`}
            >
              <Briefcase size={18} /> My Skills
            </button>
            <button
              onClick={() => setActiveSection("transactions")}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                activeSection === "transactions"
                  ? "bg-teal-500/20 text-teal-300"
                  : "hover:bg-slate-800/70 text-gray-300"
              }`}
            >
              <Repeat size={18} /> Transactions
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 mt-10 bg-slate-800/70 hover:bg-slate-700 rounded-lg text-gray-300 hover:text-red-400 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto relative z-10">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-gray-400 animate-pulse text-lg">
              Loading dashboard data...
            </div>
          </div>
        ) : (
          <>
            {/* Wallet Section */}
            {activeSection === "wallet" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-semibold text-gradient-to-r from-teal-400 to-orange-400 mb-4">
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
                    Use your tokens to request skills from others or offer more
                    to earn!
                  </p>
                </div>
              </div>
            )}

            {/* Skills Section */}
            {activeSection === "skills" && (
              <div>
                <h2 className="text-2xl font-semibold text-teal-400 mb-6">
                  My Offered Skills
                </h2>
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
                        <p className="text-gray-400 mb-3">{skill.description}</p>
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

            {/* Transactions Section */}
            {activeSection === "transactions" && (
              <div>
                <h2 className="text-2xl font-semibold text-teal-400 mb-6">
                  Recent Transactions
                </h2>
                {transactions.length > 0 ? (
                  <div className="space-y-4">
                    {transactions.map((txn) => (
                      <div
                        key={txn._id}
                        className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-xl p-4 flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium text-gray-200">
                            {txn.skill?.title || "Skill"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {txn.buyer?.email === user.email
                              ? `You purchased from ${txn.seller?.email}`
                              : `You sold to ${txn.buyer?.email}`}
                          </p>
                        </div>
                        <div className="text-teal-400 font-semibold">
                          {txn.tokens} Tokens
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
