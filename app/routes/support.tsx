export function meta() {
  return [
    { title: "Support - Email EZ" },
    { name: "description", content: "Get help and support for Email EZ" },
  ];
}

export default function Support() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Support
          </h1>
          <p className="text-xl text-gray-600 mb-8" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Temporary Support page - Coming soon!
          </p>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              🤝 Get Help
            </h2>
            <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
              This is a temporary placeholder for the Support page. Here you can provide contact information, help center, FAQ, and support ticket system for Email EZ users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
