import React, { useEffect, useState } from "react";

const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden relative">
      {/* Floating Gradient Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-400 rounded-full blur-[180px] opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500 rounded-full blur-[220px] opacity-20 translate-x-1/3 translate-y-1/3"></div>

      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 relative z-10 pt-28">
        <h1
          className="text-5xl lg:text-6xl font-extrabold text-teal-400 mb-6 leading-tight"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          Empowering People Through Skill Exchange
        </h1>
        <p
          className="text-xl text-slate-300 max-w-2xl leading-relaxed mb-10"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          SkillBarter connects learners and experts worldwide, allowing people
          to trade knowledge, collaborate, and grow — without boundaries.
        </p>
        <button className="bg-orange-600 text-white px-10 py-4 text-lg font-bold rounded-full hover:bg-orange-500 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-orange-500/30 active:scale-95">
          Join the Movement
        </button>
      </section>

      {/* Who We Are */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div
          className="relative w-full h-80 flex items-center justify-center"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-teal-400/30 rounded-3xl blur-2xl"></div>
          <img
            src="/src/assets/teamwork.png"
            alt="Team"
            className="relative z-10 rounded-3xl w-full h-full object-cover border border-white/10"
          />
        </div>
        <div className="text-left space-y-4">
          <h2 className="text-3xl font-bold text-orange-400">Who We Are</h2>
          <p className="text-slate-300 leading-relaxed">
            We are a passionate team of innovators, educators, and dreamers
            redefining how people learn. SkillBarter was born out of the idea
            that **knowledge should be shared, not sold** — empowering every
            individual to grow through connection.
          </p>
          <p className="text-slate-400">
            Our platform enables users to **exchange skills** using tokens, 
            fostering meaningful learning experiences and collaborations.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-800/40 backdrop-blur-xl py-20 border-t border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-teal-400 mb-4">
              Our Mission
            </h2>
            <p className="text-slate-300 leading-relaxed">
              To build a global network where people **trade skills freely**, 
              empower others, and create a sustainable learning ecosystem that 
              values knowledge above all.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-orange-400 mb-4">
              Our Vision
            </h2>
            <p className="text-slate-300 leading-relaxed">
              To eliminate educational inequality by connecting learners and 
              teachers across the world through skill-sharing, mentorship, 
              and community-driven collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose SkillBarter */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center relative z-10">
        <h2 className="text-4xl font-bold text-teal-400 mb-12">
          Why Choose SkillBarter?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Community Driven",
              desc: "Join a global network of learners and teachers who share, grow, and collaborate together.",
              color: "from-orange-500 to-pink-500",
              emoji: "🌍",
            },
            {
              title: "Learn by Doing",
              desc: "Practice skills in real-world exchanges, not through static courses.",
              color: "from-teal-400 to-cyan-500",
              emoji: "⚡",
            },
            {
              title: "Token Economy",
              desc: "Earn and spend tokens by teaching and learning — building value through knowledge.",
              color: "from-purple-500 to-violet-600",
              emoji: "💎",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${item.color} p-[2px] rounded-2xl hover:scale-[1.03] transition-transform duration-300`}
            >
              <div className="bg-slate-900/90 rounded-2xl p-6 h-full backdrop-blur-xl text-left space-y-3">
                <div className="text-4xl">{item.emoji}</div>
                <h3 className="text-2xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default About;
