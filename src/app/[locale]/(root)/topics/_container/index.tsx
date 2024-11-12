"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TOPICS } from "@/constants"
import TopicBlock from "../_components/topic-block"
import { useTranslations } from "next-intl"

const TopicsContainer = () => {
  const t = useTranslations("TopicsPage")

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center">
          {t("title")}
        </h1>
        <Tabs defaultValue="UI NextJS" className="rounded-xl shadow-2xl p-6">
          <TabsList className="mb-6 p-1 rounded-lg">
            {Object.keys(TOPICS).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="px-4 py-2 data-[state=active]:bg-primary rounded-md transition-all"
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
    </div>
  )
}

export default TopicsContainer
