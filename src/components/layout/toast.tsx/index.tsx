import { toast } from 'sonner'

interface ToastOptions {
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  cancel?: {
    label: string
    onClick: () => void
  }
  duration?: number
}

export const showToast = {
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, {
      description: options?.description,
      action: options?.action,
      cancel: options?.cancel,
      duration: options?.duration
    })
  },
  error: (message: string, options?: ToastOptions) => {
    toast.error(message, {
      description: options?.description,
      action: options?.action,
      cancel: options?.cancel,
      duration: options?.duration
    })
  },
  info: (message: string, options?: ToastOptions) => {
    toast.info(message, {
      description: options?.description,
      action: options?.action,
      cancel: options?.cancel,
      duration: options?.duration
    })
  },
  warning: (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      description: options?.description,
      action: options?.action,
      cancel: options?.cancel,
      duration: options?.duration
    })
  },
  loading: (message: string, options?: ToastOptions) => {
    toast.loading(message, {
      description: options?.description,
      duration: options?.duration
    })
  },
  promise: async <T,>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string
      error: string
    },
    options?: ToastOptions
  ) => {
    toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
      description: options?.description,
      action: options?.action,
      cancel: options?.cancel,
      duration: options?.duration
    })
  }
}
