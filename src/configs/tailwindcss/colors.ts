const withOpacity = (variableName: string) => {
  return ({ opacityValue }: { opacityValue: string }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

export const colorBrand = {
  primary: withOpacity('--brand-primary'),
  'text-main': withOpacity('--brand-text-main'),
  'bg-box': withOpacity('--brand-bg-box')
}
