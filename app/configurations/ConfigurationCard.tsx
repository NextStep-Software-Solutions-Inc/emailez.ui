import type { EmailConfiguration, TestConnectionResult } from '@/types/configuration.types';

interface ConfigurationCardProps {
  config: EmailConfiguration;
  testResult?: TestConnectionResult;
  isTestingConnection: boolean;
  onTestConnection: () => void;
  onSendTestEmail: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ConfigurationCard({
  config,
  testResult,
  isTestingConnection,
  onTestConnection,
  onSendTestEmail,
  onEdit,
  onDelete
}: ConfigurationCardProps) {
  const getConnectionButtonStyle = () => {
    if (testResult?.success) {
      return 'bg-green-50 text-green-600 hover:bg-green-100';
    } else if (testResult?.success === false) {
      return 'bg-red-50 text-red-600 hover:bg-red-100';
    }
    return 'bg-gray-50 text-gray-600 hover:bg-gray-100';
  };

  const getConnectionButtonContent = () => {
    if (isTestingConnection) {
      return (
        <>
          <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Testing...</span>
        </>
      );
    } else if (testResult?.success) {
      return (
        <>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Connected</span>
        </>
      );
    } else if (testResult?.success === false) {
      return (
        <>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>Failed</span>
        </>
      );
    }
    return <span>Test Connection</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {config.displayName || config.fromEmail}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 truncate" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {config.smtpHost}:{config.smtpPort} {config.useSsl && '(SSL)'}
          </p>
        </div>
        
        {/* Action buttons - responsive layout */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <button
            onClick={onTestConnection}
            disabled={isTestingConnection}
            className={`px-1.5 sm:px-3 py-1.5 text-xs rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${getConnectionButtonStyle()} ${
              isTestingConnection ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            {getConnectionButtonContent()}
          </button>
          <button
            onClick={onSendTestEmail}
            className="px-1.5 sm:px-3 py-1.5 text-xs bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-1 whitespace-nowrap"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="hidden sm:inline">Send Test</span>
            <span className="sm:hidden">Test</span>
          </button>
          <button
            onClick={onEdit}
            className="px-1.5 sm:px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-1.5 sm:px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors whitespace-nowrap"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Delete
          </button>
        </div>
      </div>
      
      {/* Connection Test Result */}
      {testResult && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          testResult.success
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        }`} style={{ fontFamily: 'Nunito, sans-serif' }}>
          {testResult.message}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
        <div className="min-w-0">
          <span className="text-gray-500 block" style={{ fontFamily: 'Nunito, sans-serif' }}>From Email:</span>
          <span className="text-gray-900 break-all" style={{ fontFamily: 'Nunito, sans-serif' }}>{config.fromEmail}</span>
        </div>
        <div className="min-w-0">
          <span className="text-gray-500 block" style={{ fontFamily: 'Nunito, sans-serif' }}>Username:</span>
          <span className="text-gray-900 break-all" style={{ fontFamily: 'Nunito, sans-serif' }}>{config.username}</span>
        </div>
        <div className="min-w-0">
          <span className="text-gray-500 block" style={{ fontFamily: 'Nunito, sans-serif' }}>Created:</span>
          <span className="text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {new Date(config.createdAtUtc).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
