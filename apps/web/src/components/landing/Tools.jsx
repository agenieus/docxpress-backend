// components/Tools.jsx
import React from "react";

const toolsData = [
  { id: 1, title: "Compress PDF", desc: "Reduce file size quickly.", icon: "📉" },
  { id: 2, title: "PDF to Word", desc: "Convert PDF to Word easily.", icon: "📝" },
  { id: 3, title: "Merge PDF", desc: "Combine files in seconds.", icon: "📂" },
];

export default function Tools() {
  return (
    <section id="tools" className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#07479D]">
          Most Popular PDF Tools
        </h2>
        <p className="mt-4 text-gray-600">
          Discover the tools millions of users love, ready for you to simplify work.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {toolsData.map((tool) => (
          <div
            key={tool.id}
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition"
          >
            <div className="text-4xl">{tool.icon}</div>
            <h3 className="mt-4 text-xl font-semibold text-[#07479D]">
              {tool.title}
            </h3>
            <p className="mt-2 text-gray-600">{tool.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
