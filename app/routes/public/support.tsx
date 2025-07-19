import type { Route } from "./+types/support";
import { Mail, Phone } from "lucide-react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Support - Email EZ" },
    { name: "description", content: "Get help and support for Email EZ" },
  ];
}

export default function Support() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-24 md:pt-10 flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <span className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              <Mail size={48} color="#fff" strokeWidth={2.2} />
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Contact Us</h1>
            <p className="text-base sm:text-lg text-gray-600">We're here to help! Reach out to us and we'll get back to you as soon as possible.</p>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Mail size={28} color="#2563eb" strokeWidth={2.2} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-sm text-gray-500">Email</p>
                <a href="mailto:wave.ambray@nextstep-software.com" className="text-lg font-medium text-blue-700 hover:underline break-all">wave.ambray@nextstep-software.com</a>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Phone size={28} color="#9333ea" strokeWidth={2.2} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-sm text-gray-500">Mobile</p>
                <a href="tel:09654297640" className="text-lg font-medium text-purple-700 hover:underline">0965 429 7640</a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-gray-400">&copy; {new Date().getFullYear()} Email EZ. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}
