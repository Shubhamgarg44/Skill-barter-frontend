import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import dayjs from "dayjs";
import { User, Mail, Calendar, Coins } from "lucide-react";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user data + skills
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, skillsRes] = await Promise.all([
          api.get(`/auth/user/${userId}`), // backend route we’ll add below
          api.get("/skills"),
        ]);

        setUser(userRes.data);
        // filter skills by user
        const userSkills = skillsRes.data.filter(
          (s) => s.offeredBy?._id === userId
        );
        setSkills(userSkills);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-gray-300 flex justify-center items-center text-xl">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-gray-300 flex justify-center items-center text-lg">
        User not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-gray-200 pt-28 pb-16 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/70 border border-slate-700 rounded-2xl p-8 shadow-lg backdrop-blur-xl flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-orange-500 flex items-center justify-center text-white text-4xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-white mb-2">
              {user.name}
            </h1>
            <p className="text-gray-400 mb-4">
              {user.bio || "This user hasn't added a bio yet."}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-orange-400" />
                {user.email}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-teal-400" />
                Joined {dayjs(user.createdAt).format("DD MMM YYYY")}
              </div>
              <div className="flex items-center gap-2">
                <Coins size={16} className="text-yellow-400" />
                Wallet: {user.wallet || 100} Tokens
              </div>
            </div>
          </div>
        </div>

        {/* Offered Skills */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-teal-400 mb-6">
            Offered Skills
          </h2>

          {skills.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl p-6 hover:border-teal-400 hover:shadow-teal-400/10 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-orange-400 mb-2">
                    {skill.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                    {skill.description}
                  </p>
                  <p className="text-teal-400 font-medium mb-3">
                    💎 {skill.tokens} Tokens
                  </p>
                  <p className="text-xs text-gray-500">
                    Added {dayjs(skill.createdAt).format("DD MMM YYYY")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              {user.name?.split(" ")[0]} hasn’t offered any skills yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
