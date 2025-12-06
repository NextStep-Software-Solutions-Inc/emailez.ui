import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function ApiKeyDialog({ plainKey, open, onOpenChange }: { plainKey: string; open: boolean; onOpenChange: (open: boolean) => void }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(plainKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Your New API Key</DialogTitle>
          <DialogDescription>Copy and store this key now. It will not be shown again.</DialogDescription>
        </DialogHeader>
        <button
          className="mb-4 w-full p-3 bg-green-50 border border-green-200 rounded text-green-800 font-mono break-all text-base select-all hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          onClick={handleCopy}
          type="button"
        >
          {plainKey}
        </button>
        <div className="flex items-center gap-2">
          <Button type="button" onClick={handleCopy} variant="outline">
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
          <span className="text-xs text-gray-500">Click the key or button to copy.</span>
        </div>
        <DialogClose asChild>
          <Button type="button" variant="ghost" className="mt-4">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
