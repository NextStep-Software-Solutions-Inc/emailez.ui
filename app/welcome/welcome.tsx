
import { useElementHeight } from "@/hooks/useElementHeight";
import { SignedIn, SignedOut, SignInButton } from '@clerk/react-router';
import { Link } from 'react-router';

function BrandName() {
  return (
    <span className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent antialiased" style={{ fontFamily: 'Nunito, Comfortaa, sans-serif', fontWeight: 900 }}>
      Email EZ
    </span>
  );
}

function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8 animate-fade-in-up animation-delay-0">
          <BrandName />
        </div>
        <h2 className="text-2xl md:text-3xl text-gray-700 mb-6 font-medium animate-fade-in-up animation-delay-200" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Simple, Powerful Email Sending Service
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Multi-tenant subscription service that lets you configure multiple email providers, 
          manage SMTP settings, and send emails effortlessly across all your projects.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
          <SignedOut>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform" style={{ fontFamily: 'Nunito, sans-serif' }}>
              <SignInButton mode="modal">
                Get Started Free
              </SignInButton>
            </button>
            <Link 
              to="/pricing"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 transform text-center block" 
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              View Pricing
            </Link>
          </SignedOut>
          <SignedIn>
            <Link 
              to="/dashboard"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform text-center block" 
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Go to Dashboard
            </Link>
            <Link 
              to="/dashboard/settings"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 transform text-center block" 
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Manage Account
            </Link>
          </SignedIn>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: "⚡",
      title: "Multiple SMTP Configurations",
      description: "Connect and manage multiple email providers with different SMTP settings for each project or client."
    },
    {
      icon: "🏢",
      title: "Multi-Tenant Architecture",
      description: "Perfect for agencies and SaaS companies. Each tenant gets isolated email configurations and analytics."
    },
    {
      icon: "📊",
      title: "Subscription Management",
      description: "Flexible subscription tiers with usage tracking, billing management, and automatic scaling."
    },
    {
      icon: "🔒",
      title: "Secure & Reliable",
      description: "Enterprise-grade security with encrypted credentials and 99.9% uptime guarantee."
    },
    {
      icon: "📈",
      title: "Analytics & Tracking",
      description: "Detailed email delivery reports, bounce handling, and engagement metrics for each tenant."
    },
    {
      icon: "🚀",
      title: "Easy Integration",
      description: "Simple REST API and SDKs for popular programming languages. Get started in minutes."
    }
  ];

  return (
    <section id="features" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h3 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Why Choose Email EZ?
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Everything you need to manage email sending for multiple clients and projects
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:shadow-lg hover:scale-105 transform animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-4xl mb-4 animate-bounce-gentle">{feature.icon}</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {feature.title}
              </h4>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Sign Up & Create Tenant",
      description: "Create your account and set up your first tenant workspace for your organization."
    },
    {
      step: "2",
      title: "Configure SMTP Settings",
      description: "Add your SMTP server details, credentials, and authentication settings securely."
    },
    {
      step: "3",
      title: "Start Sending Emails",
      description: "Use our API or dashboard to send emails, track delivery, and manage your campaigns."
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up" style={{ fontFamily: 'Nunito, sans-serif' }}>
          How It Works
        </h3>
        <p className="text-xl text-gray-600 mb-16 animate-fade-in-up animation-delay-200" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Get started with Email EZ in just a few simple steps
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center animate-fade-in-up hover:scale-105 transform transition-all duration-300" style={{ animationDelay: `${(index + 1) * 200}ms` }}>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 animate-pulse-soft hover:animate-bounce-gentle" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {step.step}
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {step.title}
              </h4>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-4xl font-bold text-white mb-4 animate-fade-in-up" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Ready to Simplify Your Email Sending?
        </h3>
        <p className="text-xl text-blue-100 mb-8 animate-fade-in-up animation-delay-200" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Join thousands of developers and agencies who trust Email EZ for their email infrastructure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
          <SignedOut>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform" style={{ fontFamily: 'Nunito, sans-serif' }}>
              <SignInButton mode="modal">
                Start Free Trial
              </SignInButton>
            </button>
            <Link 
              to="/support"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 transform text-center block" 
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Contact Sales
            </Link>
          </SignedOut>
          <SignedIn>
            <Link 
              to="/dashboard"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform text-center block" 
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Access Dashboard
            </Link>
            <Link 
              to="/pricing"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 transform text-center block" 
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Upgrade Plan
            </Link>
          </SignedIn>
        </div>
      </div>
    </section>
  );
}

export function Welcome() {
  const headerHeight = useElementHeight(null, 'header', 800);
  
  return (
    <div 
      className="min-h-screen transition-all duration-300" 
      style={{ 
        fontFamily: 'Nunito, sans-serif',
        paddingTop: `${headerHeight}px`
      }}
    >
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </div>
  );
}