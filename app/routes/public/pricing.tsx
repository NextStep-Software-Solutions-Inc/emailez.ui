import type { Route } from "./+types/pricing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pricing - Email EZ" },
    { name: "description", content: "Choose the perfect plan for your email sending needs" },
  ];
}

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Temporary Pricing page - Coming soon!
          </p>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              💰 Pricing Plans
            </h2>
            <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
              This is a temporary placeholder for the Pricing page. Here you can display subscription tiers, usage-based pricing, and comparison tables for different Email EZ plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
