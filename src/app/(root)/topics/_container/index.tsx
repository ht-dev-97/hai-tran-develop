"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TOPICS } from "@/constants"
import TopicBlock from "../_components/topic-block"

const TopicsContainer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Explore Web Development Topics
        </h1>
        <Tabs
          defaultValue="UI NextJS"
          className="bg-white rounded-xl shadow-2xl p-6"
        >
          <TabsList className="mb-6 bg-gray-100 p-1 rounded-lg">
            {Object.keys(TOPICS).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="px-4 py-2 text-gray-700 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md transition-all"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(TOPICS).map(([category, topicList]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {topicList.map((topic) => (
                  <TopicBlock key={topic} topic={topic} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <div className="fixed inset-0 -z-10 bg-[url('/assets/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
    </div>
  )
}

export default TopicsContainer
