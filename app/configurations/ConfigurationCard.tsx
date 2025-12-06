import type { EmailConfiguration, TestConnectionResult } from '@/types/configuration.types';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

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
  const [copiedId, setCopiedId] = useState(false);

  const copyConfigId = async () => {
    try {
      await navigator.clipboard.writeText(config.emailConfigurationId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } catch (err) {
      console.error('Failed to copy configuration ID:', err);
    }
  };
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
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate"  >
            {config.displayName || config.fromEmail}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 truncate"  >
            {config.smtpHost}:{config.smtpPort} {config.useSsl && '(SSL)'}
          </p>
        </div>
        
        {/* Action buttons - responsive layout */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <Button
            onClick={onTestConnection}
            disabled={isTestingConnection}
            variant="outline"
            size="sm"
            className={`px-1.5 sm:px-3 py-1.5 text-xs whitespace-nowrap ${getConnectionButtonStyle()} ${
              isTestingConnection ? 'opacity-50 cursor-not-allowed' : ''
            }`}
             
          >
            {getConnectionButtonContent()}
          </Button>
          <Button
            onClick={onSendTestEmail}
            variant="outline"
            size="sm"
            className="px-1.5 sm:px-3 py-1.5 text-xs bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100 transition-colors flex items-center gap-1 whitespace-nowrap"
             
          >
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="hidden sm:inline">Send Test</span>
            <span className="sm:hidden">Test</span>
          </Button>
          <Button
            onClick={onEdit}
            variant="outline"
            size="sm"
            className="px-1.5 sm:px-3 py-1.5 text-xs bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 transition-colors whitespace-nowrap"
             
          >
            Edit
          </Button>
          <Button
            onClick={onDelete}
            variant="outline"
            size="sm"
            className="px-1.5 sm:px-3 py-1.5 text-xs bg-red-50 text-red-600 border-red-200 hover:bg-red-100 transition-colors whitespace-nowrap"
             
          >
            Delete
          </Button>
        </div>
      </div>
      
      {/* Connection Test Result */}
      {testResult && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          testResult.success
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}  >
          {testResult.message}
        </div>
      )}
      
      {/* Configuration ID Display */}
      <div className="mb-6 relative">
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider"  >
              Configuration ID
            </h4>
          </div>
          <div 
            onClick={copyConfigId}
            className={`relative group cursor-pointer transition-all duration-300 rounded-lg ${
              copiedId ? 'ring-2 ring-emerald-300' : 'hover:ring-2 hover:ring-blue-300'
            }`}
          >
            <div className={`bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-all duration-200 ${
              copiedId 
                ? 'border-emerald-300 bg-emerald-50' 
                : 'border-slate-200 hover:border-slate-300'
            }`}>
              <div className="flex items-center justify-between gap-3">
                <code className="text-sm font-mono text-slate-800 break-all leading-relaxed flex-1" style={{ fontFamily: 'JetBrains Mono, Consolas, monospace' }}>
                  {config.emailConfigurationId}
                </code>
                <div className={`flex items-center gap-1 transition-all duration-300 ${
                  copiedId 
                    ? 'text-emerald-600' 
                    : 'text-slate-400 group-hover:text-slate-600'
                }`}>
                  {copiedId ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium"  >Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"  >Copy</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* Click hint overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-slate-800 text-white px-2 py-1 rounded text-xs font-medium shadow-lg"  >
                Click to copy
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Configuration Details - Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-slate-600 font-medium"  >From Email</span>
          </div>
          <span className="text-slate-900 font-mono text-sm break-all" style={{ fontFamily: 'JetBrains Mono, Consolas, monospace' }}>
            {config.fromEmail}
          </span>
        </div>
        
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-slate-600 font-medium"  >Username</span>
          </div>
          <span className="text-slate-900 font-mono text-sm break-all" style={{ fontFamily: 'JetBrains Mono, Consolas, monospace' }}>
            {config.username}
          </span>
        </div>
        
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-slate-600 font-medium"  >SSL Security</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
              config.useSsl 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                : 'bg-amber-100 text-amber-800 border border-amber-200'
            }`}  >
              {config.useSsl ? (
                <>
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Enabled
                </>
              ) : (
                <>
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Disabled
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}