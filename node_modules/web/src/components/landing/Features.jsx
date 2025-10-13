// components/Features.jsx
import React from "react";

const features = [
  {
    id: 1,
    title: "Work Directly on Your Files",
    desc: "Edit, highlight, add text, and annotate PDFs instantly without downloading extra tools.",
    icon: "✏️",
  },
  {
    id: 2,
    title: "Digital Signatures Made Easy",
    desc: "Easily sign PDFs securely or request signatures from others in seconds.",
    icon: "🖊️",
  },
  {
    id: 3,
    title: "Create the Perfect Document",
    desc: "Merge, split, compress, or convert PDFs into polished documents quickly.",
    icon: "📄",
  },
  {
    id: 4,
    title: "Manage Documents in One Place",
    desc: "Upload, organize, and store documents for easy access anytime, anywhere.",
    icon: "📂",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#07479D]">
          Keep Your Simple Tasks Simple
        </h2>
        <p className="mt-4 text-gray-600">
          Simple, secure, and productive features that save you time.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl shadow hover:shadow-xl transition"
          >
            <div className="text-4xl">{feature.icon}</div>
            <h3 className="mt-4 text-xl font-semibold text-[#07479D]">
              {feature.title}
            </h3>
            <p className="mt-2 text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
