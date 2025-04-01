import { CloseCircleIcon, UserIcon } from '@/assets/icons'
import { SVGProps } from '@/types'
import React from 'react'

interface IconProps extends SVGProps {
  name: 'close-circle' | 'user'
}

const ICON_COMPONENTS = {
  'close-circle': CloseCircleIcon,
  user: UserIcon
}

export const Icon = ({ name, ...props }: IconProps) => {
  const IconComponent = ICON_COMPONENTS[name]

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  return <IconComponent {...props} />
}
