import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ResponsiveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  contentClassName?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCloseButton?: boolean
}

const sizeClasses = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  full: 'sm:max-w-full'
}

export function ResponsiveDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
  contentClassName,
  size = 'md',
  showCloseButton = true,
  ...props
}: ResponsiveDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent 
        className={cn(
          sizeClasses[size],
          "max-h-[90vh] overflow-y-auto",
          contentClassName
        )}
        showCloseButton={showCloseButton}
      >
        <DialogHeader>
          <DialogTitle  >
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription  >
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        
        <div className={cn("space-y-4", className)}>
          {children}
        </div>
        
        {footer && (
          <DialogFooter>
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Convenience component for simple confirmation dialogs
interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children?: React.ReactNode
  onConfirm: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
  isLoading?: boolean
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  isLoading = false,
}: ConfirmDialogProps) {
  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  const handleConfirm = () => {
    onConfirm()
    if (!isLoading) {
      onOpenChange(false)
    }
  }

  const footer = (
    <>
      <Button
        variant="outline"
        onClick={handleCancel}
        disabled={isLoading}
         
      >
        {cancelText}
      </Button>
      <Button
        variant={variant === 'destructive' ? 'destructive' : 'default'}
        onClick={handleConfirm}
        disabled={isLoading}
         
      >
        {isLoading ? 'Processing...' : confirmText}
      </Button>
    </>
  )

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      footer={footer}
      size="sm"
    >
      {children}
    </ResponsiveDialog>
  )
}
