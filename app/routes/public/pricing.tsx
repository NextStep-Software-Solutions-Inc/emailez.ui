import React from "react";
import PricingCard from "@/components/PricingCard";
import type { Route } from "./+types/pricing";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Pricing - Email EZ" },
    { name: "description", content: "Choose the perfect plan for your email sending needs" },
  ];
}

// Pricing plans as JSON array
const plans = [
  {
    title: "Free",
    priceMonthly: 0,
    priceYearly: 0,
    discountMonthly: 0,
    discountYearly: 0,
    color: "text-blue-600",
    features: ["1 workspace", "1 email configuration", "Send up to 100 emails per day"],
    buttonText: "Get Started Free",
    buttonColor: "bg-blue-600 hover:bg-blue-700"
  },
  {
    title: "Basic",
    priceMonthly: 10,
    priceYearly: 120,
    discountMonthly: 0,
    discountYearly: 17,
    color: "text-green-600",
    features: ["3 email configurations", "Analytics included", "Email logging (7 days)", "Up to 5 email templates", "Email support", "Connect to any SMTP provider (not just Google)"],
    buttonText: "Choose Basic",
    buttonColor: "bg-green-600 hover:bg-green-700"
  },
  {
    title: "Business",
    priceMonthly: 24,
    priceYearly: 288,
    discountMonthly: 0,
    discountYearly: 20,
    color: "text-purple-600",
    features: ["Up to 5 workspaces", "Unlimited email configurations", "Email Blasting", "Email logging (90 days)", "Up to 50 email templates", "12/7 support"],
    buttonText: "Choose Business",
    buttonColor: "bg-purple-600 hover:bg-purple-700"
  },
  {
    title: "Enterprise",
    priceMonthly: null,
    priceYearly: null,
    discountMonthly: 0,
    discountYearly: 0,
    color: "text-gray-800",
    features: ["All Business features", "Custom integrations", "Dedicated account manager", "24/7 support"],
    buttonText: "Contact Sales",
    buttonColor: "bg-gray-800 hover:bg-gray-900"
  }
];
export default function Pricing() {
  const [showYearly, setShowYearly] = React.useState(false);

  // Find the highest discount among all plans
  const highestDiscount = Math.max(
    ...plans.map((plan) => Math.max(plan.discountMonthly || 0, plan.discountYearly || 0))
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 pt-24 md:pt-10">
      <div className="w-full max-w-7xl flex flex-col items-center justify-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing</h1>
          <p className="text-xl text-gray-600">Choose the perfect plan for your email sending needs.</p>
          {highestDiscount > 0 && (
            <div className="text-green-600 font-semibold text-base mt-2">Up to {highestDiscount}% off on selected plans!</div>
          )}
          <button
            className="mt-6 text-sm text-blue-600 underline font-semibold px-4 rounded focus:outline-none focus:ring"
            onClick={() => setShowYearly((v) => !v)}
          >
            {showYearly ? "Show Monthly Pricing" : `Show Yearly Pricing (up to ${highestDiscount}% off)`}
          </button>
        </div>
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <PricingCard key={plan.title} {...plan} showYearly={showYearly} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
