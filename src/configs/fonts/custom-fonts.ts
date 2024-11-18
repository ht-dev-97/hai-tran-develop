import localFont from 'next/font/local'

const Abolition = localFont({
  src: [
    {
      path: '../../app/fonts/abolition/FontsFree-Net-Abolition-W00-Regular.ttf',
      style: 'normal',
      weight: '400'
    }
  ],
  variable: '--font-abolition'
})

const SNPro = localFont({
  src: [
    {
      path: '../../app/fonts/sn-pro/SNPro-Regular.otf',
      style: 'normal',
      weight: '400'
    },
    {
      path: '../../app/fonts/sn-pro/SNPro-Medium.otf',
      style: 'normal',
      weight: '500'
    },
    {
      path: '../../app/fonts/sn-pro/SNPro-Semibold.otf',
      style: 'normal',
      weight: '600'
    },
    {
      path: '../../app/fonts/sn-pro/SNPro-Bold.otf',
      style: 'normal',
      weight: '700'
    }
  ],
  variable: '--font-sn-pro'
})

export { Abolition, SNPro }
