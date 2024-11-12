"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import TopicCard from "../_components/topic-card"
import { TOPICCARD } from "../_constants"

const HomeContainer = () => {
  const t = useTranslations("HomePage")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            {t("title")}
          </h2>
        </section>

        <section className="grid grid-cols-1 gap-8 mb-16">
          {TOPICCARD.map((topic) => (
            <TopicCard key={topic.name} topic={topic} />
          ))}
        </section>

        <section className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Ready to start learning?
          </h3>
          <Button asChild>
            <Link href="/topics" className="inline-flex items-center">
              Explore UI Topics
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>
      </main>
    </div>
  )
}

export default HomeContainer
