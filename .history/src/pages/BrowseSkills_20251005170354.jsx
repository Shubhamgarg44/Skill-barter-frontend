import React, { useEffect, useState } from "react";
import api from "../api/axios";
import dayjs from "dayjs";

const BrowseSkills = () => {
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all skills from backend
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

  // ✅ Filter skills by search
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

      {/* Skill Grid */}
      {filteredSkills.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredSkills.map((skill) => (
            <div
              key={skill._id}
              className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Skill Title */}
              <h2 className="text-2xl font-semibold text-orange-400 mb-2">
                {skill.title}
              </h2>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {skill.description}
              </p>

              {/* Info Row */}
              <div className="flex flex-col gap-1 text-sm text-gray-400">
                <p>
                  <span className="text-gray-500">Offered by:</span>{" "}
                  <span className="text-white font-medium">
                    {skill.offeredBy?.name || "Unknown User"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Tokens:</span>{" "}
                  <span className="text-teal-400 font-semibold">
                    💎 {skill.tokens}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Posted:</span>{" "}
                  {dayjs(skill.createdAt).format("DD MMM YYYY")}
                </p>
              </div>

              {/* Request Button */}
              <button
                className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition"
                onClick={() => alert("Feature coming soon: Request Skill")}
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
