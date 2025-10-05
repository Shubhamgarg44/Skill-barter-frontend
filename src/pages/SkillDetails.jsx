import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import { ArrowLeft, Star } from "lucide-react";

const SkillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await api.get(`/skills`);
        const found = res.data.find((s) => s._id === id);
        setSkill(found);
      } catch (err) {
        console.error("Error fetching skill:", err);
        toast.error("Failed to load skill details.");
      } finally {
        setLoading(false);
      }
    };
    fetchSkill();
  }, [id]);

  const handleRequestSkill = async () => {
    try {
      await api.post(`/skills/request/${id}`);
      toast.success("✅ Skill request sent successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Request error:", err);
      if (err.response?.status === 400) {
        toast.warn("You cannot request your own skill!");
      } else if (err.response?.status === 409) {
        toast.info("You already requested this skill.");
      } else {
        toast.error("Failed to send skill request.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-950 text-gray-300">
        Loading skill details...
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-950 text-gray-300">
        <p>Skill not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden p-6 md:p-12">
      {/* Background Blobs */}
      <div className="absolute gradient-blob w-[400px] h-[400px] bg-teal-500 top-[-100px] left-[-100px] blur-3xl opacity-30"></div>
      <div className="absolute gradient-blob w-[500px] h-[500px] bg-orange-400 bottom-[-150px] right-[-150px] blur-3xl opacity-20"></div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition mb-6"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Skill Card */}
      <div className="relative bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 max-w-3xl mx-auto shadow-xl z-10">
        <h1 className="text-3xl font-semibold text-teal-400 mb-4">
          {skill.title}
        </h1>

        <p className="text-gray-300 mb-6 text-lg leading-relaxed">
          {skill.description}
        </p>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-slate-800 pt-6">
          <div>
            <p className="text-gray-400">
              <span className="font-semibold text-orange-300">Offered by:</span>{" "}
              {skill.offeredBy?.name || "Unknown"}
            </p>
            <p className="text-gray-400 mt-1">
              <span className="font-semibold text-orange-300">Tokens:</span> 💎{" "}
              {skill.tokens}
            </p>
          </div>

          <button
            onClick={handleRequestSkill}
            className="mt-6 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg text-lg transition font-medium"
          >
            Request Skill
          </button>
        </div>
      </div>

      {/* Optional Extras (Stars / Rating Placeholder) */}
      <div className="max-w-3xl mx-auto mt-10 text-center text-gray-400 text-sm">
        <div className="flex justify-center gap-1 mb-1">
          <Star size={16} className="text-yellow-400" />
          <Star size={16} className="text-yellow-400" />
          <Star size={16} className="text-yellow-400" />
          <Star size={16} className="text-yellow-400" />
          <Star size={16} className="text-gray-500" />
        </div>
        <p>Skill Rating Feature Coming Soon ⭐</p>
      </div>
    </div>
  );
};

export default SkillDetails;
