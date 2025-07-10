import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { WorkspaceApiKey, CreateWorkspaceApiKeyResponse } from '@/lib/types/api-key.types';
import { apiKeyApi } from '@/lib/services/api-key-api';
import { ApiKeyDialog } from './ApiKeyDialog';

export function ApiKeysTab({ workspaceId, userId }: { workspaceId: string; userId: string }) {
  const [apiKeys, setApiKeys] = useState<WorkspaceApiKey[]>([]);
  const [apiKeyLoading, setApiKeyLoading] = useState(false);
  const [newApiKeyName, setNewApiKeyName] = useState('');
  const [plainKey, setPlainKey] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!workspaceId || !userId) return;
    setApiKeyLoading(true);
    apiKeyApi.getApiKeys(workspaceId, userId)
      .then((res) => setApiKeys(res as WorkspaceApiKey[]))
      .finally(() => setApiKeyLoading(false));
  }, [workspaceId, userId]);

  const handleCreateApiKey = async () => {
    if (!workspaceId || !userId || !newApiKeyName) return;
    setApiKeyLoading(true);
    try {
      const res = await apiKeyApi.createApiKey(workspaceId, userId, newApiKeyName) as CreateWorkspaceApiKeyResponse;
      setPlainKey(res.plainKey);
      setShowDialog(true);
      setNewApiKeyName('');
      // Refresh list
      const keys = await apiKeyApi.getApiKeys(workspaceId, userId) as WorkspaceApiKey[];
      setApiKeys(keys);
    } finally {
      setApiKeyLoading(false);
    }
  };
  const handleRevokeApiKey = async (apiKeyId: string) => {
    if (!workspaceId || !userId) return;
    setApiKeyLoading(true);
    await apiKeyApi.revokeApiKey(workspaceId, userId, apiKeyId);
    const keys = await apiKeyApi.getApiKeys(workspaceId, userId) as WorkspaceApiKey[];
    setApiKeys(keys);
    setApiKeyLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">API Keys</h2>
      {plainKey && (
        <ApiKeyDialog plainKey={plainKey} open={showDialog} onOpenChange={setShowDialog} />
      )}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="API Key Name"
          value={newApiKeyName}
          onChange={e => setNewApiKeyName(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <Button type="button" onClick={handleCreateApiKey} disabled={apiKeyLoading || !newApiKeyName}>
          {apiKeyLoading ? 'Creating...' : 'Create API Key'}
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-gray-700">
              <th className="py-2 px-3 text-left">Name</th>
              <th className="py-2 px-3 text-left">Last Used</th>
              <th className="py-2 px-3 text-left">Status</th>
              <th className="py-2 px-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map(key => (
              <tr key={key.id} className="border-t">
                <td className="py-2 px-3">{key.name}</td>
                <td className="py-2 px-3">{key.lastUsedAt ? new Date(key.lastUsedAt).toLocaleString() : 'Never'}</td>
                <td className="py-2 px-3">{key.isActive ? 'Active' : 'Revoked'}</td>
                <td className="py-2 px-3 flex gap-2">
                  <Button type="button" variant="destructive" size="sm" onClick={() => handleRevokeApiKey(key.id)} disabled={apiKeyLoading}>Revoke</Button>
                </td>
              </tr>
            ))}
            {apiKeys.length === 0 && (
              <tr><td colSpan={4} className="py-2 px-3 text-gray-500">No API keys found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
