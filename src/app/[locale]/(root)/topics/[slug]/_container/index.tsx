"use client"

import { useParams } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"
import { componentsMap } from "../_constant"
import { useRouter } from "@/i18n/routing"
import { useTranslations } from "next-intl"

const TopicDetailContainer = () => {
  const { slug } = useParams<{ slug: string }>() || { slug: null }
  const router = useRouter()
  const t = useTranslations("TopicPage")

  if (!slug) {
    console.error("Slug is not available")
    return null
  }

  const handleBackToTopics = () => {
    router.push("/topics")
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleBackToTopics}
        className="w-fit bg-yellow-400 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded flex items-center"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        {t("back")}
      </button>
      {renderComponentBySlug(slug)}
    </div>
  )
}

const renderComponentBySlug = (slug: string) => {
  const Component = componentsMap[slug.toLowerCase()]
  return Component ? <Component /> : null
}

export default TopicDetailContainer
