import { showToast } from '@/components/common/toast'
import React from 'react'

const ToastDemo = () => {
  const handleSuccessClick = () => {
    showToast.success('Success message', {
      description: 'This is a success message',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo clicked')
      }
    })
  }

  const handleErrorClick = () => {
    showToast.error('Error message', {
      description: 'This is an error message'
    })
  }

  const handleInfoClick = () => {
    showToast.info('Info message', {
      description: 'This is an info message'
    })
  }

  const handleWarningClick = () => {
    showToast.warning('Warning message', {
      description: 'This is a warning message'
    })
  }

  const handlePromiseClick = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve('Success') : reject('Error')
      }, 2000)
    })

    showToast.promise(promise, {
      loading: 'Loading...',
      success: 'Operation completed successfully',
      error: 'Operation failed'
    })
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-24">
      <button
        onClick={handleSuccessClick}
        className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        Show Success Toast
      </button>
      <button
        onClick={handleErrorClick}
        className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Show Error Toast
      </button>
      <button
        onClick={handleInfoClick}
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Show Info Toast
      </button>
      <button
        onClick={handleWarningClick}
        className="rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
      >
        Show Warning Toast
      </button>
      <button
        onClick={handlePromiseClick}
        className="rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
      >
        Show Promise Toast
      </button>
    </div>
  )
}

export default ToastDemo
