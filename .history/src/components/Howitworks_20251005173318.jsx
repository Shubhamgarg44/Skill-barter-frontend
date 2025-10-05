import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, RefreshCcw, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      // UPDATED: Icon colors are now darker, saturated shades for visibility on a light background
      icon: <Lightbulb className="w-12 h-12 text-orange-500" />,
      title: "Share Your Skills",
      desc: "Offer what you’re good at—from guitar lessons to coding help. You earn credits each time you help someone.",
    },
    {
      icon: <RefreshCcw className="w-12 h-12 text-teal-500" />,
      title: "Exchange & Earn",
      desc: "Use your credits to request skills you need from others. No money involved, just a direct exchange of value.",
    },
    {
      icon: <Sprout className="w-12 h-12 text-purple-500" />,
      title: "Learn & Grow Together",
      desc: "Get the help you need, teach what you love, and become part of a thriving knowledge-sharing community.",
    },
  ];

  return (
    // UPDATED: Section background is white, main text is a dark slate
    <section className="bg-gray-100 py-20 px-6 text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          How It Works
        </h2>
        <p className="text-lg text-slate-600 mb-16 max-w-2xl mx-auto">
          Getting started is simple. In just three steps, you can join our community and begin exchanging valuable skills.
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              // UPDATED: Cards have a light background, border, and a colored shadow on hover
              className="p-8 bg-slate-50/80 rounded-2xl border border-slate-200/80 hover:shadow-xl hover:shadow-orange-300 transition-shadow duration-300"
            >
              <div className="flex justify-center mb-5">{step.icon}</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20">
          <motion.a
            href="#"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            // UPDATED: Button uses the primary orange accent color with white text
            className="inline-block px-8 py-4 bg-orange-600 text-white font-bold rounded-full shadow-lg hover:bg-orange-500 hover:shadow-orange-500/20 transition"
          >
            <button on>Ready to Start Exchanging?</button>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
