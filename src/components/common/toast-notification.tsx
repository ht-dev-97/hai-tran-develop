'use client'

import { cn } from '@/lib/utils'
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastProps {
  title?: string
  description?: string
  type?: ToastType
  duration?: number
}

const TOAST_ICONS = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-500" />
}

const ToastIcon = ({ type }: { type: ToastType }) => {
  return TOAST_ICONS[type] || TOAST_ICONS.info
}

const PROGRESS_COLORS = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  warning: 'bg-amber-500'
}

const BACKGROUND_COLORS = {
  success: 'bg-white dark:bg-gray-900',
  error: 'bg-white dark:bg-gray-900',
  info: 'bg-white dark:bg-gray-900',
  warning: 'bg-white dark:bg-gray-900'
}

const BORDER_COLORS = {
  success: 'border-green-500',
  error: 'border-red-500',
  info: 'border-blue-500',
  warning: 'border-amber-500'
}

const TOAST_METHODS = {
  success: toast.success,
  error: toast.error,
  info: toast.info,
  warning: toast.warning
}

const BORDER_HEX_COLORS = {
  success: '#22c55e',
  error: '#ef4444',
  info: '#3b82f6',
  warning: '#f59e0b'
}

const ToastProgressBar = ({
  duration = 3000,
  type
}: {
  duration: number
  type: ToastType
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 100 / (duration / 100)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [duration])

  return (
    <div className="h-1 w-full bg-muted mt-2 rounded-full overflow-hidden">
      <div
        className={cn(
          'h-full transition-all ease-linear',
          PROGRESS_COLORS[type] || PROGRESS_COLORS.info
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export const showToast = ({
  title,
  description,
  type = 'info',
  duration = 3000
}: ToastProps) => {
  const toastOptions = {
    description,
    duration,
    style: {
      backgroundColor: 'white',
      color: 'black',
      border: `1px solid ${BORDER_HEX_COLORS[type] || BORDER_HEX_COLORS.info}`,
      zIndex: 9999,
      opacity: 1,
      minHeight: 'auto',
      height: 'auto',
      maxHeight: 'none',
      overflow: 'visible'
    },
    className: 'dark:bg-gray-900 dark:text-white dark:border-gray-700',
    icon: TOAST_ICONS[type] || TOAST_ICONS.info
  }

  const toastMethod = TOAST_METHODS[type] || TOAST_METHODS.info
  return toastMethod(title, toastOptions)
}

export const showCustomToast = ({
  title,
  description,
  type = 'info',
  duration = 3000
}: ToastProps) => {
  return toast.custom(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (t: any) => (
      <div
        className={cn(
          'flex flex-col w-full p-4 rounded-lg border shadow-lg',
          BACKGROUND_COLORS[type] || BACKGROUND_COLORS.info,
          BORDER_COLORS[type] || BORDER_COLORS.info,
          'z-[9999]'
        )}
        id={`toast-${t.id}`}
        style={{ opacity: 1 }}
      >
        <div className="flex items-start gap-3">
          <ToastIcon type={type} />
          <div className="flex-1">
            {title && <h3 className="font-medium text-foreground">{title}</h3>}
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="rounded-md p-1 hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <ToastProgressBar duration={duration} type={type} />
      </div>
    ),
    {
      duration,
      className: '',
      style: {
        backgroundColor: 'transparent',
        border: 'none',
        padding: 0,
        zIndex: 9999,
        opacity: 1
      }
    }
  )
}
