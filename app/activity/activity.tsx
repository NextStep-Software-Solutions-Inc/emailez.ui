import React, { useState } from 'react';
import type { EmailDto, Workspace } from '@/types/index';
import type { PaginatedList } from '@/types/common.types';
import { EMAIL_STATUS } from '@/types/index';

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

interface ActivityProps {
  workspace: Workspace;
  emails: PaginatedList<EmailDto> | null;
}

export function Activity({ workspace, emails }: ActivityProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Use real emails data from API
  const emailsData = emails?.items || [];

  const filteredEmails = emailsData.filter((email: EmailDto) => {
    const matchesStatus = statusFilter === 'all' || email.status === statusFilter;
    const matchesSearch = email.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.toAddresses?.some((addr: string) => addr.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Loading state when emails are being fetched
  if (!emails) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Activity</h1>
            <p className="text-gray-600">Email activity for {workspace.name}</p>
          </div>
        </div>
        
        {/* Loading skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
        
        <div className="animate-pulse bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="h-64 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2"  >
          Activity
        </h1>
        <p className="text-gray-600"  >
          Monitor your email sending activity and view detailed logs for {workspace.name}.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600"  >
              Total Emails
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-gray-900"  >
            {emailsData.length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600"  >
              Sent
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-gray-900"  >
            {emailsData.filter((e: EmailDto) => e.status === EMAIL_STATUS.SENT).length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600"  >
              Failed
            </div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-gray-900"  >
            {emailsData.filter((e: EmailDto) => e.status === EMAIL_STATUS.FAILED).length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600"  >
              Queued
            </div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-gray-900"  >
            {emailsData.filter((e: EmailDto) => e.status === EMAIL_STATUS.QUEUED).length}
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700"  >
            Status:
          </label>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
             
          >
            <option value="all">All</option>
            <option value={EMAIL_STATUS.SENT}>Sent</option>
            <option value={EMAIL_STATUS.FAILED}>Failed</option>
            <option value={EMAIL_STATUS.QUEUED}>Queued</option>
            <option value={EMAIL_STATUS.SENDING}>Sending</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700"  >
            Date Range:
          </label>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"  >
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
             
          />
        </div>
      </div>

      {/* Email List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"  >
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"  >
                  To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"  >
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"  >
                  Queued
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"  >
                  Sent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"  >
                  Attempts
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmails.map((email: EmailDto) => (
              <React.Fragment key={email.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900"  >
                      {email.subject}
                    </div>
                    <div className="text-sm text-gray-500"  >
                      {email.bodySnippet && email.bodySnippet.length > 50 
                        ? email.bodySnippet.substring(0, 50) + '...' 
                        : email.bodySnippet}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900"  >
                      {email.toAddresses?.[0]}
                      {email.toAddresses && email.toAddresses.length > 1 && (
                        <span className="text-gray-500"> +{email.toAddresses.length - 1} more</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top whitespace-normal">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(email.status)}`}
                    >
                      {email.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"  >
                    {new Date(email.queuedAt).toLocaleDateString()} {new Date(email.queuedAt).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"  >
                    {email.sentAt ? (
                      <>
                        {new Date(email.sentAt).toLocaleDateString()} {new Date(email.sentAt).toLocaleTimeString()}
                      </>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"  >
                    {email.attemptCount}
                  </td>
                </tr>
                {email.errorMessage && (
                  <tr>
                    <td colSpan={6} className="px-6 pb-4 pt-0">
                      <div
                        className="text-xs text-red-600 mt-1 break-words whitespace-pre-line"
                      >
                        {email.errorMessage}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2"  >
              No emails found
            </h3>
            <p className="text-gray-500"  >
              {searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters.' : 'No emails have been sent yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
