import { siteConfig } from '@/configs/site/site'
import Cookies from 'js-cookie'

export const getAccessToken = () => {
  return Cookies.get(siteConfig.tokenConfig.accessTokenKey)
}

export const getRefreshToken = () => {
  return Cookies.get(siteConfig.tokenConfig.refreshTokenKey)
}

export const setTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set(siteConfig.tokenConfig.accessTokenKey, accessToken, {
    expires: new Date(
      new Date().getTime() + siteConfig.tokenConfig.accessTokenExpiry * 1000
    ),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })

  Cookies.set(siteConfig.tokenConfig.refreshTokenKey, refreshToken, {
    expires: new Date(
      new Date().getTime() + siteConfig.tokenConfig.refreshTokenExpiry * 1000
    ),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })
}

export const removeTokens = () => {
  Cookies.remove(siteConfig.tokenConfig.accessTokenKey)
  Cookies.remove(siteConfig.tokenConfig.refreshTokenKey)
}
