import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { WorkspaceApiKey } from '@/lib/types/api-key.types';
import { apiKeyApi } from '@/lib/services/api-key-api';
import { ApiKeyDialog } from './ApiKeyDialog';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export function ApiKeysTab({ workspaceId, userId }: { workspaceId: string; userId: string }) {
  const [apiKeys, setApiKeys] = useState<WorkspaceApiKey[]>([]);
  const [apiKeyLoading, setApiKeyLoading] = useState(false);
  const [newApiKeyName, setNewApiKeyName] = useState('');
  const [plainKey, setPlainKey] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setApiKeyLoading(true);
    apiKeyApi.getApiKeys(workspaceId, userId)
      .then((res) => setApiKeys(res as WorkspaceApiKey[]))
      .finally(() => setApiKeyLoading(false));
  }, [workspaceId, userId]);

  const handleCreateApiKey = async () => {
    setApiKeyLoading(true);

    toast.promise(apiKeyApi.createApiKey(workspaceId, userId, newApiKeyName), {
      loading: "Generating API key...",
      success: res => {
        setPlainKey(res.plainKey);
        setShowDialog(true);
        setNewApiKeyName('');
        handleRefreshApiKeys();
        return res.message;
      },
      error: res => {
        return res.message || 'Failed to create API key';
      },
      finally: () => {
        setApiKeyLoading(false);
      }
    })
    
  };

  const handleRefreshApiKeys = async () => {
    const keys = await apiKeyApi.getApiKeys(workspaceId, userId);
    setApiKeys(keys);
  }
  

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
            {apiKeys.map(apiKey => (
              <ApiKeyRow 
                key={apiKey.id} 
                apiKey={apiKey}
                workspaceId={workspaceId}
                userId={userId}
                onRevoke={handleRefreshApiKeys}
              />
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

function ApiKeyRow({apiKey, workspaceId, userId, onRevoke}: {apiKey: WorkspaceApiKey, workspaceId: string, userId: string, onRevoke: (apiKeyId: string) => void}) {
  const [apiKeyLoading, setApiKeyLoading] = useState(false);

  const handleRevokeApiKey = async (apiKeyId: string) => {
    toast.promise(apiKeyApi.revokeApiKey(workspaceId, userId, apiKeyId), {
      loading: "Revoking API key...",
      success: res => {
        onRevoke(apiKeyId);
        return res.message || 'API key revoked successfully';
      },
      error: res => {
        return res.message || 'Failed to revoke API key';
      },
      finally: () => {
        setApiKeyLoading(false);
      }
    })
  };

  return (
    <tr className="border-t">
      <td className="py-2 px-3">{apiKey.name}</td>
      <td className="py-2 px-3">{apiKey.lastUsedAt ? new Date(apiKey.lastUsedAt).toLocaleString() : 'Never'}</td>
      <td className="py-2 px-3">{apiKey.isActive ? 'Active' : 'Revoked'}</td>
      <td className="py-2 px-3 flex gap-2">
        <Button type="button" variant="destructive" size="sm" onClick={() => handleRevokeApiKey(apiKey.id)} disabled={apiKeyLoading}>
          { apiKeyLoading && <Loader2 className='animate-spin' size={16} />}
          { apiKeyLoading ? 'Revoking...' : 'Revoke' }
        </Button>
      </td>
    </tr>
  )
}