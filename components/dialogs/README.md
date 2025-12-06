# Dialogs Directory

This directory contains all reusable dialog and modal components for the EmailEZ application. All dialogs are built using shadcn/ui components and follow consistent patterns for accessibility and responsive design.

## Base Components

### ResponsiveDialog

A flexible, responsive dialog component that serves as the foundation for all other dialogs.

**Props:**

- `open`: boolean - Controls dialog visibility
- `onOpenChange`: (open: boolean) => void - Called when dialog should open/close
- `title`: string - Dialog title
- `description?`: string - Optional description text
- `children`: React.ReactNode - Dialog content
- `footer?`: React.ReactNode - Optional footer content
- `size?`: 'sm' | 'md' | 'lg' | 'xl' | 'full' - Dialog size (default: 'md')
- `showCloseButton?`: boolean - Show/hide close button (default: true)

### ConfirmDialog

A specialized dialog for confirmation actions (delete, submit, etc.).

**Props:**

- `open`: boolean - Controls dialog visibility
- `onOpenChange`: (open: boolean) => void - Called when dialog should open/close
- `title`: string - Dialog title
- `description?`: string - Optional description text
- `children?`: React.ReactNode - Optional additional content
- `onConfirm`: () => void - Called when user confirms
- `onCancel?`: () => void - Called when user cancels
- `confirmText?`: string - Confirm button text (default: 'Confirm')
- `cancelText?`: string - Cancel button text (default: 'Cancel')
- `variant?`: 'default' | 'destructive' - Button variant (default: 'default')
- `isLoading?`: boolean - Loading state (default: false)

## Specific Dialog Components

### TestEmailDialog

Dialog for sending test emails with SMTP configuration.

**Props:**

- `open`: boolean - Controls dialog visibility
- `onOpenChange`: (open: boolean) => void - Called when dialog should open/close
- `config`: EmailConfiguration - SMTP configuration to use
- `onSend`: (testEmailData: TestEmailData) => void - Called when sending test email
- `isSending`: boolean - Loading state during email sending

### CreateWorkspaceDialog

Dialog for creating new workspaces.

**Props:**

- `isOpen`: boolean - Controls dialog visibility
- `onClose`: () => void - Called when dialog should close

## Usage Examples

### Basic ResponsiveDialog

```tsx
import { ResponsiveDialog } from "@/components/dialogs";

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      title="My Dialog"
      description="This is a description"
      size="md"
    >
      <p>Dialog content goes here</p>
    </ResponsiveDialog>
  );
}
```

### Confirmation Dialog

```tsx
import { ConfirmDialog } from "@/components/dialogs";

function MyComponent() {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    // Handle confirmation
    console.log("Confirmed!");
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={setOpen}
      title="Delete Item"
      description="Are you sure you want to delete this item?"
      onConfirm={handleConfirm}
      confirmText="Delete"
      variant="destructive"
    />
  );
}
```

### Test Email Dialog

```tsx
import { TestEmailDialog } from "@/components/dialogs";

function ConfigurationPage() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<EmailConfiguration | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (testEmailData: TestEmailData) => {
    setIsSending(true);
    try {
      // Send test email
      await sendTestEmail(config.id, testEmailData);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <TestEmailDialog
      open={open}
      onOpenChange={setOpen}
      config={config}
      onSend={handleSend}
      isSending={isSending}
    />
  );
}
```

## Design Principles

1. **Consistency**: All dialogs use the same base components and styling
2. **Accessibility**: Proper ARIA attributes, keyboard navigation, and focus management
3. **Responsiveness**: Dialogs adapt to different screen sizes
4. **Reusability**: Base components can be composed into specific dialogs
5. **Type Safety**: Full TypeScript support with proper prop types

## Adding New Dialogs

When adding a new dialog:

1. Create a new file in this directory: `components/dialogs/MyNewDialog.tsx`
2. Use `ResponsiveDialog` or `ConfirmDialog` as the base
3. Export it from `index.ts`
4. Add documentation to this README
5. Follow the existing naming conventions and patterns

## File Structure

```
components/dialogs/
├── index.ts                     # Main export file
├── README.md                    # This documentation
├── BaseDialog.tsx               # Base dialog components
├── TestEmailDialog.tsx          # Test email dialog
├── CreateWorkspaceDialog.tsx    # Create workspace dialog
└── [future dialogs...]
```
