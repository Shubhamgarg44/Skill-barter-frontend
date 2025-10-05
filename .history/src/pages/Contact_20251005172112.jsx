import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setTimeout(() => {
      setStatus("Message Sent! ✅ We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden relative">
      {/* Floating gradient blobs (same as Hero/About) */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-400 rounded-full blur-[180px] opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500 rounded-full blur-[220px] opacity-20 translate-x-1/3 translate-y-1/3"></div>

      {/* Page Header */}
      <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-6 relative z-10 pt-28">
        <h1
          className="text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          Get in Touch
        </h1>
        <p
          className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-10"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          Have a question, feedback, or collaboration idea?  
          We’d love to hear from you!
        </p>
      </section>

      {/* Contact Info & Form */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-12 items-start relative z-10">
        {/* Contact Info */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-orange-400 mb-6">
            Contact Information
          </h2>
          <div className="space-y-5 text-slate-300">
            <div className="flex items-center gap-4">
              <Mail className="text-teal-400" size={22} />
              <span>support@skillbarter.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-orange-400" size={22} />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-purple-400" size={22} />
              <span>New Delhi, India</span>
            </div>
          </div>

          <p className="text-slate-400 mt-8">
            We’re always open to feedback, partnership opportunities, and ideas
            from our community. Let’s make learning accessible for everyone.
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800/70 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8 space-y-6"
        >
          <h2 className="text-2xl font-semibold text-teal-400 mb-2">
            Send Us a Message
          </h2>
          <div>
            <label className="block text-slate-400 text-sm mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-teal-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-400 outline-none resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-500 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Send size={18} /> Send Message
          </button>
          {status && (
            <p className="text-center text-teal-400 text-sm font-medium">
              {status}
            </p>
          )}
        </form>
      </section>

      {/* Floating Animation */}
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

export default Contact;
