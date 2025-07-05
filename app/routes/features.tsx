export function meta() {
  return [
    { title: "Features - Email EZ" },
    { name: "description", content: "Discover all the powerful features of Email EZ" },
  ];
}

export default function Features() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Features
          </h1>
          <p className="text-xl text-gray-600 mb-8" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Temporary Features page - Coming soon!
          </p>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              🚀 Features Overview
            </h2>
            <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
              This is a temporary placeholder for the Features page. Here you can showcase all the powerful features of Email EZ including SMTP configurations, analytics, multi-tenant support, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
