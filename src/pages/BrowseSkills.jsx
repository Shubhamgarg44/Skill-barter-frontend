import React, { useEffect, useState } from "react";
import api from "../api/axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { User, Coins, Calendar } from "lucide-react";

const BrowseSkills = () => {
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch all skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get("/skills");
        setSkills(res.data);
        setFilteredSkills(res.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // ✅ Search filter
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = skills.filter(
      (s) =>
        s.title.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term) ||
        (s.offeredBy?.name || "").toLowerCase().includes(term)
    );
    setFilteredSkills(filtered);
  }, [searchTerm, skills]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-gray-300 flex justify-center items-center text-xl">
        Loading skills...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-gray-200 pt-28 pb-16 px-6 md:px-10">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-semibold text-center text-teal-400 mb-10">
        Explore Available Skills
      </h1>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Search skills, users, or categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900/70 border border-slate-700 rounded-xl text-white px-5 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400 transition-all duration-300"
        />
      </div>

      {/* Skill Cards Grid */}
      {filteredSkills.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredSkills.map((skill) => (
            <div
              key={skill._id}
              onClick={() =>
                navigate(`/profile/${skill.offeredBy?._id || "unknown"}`)
              }
              className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/80 border border-slate-700 shadow-lg rounded-2xl p-6 cursor-pointer hover:shadow-teal-500/20 hover:border-teal-400/60 transition-all duration-300 backdrop-blur-xl group"
            >
              {/* Skill Info */}
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold text-orange-400 group-hover:text-orange-300 transition">
                  {skill.title}
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {skill.description}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-700 my-4"></div>

              {/* Details Row */}
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-teal-400" />
                  <span className="font-medium text-white group-hover:text-teal-300 transition">
                    {skill.offeredBy?.name || "Anonymous"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Coins size={16} className="text-yellow-400" />
                  <span className="text-teal-400 font-semibold">
                    💎 {skill.tokens} Tokens
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-orange-400" />
                  <span>{dayjs(skill.createdAt).format("DD MMM YYYY")}</span>
                </div>
              </div>

              {/* Request Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent navigating to profile
                  alert("Feature coming soon: Request Skill");
                }}
                className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition group-hover:shadow-md"
              >
                Request This Skill
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg mt-10">
          No skills found matching your search.
        </p>
      )}
    </div>
  );
};

export default BrowseSkills;
