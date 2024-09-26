import React from "react"

const Logout = () => {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a href="/api/auth/logout" className="p-2 bg-red-500 rounded-md">
      Logout
    </a>
  )
}

export default Logout
