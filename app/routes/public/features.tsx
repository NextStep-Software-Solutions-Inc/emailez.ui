import { Briefcase, Settings, BarChart2, Send, Users, LayoutDashboard, Smartphone, Rocket } from "lucide-react";
import type { Route } from "./+types/features";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Features - Email EZ" },
    { name: "description", content: "Discover all the powerful features of Email EZ" },
  ];
}

const features = [
  {
    title: "Multi-Workspace Support",
    description: "Manage multiple workspaces for different teams or clients with ease.",
    icon: Briefcase,
    iconColor: "text-blue-600 bg-blue-100"
  },
  {
    title: "Flexible SMTP Configurations",
    description: "Add and manage multiple SMTP configurations for sending emails.",
    icon: Settings,
    iconColor: "text-purple-600 bg-purple-100"
  },
  {
    title: "Email Analytics",
    description: "Track email delivery, open rates, and engagement with built-in analytics.",
    icon: BarChart2,
    iconColor: "text-green-600 bg-green-100"
  },
  {
    title: "Email Blasting",
    description: "Send bulk emails efficiently to your audience.",
    icon: Send,
    iconColor: "text-pink-600 bg-pink-100"
  },
  {
    title: "User Management",
    description: "Invite, manage, and assign roles to users within your workspace.",
    icon: Users,
    iconColor: "text-yellow-600 bg-yellow-100"
  },
  {
    title: "Modern Dashboard",
    description: "Get a quick overview of your email activity and workspace stats.",
    icon: LayoutDashboard,
    iconColor: "text-cyan-600 bg-cyan-100"
  },
  {
    title: "Mobile Responsive UI",
    description: "Enjoy a seamless experience on any device, desktop or mobile.",
    icon: Smartphone,
    iconColor: "text-indigo-600 bg-indigo-100"
  },
  {
    title: "Easy Onboarding",
    description: "Get started quickly with a guided onboarding process.",
    icon: Rocket,
    iconColor: "text-red-600 bg-red-100"
  },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Features</h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover all the powerful features of Email EZ designed to help you send, manage, and track emails with ease.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col items-start transition-all duration-300 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 group"
            >
              <div className={`mb-4 rounded-full w-12 h-12 flex items-center justify-center ${feature.iconColor} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                <feature.icon size={28} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">{feature.title}</h2>
              <p className="text-gray-600 text-base group-hover:text-gray-800 transition-colors duration-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
