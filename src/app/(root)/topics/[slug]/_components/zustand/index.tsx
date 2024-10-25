'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useCountStore } from '@/stores'
import { useShallow } from 'zustand/react/shallow'

const Zustand = () => {
  const { count, increment, decrement } = useCountStore(
    useShallow((state) => ({
      count: state.count,
      increment: state.increment,
      decrement: state.decrement,
    }))
  )

  return (
    <div className='flex flex-col items-center gap-4'>
      <p className='text-xl font-semibold'>Count: {count}</p>
      <div className='flex gap-2'>
        <Button onClick={() => decrement(1)} variant='outline'>
          Decrement
        </Button>
        <Button onClick={() => increment(1)} variant='outline'>
          Increment
        </Button>
      </div>
    </div>
  )
}

export default Zustand
