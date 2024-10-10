"use client"

import React from "react"
import Environment from "../_components/environment"
import Count from "../_components/count"

const HomeContainer = () => {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Nextjs</h1>
        <Environment />
        <Count />
      </section>
    </div>
  )
}

export default HomeContainer
