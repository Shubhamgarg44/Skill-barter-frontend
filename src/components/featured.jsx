import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const FeaturedSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get("/skills");
        setSkills(res.data.slice(0, 6)); // show top 6 as featured
      } catch (error) {
        console.error("Error fetching featured skills:", error);
        toast.error("Failed to load featured skills.");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-400 animate-pulse">
        Loading featured skills...
      </div>
    );
  }

  return (
    <section className="py-16 bg-white text-center" id="featured">
      <h2 className="text-4xl font-semibold text-gray-900 mb-12">
        Featured Skills
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <Link
              key={skill._id}
              to={`/skills/${skill._id}`}
              className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition hover:-translate-y-1 border border-gray-200 group"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-orange-500 transition">
                  {skill.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {skill.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    By{" "}
                    <span className="text-orange-500 font-medium">
                      {skill.offeredBy?.name || "Anonymous"}
                    </span>
                  </span>
                  <span className="text-teal-600 font-semibold">
                    💎 {skill.tokens}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No skills available yet.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedSkills;
