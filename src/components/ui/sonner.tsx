'use client'

import { useTheme } from 'next-themes'
import type React from 'react'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

function Toaster({ ...props }: ToasterProps) {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          title: 'group-[.toast]:text-foreground text-base font-medium',
          description: 'group-[.toast]:text-muted-foreground text-sm',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground'
        },
        style: {
          backgroundColor: 'var(--background)',
          border: '1px solid var(--border)',
          padding: '1rem',
          zIndex: 9999,
          opacity: 1
        }
      }}
      expand={false}
      closeButton={true}
      richColors={true}
      {...props}
    />
  )
}

export { Toaster }
