// components/WhyChooseUs.jsx
import React from "react";

const reasons = [
  {
    id: 1,
    title: "People Trust Us",
    desc: "Over 50 million people use our PDF tools monthly worldwide.",
    icon: "🌍",
  },
  {
    id: 2,
    title: "Business Trust Us",
    desc: "Used by top companies to simplify document workflows.",
    icon: "🏢",
  },
  {
    id: 3,
    title: "Secure & Encrypted",
    desc: "All files processed with enterprise-grade TLS encryption.",
    icon: "🔒",
  },
  {
    id: 4,
    title: "24/7 Support",
    desc: "Dedicated support team ready to help you anytime.",
    icon: "📞",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#07479D]">
          Why Choose Us?
        </h2>
        <p className="mt-4 text-gray-600">
          Security, reliability, and productivity are our priorities.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {reasons.map((reason) => (
          <div
            key={reason.id}
            className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl shadow hover:shadow-xl transition"
          >
            <div className="text-4xl">{reason.icon}</div>
            <h3 className="mt-4 text-xl font-semibold text-[#07479D]">
              {reason.title}
            </h3>
            <p className="mt-2 text-gray-600">{reason.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
