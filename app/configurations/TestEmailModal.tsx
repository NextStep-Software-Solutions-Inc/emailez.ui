import { useState, useEffect, useRef } from 'react';
import type { EmailConfiguration, TestEmailData } from '@/lib/types/configuration.types';
import { DEFAULT_TEST_EMAIL } from '@/lib/constants/smtp.constants';
import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/ui/responsive-dialog';

interface TestEmailModalProps {
  open: boolean
  config: EmailConfiguration;
  onSend: (testEmailData: TestEmailData) => void;
  onOpenChange: (open: boolean) => void;
  isSending: boolean;
}

export function TestEmailModal({ config, onSend, onOpenChange, isSending, open }: TestEmailModalProps) {
  const [formData, setFormData] = useState<TestEmailData>({
    recipient: '',
    subject: DEFAULT_TEST_EMAIL.subject,
    message: DEFAULT_TEST_EMAIL.message
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const prevSendingState = useRef<boolean>(false);

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

  const handleCancel = () => {
    if (!isSending) {
      onOpenChange(false);
    }
  };

  // Reset success state when dialog is closed
  useEffect(() => {
    if (!open) {
      setShowSuccess(false);
      setErrors({});
    }
  }, [open]);

  const successContent = (
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
    </div>
  );

  const successFooter = (
    <Button
      onClick={handleCancel}
      className="w-full sm:w-auto"
      style={{ fontFamily: 'Nunito, sans-serif' }}
    >
      Close
    </Button>
  );

  const formContent = (
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
      </form>
    </>
  );

  const formFooter = (
    <>
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
      <Button
        type="submit"
        disabled={isSending}
        className="w-full sm:w-auto flex items-center justify-center space-x-2"
        style={{ fontFamily: 'Nunito, sans-serif' }}
        onClick={handleSubmit}
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
    </>
  );

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Send Test Email"
      size="md"
      footer={showSuccess ? successFooter : formFooter}
    >
      {showSuccess ? successContent : formContent}
    </ResponsiveDialog>
  );
}
