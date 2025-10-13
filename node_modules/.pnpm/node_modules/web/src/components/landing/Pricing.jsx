// components/Pricing.jsx
import React from "react";

const plans = [
  {
    id: 1,
    name: "Pro",
    price: "9",
    features: ["Unlimited access", "Single user", "All tools included"],
  },
  {
    id: 2,
    name: "Team",
    price: "7",
    features: ["Per user, billed annually", "Collaboration features", "Priority support"],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#07479D]">
          Plans & Pricing
        </h2>
        <p className="mt-4 text-gray-600">
          Select the plan that best suits your workflow.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition"
          >
            <h3 className="text-2xl font-semibold text-[#07479D]">{plan.name}</h3>
            <p className="mt-4 text-3xl font-bold text-gray-800">
              ${plan.price} <span className="text-lg text-gray-500">/mo</span>
            </p>
            <ul className="mt-6 space-y-2 text-gray-600">
              {plan.features.map((f, i) => (
                <li key={i}>✅ {f}</li>
              ))}
            </ul>
            <button className="mt-6 w-full bg-[#07479D] text-white py-3 rounded-xl font-semibold hover:bg-blue-700">
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
