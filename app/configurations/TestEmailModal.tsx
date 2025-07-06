import { useState, useEffect, useRef } from 'react';
import type { EmailConfiguration, TestEmailData } from '@/lib/types/configuration.types';
import { useModalAnimation } from '@/lib/hooks/useModalAnimation';
import { DEFAULT_TEST_EMAIL } from '@/lib/constants/smtp.constants';
import { Button } from '@/components/ui/button';

interface TestEmailModalProps {
  config: EmailConfiguration;
  onSend: (testEmailData: TestEmailData) => void;
  onCancel: () => void;
  isSending: boolean;
}

export function TestEmailModal({ config, onSend, onCancel, isSending }: TestEmailModalProps) {
  const [formData, setFormData] = useState<TestEmailData>({
    recipient: '',
    subject: DEFAULT_TEST_EMAIL.subject,
    message: DEFAULT_TEST_EMAIL.message
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const prevSendingState = useRef<boolean>(false);
  
  const { isVisible, createAnimatedClose, createBackdropHandler } = useModalAnimation();

  // Handle completion of email sending
  useEffect(() => {
    const wasSending = prevSendingState.current;
    const isNotSending = !isSending;
    
    if (wasSending && isNotSending) {
      // Email sending just completed, show success message
      setShowSuccess(true);
      // Don't auto-close - let user close manually
    }
    
    // Update the previous state
    prevSendingState.current = isSending;
  }, [isSending]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.recipient.trim()) {
      newErrors.recipient = 'Recipient email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.recipient)) {
      newErrors.recipient = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSend(formData);
    }
  };

  const handleCancel = createAnimatedClose(() => {
    if (!isSending) {
      onCancel();
    }
  });

  const handleBackdropClick = createBackdropHandler(onCancel, isSending);

  return (
    <div 
      className={`fixed inset-0 bg-black/75 flex items-center justify-center p-2 sm:p-4 z-50 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      <div className={`bg-white rounded-lg shadow-xl w-full max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-all duration-200 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Send Test Email
            </h3>
            <Button
              onClick={handleCancel}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              disabled={isSending}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
          </div>
          
          {showSuccess ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Test Email Sent Successfully!
              </h4>
              <p className="text-sm text-gray-600 mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                The test email has been sent to {formData.recipient}
              </p>
              <Button
                onClick={handleCancel}
                className="w-full sm:w-auto"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  <strong>Using configuration:</strong> {config.displayName || config.fromEmail}
                </p>
                <p className="text-sm text-blue-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  From: {config.fromEmail}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Recipient Email *
                  </label>
                  <input
                    type="email"
                    value={formData.recipient}
                    onChange={(e) => setFormData(prev => ({ ...prev, recipient: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.recipient ? 'border-red-300' : 'border-gray-300'
                    }`}
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                    placeholder="test@example.com"
                    disabled={isSending}
                  />
                  {errors.recipient && (
                    <p className="mt-1 text-sm text-red-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {errors.recipient}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.subject ? 'border-red-300' : 'border-gray-300'
                    }`}
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                    placeholder="Test Email Subject"
                    disabled={isSending}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.message ? 'border-red-300' : 'border-gray-300'
                    }`}
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                    placeholder="Enter your test message here..."
                    disabled={isSending}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isSending}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    {isSending ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <span>Send Test Email</span>
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSending}
                    variant="ghost"
                    className="w-full sm:w-auto"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
