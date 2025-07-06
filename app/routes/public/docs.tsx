import type { Route } from "./+types/docs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Documentation - Email EZ" },
    { name: "description", content: "Complete API documentation and integration guides" },
  ];
}

export default function Docs() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Documentation
          </h1>
          <p className="text-xl text-gray-600 mb-8" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Temporary Documentation page - Coming soon!
          </p>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              📚 API Documentation
            </h2>
            <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
              This is a temporary placeholder for the Documentation page. Here you can provide comprehensive API docs, integration guides, code examples, and tutorials for Email EZ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
