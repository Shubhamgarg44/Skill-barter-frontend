import React, { useEffect, useState } from "react";
import { LogOut, Wallet, Briefcase, Repeat, Menu, X, Plus } from "lucide-react";
import api from "../api/axios";

const Dashboard = () => {
  const [wallet, setWallet] = useState(0);
  const [skills, setSkills] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("wallet");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState({ title: "", description: "", tokens: "" });

  const user = JSON.parse(localStorage.getItem("user")) || {};

  // Fetch dashboard data
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

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // Offer skill form submission
  const handleOfferSkill = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/skills/offer", newSkill);
      toast.success("Skill added successfully!");

      setShowModal(false);
      setNewSkill({ title: "", description: "", tokens: "" });
      setSkills((prev) => [...prev, response.data.skill]); // append new skill
    } catch (error) {
      console.error("Error offering skill:", error);
      toast.error("Failed to add skill.");

    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] w-full bg-slate-950 text-white relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute gradient-blob w-[400px] h-[400px] bg-teal-500 top-[-100px] left-[-100px] blur-3xl opacity-30 z-0"></div>
      <div className="absolute gradient-blob w-[500px] h-[500px] bg-orange-400 bottom-[-150px] right-[-150px] blur-3xl opacity-20 z-0"></div>

      {/* Sidebar (Responsive) */}
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

      {/* Hamburger Button (mobile) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-4 left-4 md:hidden z-30 bg-slate-900/70 p-2 rounded-lg"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

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
                    Use your tokens to request skills from others or offer more
                    to earn!
                  </p>
                </div>
              </div>
            )}

            {/* Skills Section */}
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

      {/* Offer Skill Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-40">
          <div className="bg-slate-900/90 p-6 rounded-2xl w-[90%] max-w-md border border-slate-700">
            <h2 className="text-2xl font-semibold text-teal-400 mb-4">
              Offer a New Skill
            </h2>
            <form onSubmit={handleOfferSkill} className="space-y-4">
              <input
                type="text"
                placeholder="Skill Title"
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
                value={newSkill.title}
                onChange={(e) => setNewSkill({ ...newSkill, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white resize-none"
                rows="3"
                value={newSkill.description}
                onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Tokens (e.g. 5)"
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
                value={newSkill.tokens}
                onChange={(e) => setNewSkill({ ...newSkill, tokens: e.target.value })}
                required
              />

              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
