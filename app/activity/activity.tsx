import { useState } from 'react';
import type { EmailDto } from '@/types/index';
import { EMAIL_STATUS } from '@/types/index';

// Mock data for email activity
const mockEmails: EmailDto[] = [
  {
    id: "email-1",
    workspaceId: "workspace-1",
    fromAddress: "noreply@example.com",
    toAddresses: ["user1@example.com"],
    subject: "Welcome to our service",
    status: EMAIL_STATUS.SENT,
    errorMessage: null,
    queuedAt: "2024-01-15T10:30:00Z",
    sentAt: "2024-01-15T10:30:15Z",
    attemptCount: 1,
    bodySnippet: "Welcome to our service! We're excited to have you on board...",
    isHtml: true
  },
  {
    id: "email-2",
    tenantId: "tenant-1",
    fromAddress: "support@example.com",
    toAddresses: ["user2@example.com"],
    subject: "Password reset confirmation",
    status: EMAIL_STATUS.SENT,
    errorMessage: null,
    queuedAt: "2024-01-15T09:15:00Z",
    sentAt: "2024-01-15T09:15:12Z",
    attemptCount: 1,
    bodySnippet: "Your password has been successfully reset. If you did not make this request...",
    isHtml: true
  },
  {
    id: "email-3",
    tenantId: "tenant-1",
    fromAddress: "noreply@example.com",
    toAddresses: ["user3@example.com"],
    subject: "Email delivery failed",
    status: EMAIL_STATUS.FAILED,
    errorMessage: "SMTP Error: Could not authenticate",
    queuedAt: "2024-01-15T08:45:00Z",
    sentAt: null,
    attemptCount: 3,
    bodySnippet: "This is a test email that failed to deliver...",
    isHtml: false
  },
  {
    id: "email-4",
    tenantId: "tenant-1",
    fromAddress: "noreply@example.com",
    toAddresses: ["user4@example.com"],
    subject: "Order confirmation",
    status: EMAIL_STATUS.QUEUED,
    errorMessage: null,
    queuedAt: "2024-01-15T11:00:00Z",
    sentAt: null,
    attemptCount: 0,
    bodySnippet: "Thank you for your order! Your order #12345 has been confirmed...",
    isHtml: true
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case EMAIL_STATUS.SENT:
      return 'bg-green-100 text-green-800';
    case EMAIL_STATUS.FAILED:
      return 'bg-red-100 text-red-800';
    case EMAIL_STATUS.QUEUED:
      return 'bg-yellow-100 text-yellow-800';
    case EMAIL_STATUS.SENDING:
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function Activity() {
  const [emails, setEmails] = useState<EmailDto[]>(mockEmails);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredEmails = emails.filter(email => {
    const matchesStatus = statusFilter === 'all' || email.status === statusFilter;
    const matchesSearch = email.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.toAddresses?.some(addr => addr.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Activity
        </h1>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Monitor your email sending activity and view detailed logs.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Total Emails
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {emails.length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Sent
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {emails.filter(e => e.status === EMAIL_STATUS.SENT).length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Failed
            </div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {emails.filter(e => e.status === EMAIL_STATUS.FAILED).length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Queued
            </div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {emails.filter(e => e.status === EMAIL_STATUS.QUEUED).length}
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Status:
          </label>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            <option value="all">All</option>
            <option value={EMAIL_STATUS.SENT}>Sent</option>
            <option value={EMAIL_STATUS.FAILED}>Failed</option>
            <option value={EMAIL_STATUS.QUEUED}>Queued</option>
            <option value={EMAIL_STATUS.SENDING}>Sending</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Date Range:
          </label>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Nunito, sans-serif' }}>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Custom</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          />
        </div>
      </div>

      {/* Email List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Queued
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Sent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Attempts
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmails.map((email) => (
                <tr key={email.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {email.subject}
                    </div>
                    <div className="text-sm text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {email.bodySnippet && email.bodySnippet.length > 50 
                        ? email.bodySnippet.substring(0, 50) + '...' 
                        : email.bodySnippet}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {email.toAddresses?.[0]}
                      {email.toAddresses && email.toAddresses.length > 1 && (
                        <span className="text-gray-500"> +{email.toAddresses.length - 1} more</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(email.status)}`} style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {email.status}
                    </span>
                    {email.errorMessage && (
                      <div className="text-xs text-red-600 mt-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        {email.errorMessage}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {new Date(email.queuedAt).toLocaleDateString()} {new Date(email.queuedAt).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {email.sentAt ? (
                      <>
                        {new Date(email.sentAt).toLocaleDateString()} {new Date(email.sentAt).toLocaleTimeString()}
                      </>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {email.attemptCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredEmails.length === 0 && (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
              No emails found
            </h3>
            <p className="text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters.' : 'No emails have been sent yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
