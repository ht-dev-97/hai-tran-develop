import {
  getSession,
  handleAuth,
  handleCallback,
  handleLogin,
  handleLogout,
} from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"

export default handleAuth({
  login: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          scope: "openid profile email offline_access",
          prompt: "login",
        },
        returnTo: "/",
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error("Login error:", e)
      res.status(e.status ?? 500).end(e.message)
    }
  },
  logout: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const session = await getSession(req, res)
      const user = session?.user

      const logoutUrl = `https://${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${process.env.AUTH0_BASE_URL}`

      await handleLogout(req, res, {
        returnTo: !user ? logoutUrl : process.env.AUTH0_BASE_URL,
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error("Logout error:", e)
      res.status(e.status ?? 500).end(e.message)
    }
  },
  callback: async (req: NextApiRequest, res: NextApiResponse) => {
    const afterCallback = process.env.AUTH0_BASE_URL

    try {
      await handleCallback(req, res, {
        redirectUri: afterCallback,
      })

      // const session = await getSession(req, res)

      // Log tokens for debugging
      // console.log("Session", session)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error("Callback error:", e)
      res.status(e.status ?? 500).end(e.message)
    }
  },
})
