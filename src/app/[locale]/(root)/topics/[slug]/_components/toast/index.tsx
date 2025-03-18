import { Button } from '@/components/ui/button'
import { useCustomToast } from '@/hooks'
import React from 'react'

const ToastDemo = () => {
  const toast = useCustomToast()

  return (
    <div className="grid gap-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Sonner Built-in Toasts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            onClick={() =>
              toast.success({
                title: 'Success!',
                description: 'The action was successfully completed.'
              })
            }
            className="bg-green-500 hover:bg-green-600"
          >
            Success Toast
          </Button>

          <Button
            onClick={() =>
              toast.error({
                title: 'Error!',
                description: 'An error occurred while performing the action.',
                duration: 5000
              })
            }
            className="bg-red-500 hover:bg-red-600"
          >
            Error Toast (5s)
          </Button>

          <Button
            onClick={() =>
              toast.info({
                title: 'Information',
                description: 'This is an important information message.'
              })
            }
            className="bg-blue-500 hover:bg-blue-600"
          >
            Info Toast
          </Button>

          <Button
            onClick={() =>
              toast.warning({
                title: 'Warning!',
                description: 'Pay attention to this notification.',
                duration: 6000
              })
            }
            className="bg-amber-500 hover:bg-amber-600"
          >
            Warning Toast (6s)
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Custom Toasts with Progress Bar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            onClick={() =>
              toast.custom.success({
                title: 'Success!',
                description: 'The action was successfully completed.'
              })
            }
            variant="outline"
            className="border-green-500 text-green-500 hover:bg-green-50"
          >
            Custom Success
          </Button>

          <Button
            onClick={() =>
              toast.custom.error({
                title: 'Error!',
                description: 'An error occurred while performing the action.',
                duration: 5000
              })
            }
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50"
          >
            Custom Error (5s)
          </Button>

          <Button
            onClick={() =>
              toast.custom.info({
                title: 'Information',
                description: 'This is an important information message.'
              })
            }
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-50"
          >
            Custom Info
          </Button>

          <Button
            onClick={() =>
              toast.custom.warning({
                title: 'Warning!',
                description: 'Pay attention to this notification.',
                duration: 6000
              })
            }
            variant="outline"
            className="border-amber-500 text-amber-500 hover:bg-amber-50"
          >
            Custom Warning (6s)
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ToastDemo
