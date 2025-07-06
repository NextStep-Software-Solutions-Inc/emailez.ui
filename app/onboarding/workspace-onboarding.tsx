import { useState } from 'react';
import { useWorkspace } from '@/lib/contexts/WorkspaceContext';
import type { CreateWorkspaceCommand } from '@/types/index';
import { Button } from '@/components/ui/button';

export function WorkspaceOnboarding() {
  const { createWorkspace, isOperationLoading, error } = useWorkspace();
  const [formData, setFormData] = useState<CreateWorkspaceCommand>({
    name: '',
    domain: '',
  });
  const [step, setStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name?.trim()) {
      alert('Please enter your workspace name');
      return;
    }
    
    try {
      await createWorkspace(formData);
      // WorkspaceProvider will handle the redirect after successful creation
    } catch (error) {
      console.error('Failed to create workspace:', error);
    }
  };

  const handleNext = () => {
    if (step === 1 && !formData.name?.trim()) {
      alert('Please enter your workspace name');
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">E</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Welcome to Email EZ
          </h1>
          <p className="text-gray-600">
            Let's set up your workspace to get started
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`w-8 h-1 rounded-full ${
              step >= 2 ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Workspace Details
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Tell us about your workspace
                  </p>
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Workspace Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your workspace name"
                    required
                  />
                </div>

                <Button
                  type="button"
                  onClick={handleNext}
                  className="w-full"
                  size="lg"
                >
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Domain Setup
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Add your domain (optional)
                  </p>
                </div>
                
                <div>
                  <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
                    Domain (Optional)
                  </label>
                  <input
                    type="text"
                    id="domain"
                    value={formData.domain || ''}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="example.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be used for email configurations
                  </p>
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1"
                    size="lg"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isOperationLoading}
                    className="flex-1"
                    size="lg"
                  >
                    {isOperationLoading ? 'Creating...' : 'Create Organization'}
                  </Button>
                </div>
              </div>
            )}
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Need help? <a href="/support" className="text-blue-600 hover:text-blue-700">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
