import {
  type ToastProps,
  type ToastType,
  showCustomToast,
  showToast
} from '@/components/common'

type ToastFunction = (props: Omit<ToastProps, 'type'>) => void

interface UseCustomToastReturn {
  success: ToastFunction
  error: ToastFunction
  info: ToastFunction
  warning: ToastFunction
  custom: Record<ToastType, ToastFunction>
}

export function useCustomToast(): UseCustomToastReturn {
  const standardToasts: Record<ToastType, ToastFunction> = {
    success: (props) => showToast({ ...props, type: 'success' }),
    error: (props) => showToast({ ...props, type: 'error' }),
    info: (props) => showToast({ ...props, type: 'info' }),
    warning: (props) => showToast({ ...props, type: 'warning' })
  }

  const customToasts: Record<ToastType, ToastFunction> = {
    success: (props) => showCustomToast({ ...props, type: 'success' }),
    error: (props) => showCustomToast({ ...props, type: 'error' }),
    info: (props) => showCustomToast({ ...props, type: 'info' }),
    warning: (props) => showCustomToast({ ...props, type: 'warning' })
  }

  return {
    ...standardToasts,
    custom: customToasts
  }
}
