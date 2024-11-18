import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

import { TopicCardProps } from '../_types'

const TopicCard = ({ topic }: { topic: TopicCardProps }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card className="h-full overflow-hidden">
        <CardHeader className="bg-gradient-orange">
          <CardTitle className="flex items-center justify-between">
            {topic.name}
            <topic.icon className="h-6 w-6" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-sm">
            Explore {topic.name.toLowerCase()} concepts and best practices.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default TopicCard
