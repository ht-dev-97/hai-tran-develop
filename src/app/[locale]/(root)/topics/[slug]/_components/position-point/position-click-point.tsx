'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import PositionShowPoint from './position-show-point'

interface ImageDialogProps {
  src: string
  alt: string
  point: { x: number; y: number }
  onPointSelect: (point: { x: number; y: number }) => void
}

const PositionClickPoint = ({
  src,
  alt,
  point,
  onPointSelect
}: ImageDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Image</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <PositionShowPoint
          src={src}
          alt={alt}
          width={700}
          height={500}
          point={point}
          onPointSelect={onPointSelect}
          isSelectable={true}
        />
      </DialogContent>
    </Dialog>
  )
}

export default PositionClickPoint
