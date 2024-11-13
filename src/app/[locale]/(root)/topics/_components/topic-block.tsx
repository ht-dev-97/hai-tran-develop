import React from "react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { formatSlug } from "@/utils/common"
import { Link } from "@/i18n/routing"

const TopicBlock = ({ topic }: { topic: string }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link href={`/topics/${formatSlug(topic)}`}>
        <Card className="w-full aspect-square bg-gradient-orange flex items-center justify-center text-center p-4 shadow-lg transition-shadow hover:shadow-xl">
          <span className="text-lg font-semibold drop-shadow-md">{topic}</span>
        </Card>
      </Link>
    </motion.div>
  )
}

export default TopicBlock
