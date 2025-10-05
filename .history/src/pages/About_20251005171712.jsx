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
      {/* Floating gradient blobs like Hero */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-400 rounded-full blur-[180px] opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500 rounded-full blur-[220px] opacity-20 translate-x-1/3 translate-y-1/3"></div>

      {/* Main About Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 relative z-10 pt-28">
        <h1
          className="text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          The Future of Learning is Collaborative
        </h1>
        <p
          className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-10"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          At SkillBarter, we’re redefining how people learn. Our community
          believes in sharing knowledge — not just consuming it. We’re building
          a world where everyone can grow together.
        </p>
        <button className="bg-orange-600 text-white px-10 py-4 text-lg font-bold rounded-full hover:bg-orange-500 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-orange-500/30 active:scale-95">
          Join the Movement
        </button>
      </section>

      {/* About Details Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Image / Visual Side */}
        <div
          className="relative w-full h-80 flex items-center justify-center"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400/30 to-purple-500/30 rounded-3xl blur-2xl"></div>
          <img
            src="/src/assets/teamwork.png"
            alt="Team Collaboration"
            className="relative z-10 rounded-3xl w-full h-full object-cover border border-white/10"
          />
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-orange-400">
            Who We Are
          </h2>
          <p className="text-slate-300 leading-relaxed">
            SkillBarter is more than a platform — it’s a movement to make
            learning accessible, personal, and human. By connecting learners and
            teachers through shared skills, we’re creating a system built on
            trust, collaboration, and growth.
          </p>
          <p className="text-slate-400">
            Whether you’re an artist, developer, cook, or student — there’s
            always someone you can learn from, and someone who can learn from
            you.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-slate-800/50 backdrop-blur-xl border-t border-b border-slate-700 py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold text-teal-400 mb-4">
              Our Mission
            </h2>
            <p className="text-slate-300 leading-relaxed">
              To create a world where learning and teaching flow naturally
              between people. We aim to connect individuals through the power of
              skill-sharing — creating an ecosystem of continuous learning.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-orange-400 mb-4">
              Our Vision
            </h2>
            <p className="text-slate-300 leading-relaxed">
              We envision a community-driven economy of knowledge where skills
              are the true currency, and every connection creates an opportunity
              for growth.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center relative z-10">
        <h2 className="text-4xl font-bold text-white mb-12">
          Why Choose <span className="text-orange-400">SkillBarter</span>?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "Community of Learners",
              desc: "Connect with people passionate about growth — from coding and cooking to design and music.",
              color: "from-teal-400 to-cyan-500",
              emoji: "🌍",
            },
            {
              title: "Learn. Teach. Earn.",
              desc: "Earn tokens by teaching others and use them to learn new skills — knowledge that truly pays back.",
              color: "from-orange-500 to-pink-500",
              emoji: "💎",
            },
            {
              title: "Built for Collaboration",
              desc: "Exchange ideas, feedback, and skills in a fun, interactive way that builds real connections.",
              color: "from-purple-500 to-violet-600",
              emoji: "🤝",
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
